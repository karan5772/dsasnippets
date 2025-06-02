import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePlaylistStore } from "../store/usePlaylistStore";

const AllPlaylistsPage = () => {
  const { getAllDbPlaylists, playlists, isLoading } = usePlaylistStore();

  useEffect(() => {
    getAllDbPlaylists();
  }, [getAllDbPlaylists]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center w-full">
          <span className="loading loading-dots loading-lg"></span>
          <p className="mt-4 text-4xl">Loading Playlists...</p>
        </div>
      </div>
    );
  }

  if (!playlists || playlists.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="text-white text-lg">
          Currently there are no Playlists for Public
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10">
      {/* Background gradients */}
      <div className="absolute top-16 left-0 w-1/3 h-1/3 bg-primary opacity-40 blur-3xl rounded-md z-0"></div>
      <div className="absolute bottom-16 right-0 w-1/3 h-1/3 bg-secondary opacity-40 blur-3xl rounded-md z-0"></div>

      {/* Main blurred container */}
      <div className="relative z-10 w-full max-w-7xl rounded-3xl bg-black/60 backdrop-blur-md shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold mb-10 text-white text-center">
          All Playlists
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 rounded-3xl shadow-lg flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="btn-circle">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-2xl flex items-center justify-center font-bold ring ring-primary ring-offset-base-100 ring-offset-2 w-16 h-16 rounded-full shadow-lg">
                    {playlist.user?.name
                      ? playlist.user.name
                          .split(" ")
                          .map((word) => word.charAt(0))
                          .join("")
                          .toUpperCase()
                      : "U"}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{playlist.name}</h2>
                  <p className="text-gray-400 text-sm">
                    Created by:{" "}
                    <span className="text-white font-semibold">
                      {playlist.user?.name || "Unknown"}
                    </span>
                  </p>
                  <p className="text-gray-500 text-xs">
                    Created: {new Date(playlist.createdAt).toLocaleDateString()}{" "}
                    | Updated:{" "}
                    {new Date(playlist.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{playlist.description}</p>
              <Link
                to={`/playlist/${playlist.id}`}
                className="mt-auto btn btn-primary w-full text-center"
              >
                View Playlist
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPlaylistsPage;
