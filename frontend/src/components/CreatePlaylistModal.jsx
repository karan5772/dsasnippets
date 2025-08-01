import React from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";

const CreatePlaylistModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-2xl w-full max-w-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h3 className="text-2xl font-bold text-white">Create Playlist</h3>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-6 space-y-6"
        >
          {/* Playlist Name Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-300">
                Playlist Name
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-black/70 text-gray-300 border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-lg"
              placeholder="Enter playlist name"
              {...register("name", { required: "Playlist name is required" })}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-red-500">
                  {errors.name.message}
                </span>
              </label>
            )}
          </div>

          {/* Description Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-300">
                Description
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full bg-black/70 text-gray-300 border-gray-700 focus:ring-2 focus:ring-purple-500 focus:outline-none rounded-lg"
              placeholder="Enter playlist description"
              {...register("description")}
            />
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline text-gray-400 hover:text-white border-gray-700 hover:border-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary hover:shadow-lg transition-shadow flex items-center gap-2"
            >
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
