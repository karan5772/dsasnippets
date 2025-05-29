import React, { useEffect, useState } from "react";
import { useSubmissionStore } from "../store/useSubmissionStore";
import {
  Code,
  Terminal,
  Clock,
  HardDrive,
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  CircleX,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const ProfileSubmission = () => {
  const { submissions, getAllSubmissions } = useSubmissionStore();
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    getAllSubmissions();
  }, [getAllSubmissions]);

  const getStatusClass = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "bg-green-500 text-white";
      case "REJECTED":
        return "bg-red-500 text-white";
      case "Time Limit Exceeded":
        return "bg-yellow-500 text-black";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const toggleExpand = (id) => {
    if (expandedSubmission === id) {
      setExpandedSubmission(null);
    } else {
      setExpandedSubmission(id);
    }
  };

  const filteredSubmissions = submissions.filter((submission) => {
    if (filter === "all") return true;
    return submission.status === filter;
  });

  const formatLanguage = (language) => {
    if (!language) return "Unknown";
    return language.toLowerCase();
  };

  const parseJSON = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 md:p-12 rounded-3xl shadow-lg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-300 via-pink-400 to-cyan-400 bg-clip-text">
            My Submissions
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Filter Dropdown */}
            <div className="dropdown dropdown-end ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-outline gap-2 bg-black/50 border border-gray-700 hover:bg-purple-500 hover:border-purple-500 text-white m-7 text-2xl p-8"
              >
                <Filter size={25} />
                {filter === "all" ? "All Submissions" : filter}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-10 menu p-2 shadow bg-black/50 border border-gray-700 rounded-lg"
              >
                <li>
                  <button onClick={() => setFilter("all")}>
                    All Submissions
                  </button>
                </li>
                <li>
                  <button onClick={() => setFilter("ACCEPTED")}>
                    Accepted
                  </button>
                </li>
                <li>
                  <button onClick={() => setFilter("REJECTED")}>
                    Rejected
                  </button>
                </li>
                <li>
                  <button onClick={() => setFilter("Time Limit Exceeded")}>
                    Time Limit Exceeded
                  </button>
                </li>
              </ul>
            </div>

            {/* Stats */}
            <div className="stats shadow bg-black/50 border border-gray-700 rounded-lg">
              <div className="stat p-4">
                <div className="stat-title text-gray-400">Total</div>
                <div className="stat-value text-white">
                  {submissions.length}
                </div>
              </div>
              <div className="stat p-4">
                <div className="stat-title text-gray-400">ACCEPTED</div>
                <div className="stat-value text-green-400">
                  {submissions.filter((s) => s.status === "ACCEPTED").length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submissions */}
        {filteredSubmissions.length === 0 ? (
          <div className="card bg-black/50 border border-gray-700 shadow-lg rounded-lg">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-white">No submissions found</h2>
              <p className="text-gray-400">
                You haven't submitted any solutions yet, or none match your
                current filter.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="card bg-black/50 border border-gray-700 shadow-lg rounded-lg overflow-hidden transition-all duration-300"
              >
                <div className="card-body p-0">
                  {/* Submission Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
                      <div
                        className={`badge badge-lg ${getStatusClass(
                          submission.status
                        )}`}
                      >
                        {submission.status === "ACCEPTED" ? (
                          <Check size={14} className="mr-1" />
                        ) : (
                          <CircleX size={14} className="mr-1" />
                        )}
                        {submission.status}
                      </div>

                      <div className="flex items-center gap-2 text-gray-300">
                        <Code size={16} />
                        <span className="font-medium">
                          {submission.language}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock size={16} />
                        <span>
                          Submitted {formatDate(submission.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3 md:mt-0">
                      {expandedSubmission === submission.id ? (
                        <button
                          onClick={() => toggleExpand(submission.id)}
                          className="btn btn-circle btn-ghost hover:bg-gray-700"
                        >
                          <ChevronUp size={20} />
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleExpand(submission.id)}
                          className="btn btn-circle btn-ghost hover:bg-gray-700"
                        >
                          <ChevronDown size={20} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedSubmission === submission.id && (
                    <div className="border-t border-gray-700">
                      {/* Code Section */}
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-white">
                          <Code size={18} />
                          Solution Code
                        </h3>
                        <div className="mockup-code bg-black/70 text-gray-300 overflow-x-auto rounded-lg">
                          <SyntaxHighlighter
                            language={
                              formatLanguage(submission.language) ||
                              "javascript"
                            }
                            style={dracula}
                            customStyle={{
                              background: "transparent",
                              padding: "1rem",
                              borderRadius: "0.5rem",
                            }}
                          >
                            {submission.sourceCode}
                          </SyntaxHighlighter>
                        </div>
                      </div>

                      {/* Input/Output Section */}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSubmission;
