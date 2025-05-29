import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  List,
  Tag,
  ExternalLink,
} from "lucide-react";

const PlaylistProfile = () => {
  const { getAllPlaylists, playlists, deletePlaylist } = usePlaylistStore();
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const togglePlaylist = (id) => {
    if (expandedPlaylist === id) {
      setExpandedPlaylist(null);
    } else {
      setExpandedPlaylist(id);
    }
  };

  const handleDelete = async (id) => {
    await deletePlaylist(id);
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return <span className="badge bg-green-500 text-white">Easy</span>;
      case "MEDIUM":
        return <span className="badge bg-yellow-500 text-black">Medium</span>;
      case "HARD":
        return <span className="badge bg-red-500 text-white">Hard</span>;
      default:
        return <span className="badge bg-gray-500 text-white">Unknown</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 md:p-12 rounded-3xl shadow-lg">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">
            My Playlists
          </h2>
        </div>

        {playlists.length === 0 ? (
          <div className="card bg-black/50 border border-gray-700 shadow-lg rounded-lg">
            <div className="card-body items-center text-center">
              <h3 className="text-2xl font-bold text-white">
                No playlists found
              </h3>
              <p className="text-gray-400">
                You Currently do not have any Playlists.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="card bg-black/50 border border-gray-700 shadow-lg rounded-lg"
              >
                <div className="card-body p-4">
                  {/* Playlist Header */}
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => togglePlaylist(playlist.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder flex items-center justify-center">
                        <div className="bg-purple-500 text-white rounded-lg w-12 items-center">
                          <BookOpen size={24} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {playlist.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <List size={14} />
                            <span>{playlist.problems.length} problems</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>
                              Created {formatDate(playlist.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-circle btn-ghost">
                      {expandedPlaylist === playlist.id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mt-2">{playlist.description}</p>

                  {/* Expanded Problems List */}
                  {expandedPlaylist === playlist.id && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Problems in this playlist
                      </h4>

                      {playlist.problems.length === 0 ? (
                        <div className="alert bg-black/70 text-gray-400">
                          <span>No problems added to this playlist yet.</span>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="table-auto w-full text-left text-gray-300">
                            <thead className="bg-black/70 text-gray-400">
                              <tr>
                                <th className="p-4">Problem</th>
                                <th className="p-4">Difficulty</th>
                                <th className="p-4">Tags</th>
                                <th className="p-4 text-right">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {playlist.problems.map((item) => (
                                <tr
                                  key={item.id}
                                  className="hover:bg-black/70 transition-all"
                                >
                                  <td className="p-4 font-medium">
                                    {item.problem.title}
                                  </td>
                                  <td className="p-4">
                                    {getDifficultyBadge(
                                      item.problem.difficulty
                                    )}
                                  </td>
                                  <td className="p-4">
                                    <div className="flex flex-wrap gap-2">
                                      {item.problem.tags &&
                                        item.problem.tags.map((tag, idx) => (
                                          <div
                                            key={idx}
                                            className="badge bg-purple-500 text-white"
                                          >
                                            <Tag size={10} className="mr-1" />
                                            {tag}
                                          </div>
                                        ))}
                                    </div>
                                  </td>
                                  <td className="p-4 text-right">
                                    <Link
                                      to={`/problem/${item.problem.id}`}
                                      className="btn btn-sm btn-outline btn-primary"
                                    >
                                      <ExternalLink
                                        size={14}
                                        className="mr-1"
                                      />
                                      Solve
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={() => handleDelete(playlist.id)}
                          className="btn btn-sm btn-error"
                        >
                          Delete Playlist
                        </button>
                      </div>
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

export default PlaylistProfile;
