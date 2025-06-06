import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircleChevronLeft, Mail, Shield } from "lucide-react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useAuthStore } from "../store/useAuthStore";
import ProfileSubmission from "../components/ProfileSubmission";
import ProblemSolvedByUser from "../components/ProblemSolvedByUser";
import PlaylistProfile from "../components/PlaylistProfile";
import { axiosInstance } from "../lib/axios";
import Navbar from "../components/Navbar";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Profile = () => {
  const { authUser } = useAuthStore();

  const [problemsSolvedStats, setProblemsSolvedStats] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });
  const [submissionStats, setSubmissionStats] = useState({
    accepted: 0,
    wrong: 0,
    tle: 0,
  });

  // Fetch data from the backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch problems solved stats
        const solvedProblemsResponse = await axiosInstance.get(
          "/problems/get-Solved-Problems"
        );
        const problems = solvedProblemsResponse.data.problems;
        console.log(problems);

        // Classify problems by difficulty
        const difficultyStats = { easy: 0, medium: 0, hard: 0 };
        problems.forEach((problem) => {
          if (problem.difficulty === "EASY") difficultyStats.easy++;
          else if (problem.difficulty === "MEDIUM") difficultyStats.medium++;
          else if (problem.difficulty === "HARD") difficultyStats.hard++;
        });
        setProblemsSolvedStats(difficultyStats);

        // Fetch submission stats
        const submissionResponse = await axiosInstance.get(
          "/submission/get-all-submission"
        );
        const submissions = submissionResponse.data.submissions;

        // Classify submissions by status
        const statusStats = { accepted: 0, wrong: 0, tle: 0 };
        submissions.forEach((submission) => {
          if (submission.status === "ACCEPTED") statusStats.accepted++;
          else if (submission.status === "REJECTED") statusStats.wrong++;
        });
        setSubmissionStats(statusStats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!problemsSolvedStats || !submissionStats) {
    return <div className="text-white text-center">Loading...</div>;
  }

  // Bar Chart Data for Problems Solved
  const problemsSolvedData = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        label: "Problems Solved",
        data: [
          problemsSolvedStats.easy,
          problemsSolvedStats.medium,
          problemsSolvedStats.hard,
        ],
        backgroundColor: [
          "rgba(76, 175, 80, 0.8)",
          "rgba(255, 152, 0, 0.8)",
          "rgba(244, 67, 54, 0.8)",
        ],
        borderColor: ["#4caf50", "#ff9800", "#f44336"],
        borderWidth: 2,
        borderRadius: 10, // Rounded bars
      },
    ],
  };

  // Pie Chart Data for Submission Distribution
  const submissionDistributionData = {
    labels: ["Accepted", "Wrong Answer", "Time Limit Exceeded"],
    datasets: [
      {
        label: "Submissions",
        data: [
          submissionStats.accepted,
          submissionStats.wrong,
          submissionStats.tle,
        ],
        backgroundColor: [
          "rgba(76, 175, 80, 0.8)",
          "rgba(244, 67, 54, 0.8)",
          "rgba(255, 152, 0, 0.8)",
        ],
        hoverOffset: 10, // Highlight effect on hover
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#777",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
          stepSize: 1, // Adjust step size for better granularity
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        beginAtZero: true, // Ensure bars start at zero
        max:
          Math.max(
            problemsSolvedStats.easy,
            problemsSolvedStats.medium,
            problemsSolvedStats.hard
          ) + 1, // Dynamically set max value for taller bars
      },
    },
    animation: {
      duration: 1500, // Smooth animation
      easing: "easeInOutQuad",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center py-4 px-4 md:px-8 w-full">
      <div className="w-6xl mb-10">
        <Navbar />
      </div>
      {/* Header with back button */}
      <div className="flex flex-row justify-between items-center w-full max-w-6xl mb-8">
        <div className="flex justify-center gap-3 items-center">
          <h1 className="text-5xl text-center pl-5 font-extrabold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">
            Profile
          </h1>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="card bg-black/40 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-lg">
          <div className="card-body p-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full w-28 h-28 flex items-center justify-center text-4xl font-bold shadow-lg">
                  {authUser.name
                    ? authUser.name
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase()
                    : "U"}
                </div>
              </div>

              {/* Name and Role Badge */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-white">
                  {authUser.name.toUpperCase()}
                </h2>
                <div className="badge bg-gradient-to-r from-purple-500 to-cyan-500 text-white mt-2 px-4 py-2 rounded-full">
                  {authUser.role}
                </div>
              </div>
            </div>

            <div className="divider my-8 border-gray-700"></div>

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="stat bg-black/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
                <div className="stat-figure text-purple-400">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="stat-title text-gray-400">Email</div>
                <div className="stat-value text-white text-lg break-all">
                  {authUser.email}
                </div>
              </div>

              {/* Role Status */}
              <div className="stat bg-black/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
                <div className="stat-figure text-green-400">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="stat-title text-gray-400">Role</div>
                <div className="stat-value text-white text-lg">
                  {authUser.role}
                </div>
                <div className="stat-desc text-gray-500">
                  {authUser.role === "ADMIN"
                    ? "Full system access"
                    : "Limited access"}
                </div>
              </div>
            </div>

            <div className="divider my-8 border-gray-700"></div>

            {/* Graphical Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bar Chart for Problems Solved */}
              <div className="bg-black/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6 flex flex-col justify-end">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Problems Solved
                </h3>
                <div className="mt-auto">
                  <Bar
                    data={problemsSolvedData}
                    options={chartOptions}
                    height={300}
                  />
                </div>
              </div>
              {/* Pie Chart for Submission Distribution */}
              <div className="bg-black/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Submission Distribution
                </h3>
                <Doughnut
                  data={submissionDistributionData}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="w-full max-w-6xl mt-12 space-y-12">
        <ProfileSubmission />
        <ProblemSolvedByUser />
        <PlaylistProfile />
      </div>
      <div className="container mx-auto px-4">
        <hr className="border-0 border-gray-600 mb-8" />
        <div className="border-t border-white/10 pt-8 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © 2025 DSASNIPPETS.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Built to Revolutionize DSA & Problem Solving</span>
              <span>•</span>
              <span>Built with passion</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
