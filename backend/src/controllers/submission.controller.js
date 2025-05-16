import { db } from "../libs/db.js";

export const getAllSubmissions = async (req, res) => {
  const userId = req.user.id;
  try {
    const submissions = await db.submission.findMany({
      where: {
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Submission Featched Successfully",
      submissions,
    });
  } catch (error) {
    console.log("Error Featching all the Submissions", error);
    return res.status(500).json({
      success: true,
      message: "Internel Servar Error",
    });
  }
};

export const getSubmissionsForProblem = async (req, res) => {
  const userId = req.user.id;
  const problemId = req.params.problemId;
  try {
    const submissions = await db.submission.findMany({
      where: {
        userId,
        problemId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Submission Featched Successfully",
      submissions,
    });
  } catch (error) {
    console.log("Error Featching all the Submissions", error);
    return res.status(500).json({
      success: true,
      message: "Internel Servar Error",
    });
  }
};

export const getAllSubmissionsForProblem = async (req, res) => {
  const problemId = req.params.problemId;
  try {
    const submission = await db.submission.count({
      where: {
        problemId,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Submission Featched Successfully",
      count: submission,
    });
  } catch (error) {
    console.log("Error Featching all the Submissions", error);
    return res.status(500).json({
      success: true,
      message: "Internel Servar Error",
    });
  }
};
