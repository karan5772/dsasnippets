import React from "react";
import CreateProblemForm from "../components/CreateProblemForm";

const AddProblem = () => {
  return (
    <div className="max-w-8/12">
      {/* Form Container */}
      <div className="w-full max-w-9xl bg-gray-800 shadow-2xl rounded-xl p-8">
        <CreateProblemForm />
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

export default AddProblem;
