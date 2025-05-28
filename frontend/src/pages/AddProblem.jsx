import React from "react";
import CreateProblemForm from "../components/CreateProblemForm";

const AddProblem = () => {
  return (
    <div className="max-w-8/12">
      {/* Form Container */}
      <div className="w-full max-w-9xl bg-gray-800 shadow-2xl rounded-xl p-8">
        <CreateProblemForm />
      </div>
    </div>
  );
};

export default AddProblem;
