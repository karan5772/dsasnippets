import { $Enums } from "../generated/prisma/index.js";
import { db } from "../libs/db.js";
import {
  getLangaugeName,
  poolBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export const execute = async (req, res) => {
  const { source_code, language_id, stdin, expected_outputs, problemId } =
    req.body;
  const userId = req.user.id;

  try {
    // Validate test case
    if (
      !Array.isArray(stdin) ||
      !Array.isArray(expected_outputs) ||
      stdin.length === 0 ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid or Missing Test Cases",
      });
    }

    // Prepare each test case for jufge 0 submission

    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));

    // Submit batch responses to judge 0
    const submitResponse = await submitBatch(submissions);

    const tokens = submitResponse.map((res) => res.token);

    //Pool judge0 for all submitted Test Cases
    const results = await poolBatchResults(tokens);

    //Let's analyze the output taht we get from the judge0

    let allPassed = true;

    const detailedResults = results.map((result, i) => {
      const stdout = result.stdout?.trim();
      const expected_output = expected_outputs[i].trim();

      const passed = stdout === expected_output;

      if (!passed) {
        allPassed = false;
      }

      return {
        testCase: i + 1,
        passed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : undefined,
        time: result.time ? `${result.time} sec` : undefined,
      };
    });

    // store this in the Submission DB
    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        language: getLangaugeName(language_id),
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
        stderr: detailedResults.some((r) => r.stderr)
          ? JSON.stringify(detailedResults.map((r) => r.stderr))
          : null,
        compileOutput: detailedResults.some((r) => r.compile_output)
          ? JSON.stringify(detailedResults.map((r) => r.compile_output))
          : null,
        status: allPassed ? $Enums.STATUS.ACCEPTED : $Enums.STATUS.REJECTED,
        memory: detailedResults.some((r) => r.memory)
          ? JSON.stringify(detailedResults.map((r) => r.memory))
          : null,
        time: detailedResults.some((r) => r.time)
          ? JSON.stringify(detailedResults.map((r) => r.time))
          : null,
      },
    });

    // Store the proble and user in Solved Problem DB
    // NOTE:- Do it only if the problem is solved i.e., all test cases are passed
    if (allPassed) {
      await db.problemSolved.upsert({
        // id entry exist then update it, otherwise create it
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        update: {},
        create: {
          userId,
          problemId,
        },
      });
    }

    // Save the indivisual test cases in the DB
    const testCaseResults = detailedResults.map((r) => ({
      submissionId: submission.id,
      testCase: r.testCase,
      passed: r.passed,
      stdout: r.stdout,
      expected: r.expected,
      stderr: r.stderr,
      compileOutput: r.compile_output,
      status:
        r.status === "Accepted"
          ? $Enums.STATUS.ACCEPTED
          : $Enums.STATUS.REJECTED,
      memory: r.memory,
      time: r.time,
    }));

    await db.testCaseResult.createMany({
      data: testCaseResults,
    });

    // Now we call the data from submition and also ass testcase with it

    const submissionWithTestCase = await db.submission.findUnique({
      where: {
        id: submission.id,
      },
      include: {
        testCases: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Sucessfully Executed the problem",
      submission: submissionWithTestCase,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server issue hai bhai",
    });
  }
};
