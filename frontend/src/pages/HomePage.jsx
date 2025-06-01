import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { Loader } from "lucide-react";
import ProblemTable from "../components/ProblemTable";
import { Link } from "react-router-dom";

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
    <div className="flex flex-col items-center mt-14 px-4 text-white">
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

      {/* Buy Playlist Button */}
      <div className="mt-8">
        <Link
          to="/playlist/30fbe0b6-b42d-4619-a96b-3a516dcc9ade"
          className="flex items-center gap-3 cursor-pointer hover:text-white"
        >
          <span className="btn btn-primary text-3xl  p-8 pl-13 pr-13 rounded-full hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg hover:from-pink-600 hover:to-orange-600 hover:scale-105">
            Buy Playlist
          </span>
        </Link>
      </div>

      {/* Problems Section */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 pt-0 mt-10 rounded-2xl">
        {problems.length > 0 ? (
          <div className="mt-10 w-full min-w-[300px] md:min-w-[600px] lg:min-w-[800px] z-10">
            <ProblemTable problems={problems} />
          </div>
        ) : (
          <p className="mt-10 text-center text-lg font-semibold text-gray-500 z-10 border border-primary px-6 py-4 rounded-lg border-dashed">
            No problems found
          </p>
        )}
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

export default HomePage;
