import React, { useEffect, useState } from "react";
import { X, Plus, Loader } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";

const AddToPlaylistModal = ({ isOpen, onClose, problemId }) => {
  const { playlists, getAllPlaylists, addProblemToPlaylist, isLoading } =
    usePlaylistStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if (isOpen) {
      getAllPlaylists();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;

    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-lg w-full max-w-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">Add to Playlist</h3>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Playlist Selection */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-300 font-medium">
                Select Playlist
              </span>
            </label>
            <select
              className="select select-bordered w-full bg-black/70 text-gray-300 border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
              value={selectedPlaylist}
              onChange={(e) => setSelectedPlaylist(e.target.value)}
              disabled={isLoading}
            >
              <option value="">Select a playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline text-gray-400 hover:text-white border-gray-700 hover:border-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary flex items-center gap-2 ${
                !selectedPlaylist || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={!selectedPlaylist || isLoading}
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Add to Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
