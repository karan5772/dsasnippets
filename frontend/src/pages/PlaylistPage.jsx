import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePlaylistStore } from "../store/usePlaylistStore";
import CustomProblemTableForPlaylist from "../components/CustomProblemTableForPlaylist";

const PlaylistPage = () => {
  // const { id } = { id: "e0cd4d7d-9252-4841-be5a-5d857a387247" }; // Get playlist ID from URL
  const { id } = useParams(); // Get playlist ID from URL
  const { getCustomPlaylistDetails, playlist, isLoading } = usePlaylistStore(); // Use playlist state from the store

  useEffect(() => {
    getCustomPlaylistDetails(id); // Fetch playlist data
  }, [id, getCustomPlaylistDetails]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-lg">Playlist not found</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 md:p-12 rounded-3xl shadow-lg ">
        <div className="max-w-6xl mx-auto">
          {/* Playlist Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">
              {playlist.name}
            </h1>
            <p className="text-gray-300 mt-4">{playlist.description}</p>
            <p className="text-gray-400 mt-2">
              Created by:{" "}
              <span className="text-white font-bold">{playlist.user.name}</span>
            </p>
          </div>

          {/* Problems Table */}
          <div className="mt-8">
            <CustomProblemTableForPlaylist problems={playlist.problems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
