import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Bookmark } from "lucide-react";

const CustomProblemTableForPlaylist = ({ problems }) => {
  const location = useLocation();
  // Parse the input to extract the `problem` object from each item
  const parsedProblems = problems.map((item) => item.problem);

  return (
    <div className="w-full max-w-6xl mx-auto mt-10">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <table className="table-auto w-full text-left text-gray-300">
          {/* Table Header */}
          <thead className="bg-gray-700 text-gray-200 uppercase text-sm">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Tags</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {parsedProblems.map((problem, index) => (
              <tr
                key={problem.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                } hover:bg-gray-700 transition-all`}
              >
                {/* Problem Title */}
                <td className="p-4 font-medium">
                  <Link
                    to={`/problem/${problem.id}`}
                    state={{ from: location.pathname }}
                    className="text-purple-400 hover:underline"
                  >
                    {problem.title}
                  </Link>
                </td>
                {/* Problem Tags */}
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {(problem.tags || []).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-500 text-white text-xs font-semibold px-2 py-1 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                {/* Problem Difficulty */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      problem.difficulty === "EASY"
                        ? "bg-green-500 text-white"
                        : problem.difficulty === "MEDIUM"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {problem.difficulty}
                  </span>
                </td>
                {/* Actions */}
                <td className="p-4 text-right">
                  <Link
                    to={`/problem/${problem.id}`}
                    className="btn btn-sm btn-outline flex gap-2 items-center text-gray-300 hover:text-white hover:bg-gray-700 border-gray-600"
                  >
                    <span className="hidden sm:inline">Solve</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomProblemTableForPlaylist;
