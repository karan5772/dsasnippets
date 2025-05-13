import { db } from "../libs/db.js";
import {
  getLangaugeId,
  poolBatchResults,
  submitBatch,
} from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
  //brings data from body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  //check role of user
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Only ADMIN is allowed to create the problem",
    });
  }

  //loop through the each reference sol for all the problems
  try {
    for (const [langauge, solutionCode] of Object.entries(referenceSolutions)) {
      //get judge 0 langauge ID
      const languageId = getLangaugeId(langauge);
      if (!languageId) {
        return res.status(400).json({
          success: false,
          message: `Does not support ${langauge} Langauge`,
        });
      }

      //prepare judge0 submition for all the test cases
      const submitions = testcases.map(({ input, output }) => ({
        //differenciate input & output from the testcases
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      })); //prepared a submition tha will go to the judge0

      const submissionResults = await submitBatch(submitions); //submitted batch to judge0 api

      const tokens = submissionResults.map((res) => res.token); // after submittion of the problem, judge0 sends us the tokens corrosponding to that problen

      const results = await poolBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result-----", result);

        if (result.status.id !== 3) {
          return res.status(400).json({
            success: false,
            message: `Testcase ${i + 1} failed for ${langauge} langauge`,
          });
        }
      }

      //save the problem into the database
      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippets,
          referenceSolutions,
          userId: req.user.id,
        },
      });

      return res.status(201).json({
        success: true,
        messege: "New problem has been created",
        newProblem,
      });
    }
  } catch (error) {
    console.error("Error Creating Problem:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany();
    if (!problems) {
      return res.status(404).json({
        success: false,
        message: "No problems Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Problem Featches Sucessfully",
      problems,
    });
  } catch (error) {
    console.error("Error Featching Problems:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProblemById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Cannot GET Problem ID",
    });
  }
  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Found the Problem by ID",
      problem,
    });
  } catch (error) {
    console.error("Error Featching Problem by ID:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  const { id } = req.params;

  //check role of user
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Only ADMIN is allowed to create the problem",
    });
  }

  //loop through the each reference sol for all the problems
  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    for (const [langauge, solutionCode] of Object.entries(referenceSolutions)) {
      //get judge 0 langauge ID
      const languageId = getLangaugeId(langauge);
      if (!languageId) {
        return res.status(400).json({
          success: false,
          message: `Does not support ${langauge} Langauge`,
        });
      }

      //prepare judge0 submition for all the test cases
      const submitions = testcases.map(({ input, output }) => ({
        //differenciate input & output from the testcases
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      })); //prepared a submition tha will go to the judge0

      const submissionResults = await submitBatch(submitions); //submitted batch to judge0 api

      const tokens = submissionResults.map((res) => res.token); // after submittion of the problem, judge0 sends us the tokens corrosponding to that problen

      const results = await poolBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log("Result-----", result);

        if (result.status.id !== 3) {
          return res.status(400).json({
            success: false,
            message: `Testcase ${i + 1} failed for ${langauge} langauge`,
          });
        }
      }

      //save the problem into the database
      const updatedProblem = await db.problem.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testcases,
          codeSnippets,
          referenceSolutions,
          userId: req.user.id,
        },
      });

      return res.status(201).json({
        success: true,
        messege: "The Problem Has Been Updated",
        updatedProblem,
      });
    }
  } catch (error) {
    console.error("Error Updateing Problem:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteProblem = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({
      success: false,
      message: "Cannot GET Problem ID",
    });
  }
  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    const deletedProblem = await db.problem.delete({
      where: {
        id,
      },
    });

    if (!deletedProblem) {
      return res.status(404).json({
        success: false,
        message: "Problem not deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted the Problem",
    });
  } catch (error) {
    console.error("Error Deleting Problem :", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProblemsSolvedByUser = async (req, res) => {};
