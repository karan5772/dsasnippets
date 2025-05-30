import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
  ArrowLeft,
  MoveLeft,
  ChevronLeft,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProblemStore } from "../store/useProblemStore";
import { getLanguageId } from "../lib/lang.js";
import { useExecutionStore } from "../store/useExecutionStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import Submission from "../components/Submission";
import SubmissionsList from "../components/SubmissionList";

const ProblemPage = () => {
  const navigate = useNavigate(); // Always call hooks at the top level
  const location = useLocation();
  const { id } = useParams();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();

  const {
    submission: submissions,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
    submissionCount,
  } = useSubmissionStore();

  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState(" ");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);

  const { executeCode, submission, isExecuting } = useExecutionStore();

  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
  }, [id]);

  useEffect(() => {
    if (
      problem?.codeSnippets &&
      selectedLanguage.toLowerCase() in problem.codeSnippets
    ) {
      setCode(problem.codeSnippets[selectedLanguage.toLowerCase()]);
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (problem && problem.codeSnippets) {
      setCode(
        problem.codeSnippets["javascript"] ||
          "// Select Programming Langauge from\n// above to start Writing answer"
      );
    }
  }, [problem]);

  useEffect(() => {
    if (problem) {
      setTestCases(
        problem.testcases?.map((tc) => ({
          input: tc.input,
          output: tc.output,
        })) || []
      );
    }
  }, [problem, selectedLanguage]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((tc) => tc.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id);
    } catch (error) {
      console.log("Error executing code", error);
    }
  };

  if (isProblemLoading || !problem) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900 w-full h-36">
        {/* Full-screen loading spinner */}
        <div className="flex flex-col items-center w-full">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-gray-300 text-lg">Loading problem...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none text-lg font-semibold">
            <h2 className="text-xl font-bold mb-4">Description:</h2>
            <p className="text-base bg-base-100 p-4 rounded-lg mb-4">
              {problem.description}
            </p>

            {problem.examples && (
              <>
                <h3 className="text-lg font-bold mb-4">Examples:</h3>
                {Object.entries(problem.examples).map(
                  ([lang, example], idx) => (
                    <div
                      key={lang}
                      className="bg-base-200 border border-base-300 rounded-lg p-4 mb-4 shadow-sm"
                    >
                      <div className="mb-3">
                        <label className="block text-sm font-semibold text-primary mb-1">
                          Input:
                        </label>
                        <pre className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg max-w-3xl whitespace-pre-wrap overflow-x-auto">
                          {example.input}
                        </pre>
                      </div>

                      <div className="mb-3">
                        <label className="block text-sm font-semibold text-secondary mb-1">
                          Output:
                        </label>
                        <pre className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg max-w-3xl whitespace-pre-wrap overflow-x-auto">
                          {example.output}
                        </pre>
                      </div>

                      {example.explanation && (
                        <div>
                          <label className="block text-sm font-semibold text-success mb-1">
                            Explanation:
                          </label>
                          <p className="text-base-content/80 text-sm leading-relaxed max-w-3xl">
                            {example.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                )}
              </>
            )}

            {problem.constraints && (
              <>
                <h3 className="text-lg font-bold mb-4">Constraints:</h3>
                <div className=" p-8  mb-6 bg-black/90 px-6 py-3 rounded-lg font-semibold text-white text-lg text-center">
                  <span className="p-10">{problem.constraints}</span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      case "discussion":
        return (
          <div className="p-4 text-center text-base-content/70">
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-base-200 p-6 rounded-xl">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleBackNavigation = () => {
    navigate(location.state?.from || "/home");
  };

  return (
    <div
      className=" max-w-full w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden p-10"
      data-theme="mytheme"
    >
      <nav className="navbar bg-base-100 shadow-lg px-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-lg pt-4 pb-4 pl-5 pr-5">
        <div className="flex-1 gap-2 ">
          <div className="btn btn-soft p-2 pr-5 bg-gray-900">
            <button
              onClick={handleBackNavigation}
              className="flex items-center gap-2 text-primary hover:text-primary-focus"
            >
              <ChevronLeft className="w-6 h-6" />
              <div className="">Back</div>
            </button>
          </div>
          <div className="mt-2">
            <h1 className="text-2xl font-extrabold text-white pt-3">
              {problem.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-5">
              <Clock className="w-4 h-4" />
              <span>
                Updated{" "}
                {new Date(problem.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-gray-500">•</span>
              <Users className="w-4 h-4" />
              <span>{submissionCount} Submissions</span>
            </div>
          </div>
        </div>
        <div className="flex-none gap-4">
          <button
            className="btn btn-ghost btn-circle hover:text-gray-400 mr-4 ml-4"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
          >
            <Share2 className="w-5 h-5" />
          </button>
          <select
            className="select select-bordered select-primary w-40 bg-gray-800 text-white"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.keys(problem.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <div className="container mx-auto pt-6 max-w-full">
        <div className="grid grid-cols-5 gap-6">
          {/* Left Content (40% width) */}
          <div className="col-span-2 card bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 text-white shadow-2xl rounded-lg">
            <div className="card-body p-0 ">
              <div className="tabs tabs-bordered rounded-t-lg">
                <button
                  className={`tab gap-2 text-base font-medium transition-all ${
                    activeTab === "description"
                      ? "tab-active text-primary"
                      : "hover:text-gray-400"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-5 h-5" />
                  Description
                </button>
                <button
                  className={`tab gap-2 text-base font-medium transition-all ${
                    activeTab === "submissions"
                      ? "tab-active text-primary"
                      : "hover:text-gray-400"
                  }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-5 h-5" />
                  Submissions
                </button>
                <button
                  className={`tab gap-2 text-base font-medium transition-all ${
                    activeTab === "discussion"
                      ? "tab-active text-primary"
                      : "hover:text-gray-400"
                  }`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-5 h-5" />
                  Discussion
                </button>
                <button
                  className={`tab gap-2 text-base font-medium transition-all ${
                    activeTab === "hints"
                      ? "tab-active text-primary"
                      : "hover:text-gray-400"
                  }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-5 h-5" />
                  Hints
                </button>
              </div>

              <div className="p-6">{renderTabContent()}</div>
            </div>
          </div>

          <div className="col-span-3 card bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 text-white shadow-2xl rounded-lg">
            <div className="card-body p-0">
              <div className="tabs tabs-bordered rounded-t-lg">
                <button className="tab tab-active gap-2 text-base font-medium text-primary">
                  <Terminal className="w-5 h-5" />
                  Code Editor
                </button>
              </div>

              <div className="h-full w-full border-t border-gray-700">
                <Editor
                  height="100%"
                  language={selectedLanguage.toLowerCase()}
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 15,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                  }}
                />
              </div>

              <div className="p-4 border-t border-gray-700 bg-gray-800 rounded-b-lg">
                <div className="flex justify-between items-center">
                  <button></button>
                  <button
                    className={`btn btn-primary gap-2 ${
                      isExecuting ? "loading" : "hover:shadow-lg"
                    }`}
                    onClick={handleRunCode}
                    disabled={isExecuting}
                  >
                    {!isExecuting && <Play className="w-5 h-5" />}
                    Run Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl rounded-lg mt-7">
          <div className="card-body">
            {submission ? (
              <Submission submission={submission} />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-100">
                    Test Cases
                  </h3>
                </div>
                <div className="overflow-x-auto rounded-lg">
                  <table className="table table-zebra w-full rounded-lg">
                    <thead className="bg-gray-700 rounded-lg">
                      <tr>
                        <th>Input</th>
                        <th>Expected Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testcases.map((testCase, index) => (
                        <tr key={index}>
                          <td className="font-mono whitespace-pre-wrap text-white">
                            {testCase.input}
                          </td>
                          <td className="font-mono whitespace-pre-wrap text-white">
                            {testCase.output}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
