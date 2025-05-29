import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Link, useLocation } from "react-router-dom";
import {
  Tag,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Circle,
} from "lucide-react";

const ProblemSolvedByUser = () => {
  const location = useLocation();
  const { getSolvedProblemByUser, solvedProblems } = useProblemStore();

  useEffect(() => {
    getSolvedProblemByUser();
  }, [getSolvedProblemByUser]);

  // Function to get difficulty badge styling
  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return (
          <div className="badge bg-green-500 text-white gap-1">
            <CheckCircle size={12} />
            Easy
          </div>
        );
      case "MEDIUM":
        return (
          <div className="badge bg-yellow-500 text-black gap-1">
            <Circle size={12} />
            Medium
          </div>
        );
      case "HARD":
        return (
          <div className="badge bg-red-500 text-white gap-1">
            <AlertTriangle size={12} />
            Hard
          </div>
        );
      default:
        return <div className="badge bg-gray-500 text-white">Unknown</div>;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 md:p-12 rounded-3xl shadow-lg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text mb-8">
          Problems Solved
        </h2>

        {solvedProblems.length === 0 ? (
          <div className="card bg-black/50 border border-gray-700 shadow-lg rounded-lg">
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold text-white">
                No problems solved yet
              </h3>
              <p className="text-gray-400">
                Start solving problems to see them listed here!
              </p>
              <div className="card-actions justify-center mt-4">
                <Link to="/home" className="btn btn-primary">
                  View Problems
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="card bg-black/50 border border-gray-700 shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left text-gray-300">
                <thead className="bg-black/70 text-gray-400">
                  <tr>
                    <th className="p-4">Problem</th>
                    <th className="p-4">Difficulty</th>
                    <th className="p-4">Tags</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {solvedProblems.map((problem) => (
                    <tr
                      key={problem.id}
                      className="hover:bg-black/70 transition-all"
                    >
                      <td className="p-4 font-medium">{problem.title}</td>
                      <td className="p-4">
                        {getDifficultyBadge(problem.difficulty)}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {problem.tags &&
                            problem.tags.map((tag, index) => (
                              <div
                                key={index}
                                className="badge bg-purple-500 text-white"
                              >
                                <Tag size={10} className="mr-1" />
                                {tag}
                              </div>
                            ))}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <Link
                          to={`/problem/${problem.id}`}
                          state={{ from: location.pathname }}
                          className="btn btn-sm btn-outline btn-primary"
                        >
                          <ExternalLink size={14} className="mr-1" />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-footer bg-black/70 p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  Total problems solved:{" "}
                  <span className="font-bold text-white">
                    {solvedProblems.length}
                  </span>
                </span>
                <Link to="/home" className="btn btn-sm btn-primary ">
                  Solve more problems
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        {solvedProblems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="stat bg-black/50 border border-gray-700 shadow-lg rounded-lg p-4">
              <div className="stat-title text-gray-400">Easy</div>
              <div className="stat-value text-green-400 text-2xl">
                {solvedProblems.filter((p) => p.difficulty === "EASY").length}
              </div>
            </div>
            <div className="stat bg-black/50 border border-gray-700 shadow-lg rounded-lg p-4">
              <div className="stat-title text-gray-400">Medium</div>
              <div className="stat-value text-yellow-400 text-2xl">
                {solvedProblems.filter((p) => p.difficulty === "MEDIUM").length}
              </div>
            </div>
            <div className="stat bg-black/50 border border-gray-700 shadow-lg rounded-lg p-4">
              <div className="stat-title text-gray-400">Hard</div>
              <div className="stat-value text-red-400 text-2xl">
                {solvedProblems.filter((p) => p.difficulty === "HARD").length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemSolvedByUser;
