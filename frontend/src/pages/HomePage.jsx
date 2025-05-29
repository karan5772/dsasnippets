import React, { useEffect } from "react";

import { useProblemStore } from "../store/useProblemStore";
import { Loader } from "lucide-react";
import ProblemTable from "../components/ProblemTable";

const HomePage = () => {
  const { getAllProblems, problems, isProblemsLoading } = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, [getAllProblems]);

  if (isProblemsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center mt-14 px-4  text-white">
      {/* Background Glow */}
      <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-primary opacity-40 blur-3xl rounded-md"></div>
      <div className="absolute bottom-16 right-0 w-1/3 h-1/3 bg-secondary opacity-40 blur-3xl rounded-md"></div>

      {/* Heading */}
      <h1 className="text-5xl font-extrabold z-10 text-center tracking-wide">
        Welcome to <span className="text-primary">DSASNIPPETS</span>
      </h1>

      {/* Subheading */}
      <p className="mt-6 text-center text-lg font-medium text-gray-300 z-10 max-w-3xl">
        The next-generation coding platform where{" "}
        <span className="text-blue-500 font-semibold">
          creators build problems
        </span>{" "}
        and{" "}
        <span className="text-cyan-400 font-semibold">coders solve them</span>.
        <br />
        Create questions manually or with AI, sell premium playlists, and
        execute code in real-time.
      </p>

      {/* Problems Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 pt-0 mt-10 rounded-2xl">
        {problems.length > 0 ? (
          <div className="mt-10 w-full z-10 ">
            <ProblemTable problems={problems} />
          </div>
        ) : (
          <p className="mt-10 text-center text-lg font-semibold text-gray-500 z-10 border border-primary px-6 py-4 rounded-lg border-dashed">
            No problems found
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
