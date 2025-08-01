import React, { useState, useMemo, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Bookmark, PencilIcon, TrashIcon, ArrowUp, Plus } from "lucide-react";
import { useActions } from "../store/useAction";
import { usePlaylistStore } from "../store/usePlaylistStore";
import CreatePlaylistModal from "./CreatePlaylistModal";
import AddToPlaylistModal from "./AddToPlaylist";

const ProblemsTable = ({ problems }) => {
  const { authUser } = useAuthStore();

  const [search, setSearch] = useState("");
  const { isDeletingProblem, onDeleteProblem } = useActions();

  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [visibleProblems, setVisibleProblems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const { createPlaylist, getAllPlaylists } = usePlaylistStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  const observerRef = useRef(null);

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  // Define allowed difficulties
  const difficulties = ["EASY", "MEDIUM", "HARD"];

  // Filter problems based on search, difficulty, and tags
  // Filter problems based on search, difficulty, and tags, and sort by creation time
  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first
  }, [problems, search, difficulty, selectedTag]);

  // Load more problems for infinite scrolling
  const loadMoreProblems = () => {
    const currentLength = visibleProblems.length;
    const nextProblems = filteredProblems.slice(
      currentLength,
      currentLength + 5
    );

    if (nextProblems.length === 0) {
      setHasMore(false);
    } else {
      setVisibleProblems((prev) => {
        const uniqueProblems = nextProblems.filter(
          (problem) => !prev.some((p) => p.id === problem.id)
        );
        return [...prev, ...uniqueProblems];
      });
    }
  };

  // Observe the bottom element for infinite scrolling
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProblems();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, visibleProblems]);

  // Initialize visible problems on mount
  useEffect(() => {
    setVisibleProblems(filteredProblems.slice(0, 5));
    setHasMore(true);
  }, [filteredProblems]);

  // To delete the problems
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this problem? This action cannot be undone."
    );

    if (!confirmDelete) return;
    onDeleteProblem(id); // Call the delete function
    setVisibleProblems((prev) => prev.filter((problem) => problem.id !== id)); // Remove the deleted problem
  };

  const handleCreatePlaylist = async (data) => {
    await createPlaylist(data);
    await getAllPlaylists(); // Refetch playlists
  };

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  // Show scroll-to-top button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const companyNames = [
    "Learnyst",
    "Teachyst",
    "CodeLab",
    "DevHub",
    "AlgoExpert",
    "Google",
    "AsternityUI",
    "BharatUI",
  ];
  const [companyMap, setCompanyMap] = useState({});

  useEffect(() => {
    if (!problems) return;
    const map = {};
    problems.forEach((problem) => {
      // Use existing company if present, else assign a random one
      map[problem.id] =
        problem.company && problem.company.length > 0
          ? problem.company
          : [companyNames[Math.floor(Math.random() * companyNames.length)]];
    });
    setCompanyMap(map);
  }, [problems]);

  return (
    <div className="w-7xl mx-auto mt-10">
      {/* Header with Create Playlist Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Problems</h2>
        <button
          className="btn btn-primary gap-2"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by title"
          className="input p-2 bg-gray-900 rounded-sm border-1 border-gray-400 w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select p-2 bg-gray-900 rounded-sm border-1 border-gray-400"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="ALL">All Difficulties</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <select
          className="select p-2 bg-gray-900 rounded-sm border-1 border-gray-400"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="ALL">All Tags</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        {/* Add a wrapper with fixed height and vertical scrolling */}
        <div className="max-h-[500px] overflow-y-auto">
          <table className="table table-zebra table-lg bg-base-200 text-base-content w-full">
            <thead className="bg-base-300">
              <tr>
                <th className="text-center">Solved</th>
                <th className="text-center">Title</th>
                <th className="text-center">Tags</th>
                <th className="text-center">Company</th>
                <th className="text-center">Difficulty</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleProblems.map((problem) => {
                const isSolved = problem.solvedBy.some(
                  (user) => user.userId === authUser?.id
                );
                return (
                  <tr key={problem.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isSolved}
                        readOnly
                        className="checkbox checkbox-sm"
                      />
                    </td>
                    <td>
                      <Link
                        to={`/problem/${problem.id}`}
                        className="font-semibold hover:underline"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {(problem.tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className={`badge badge-outline text-xs font-bold ${
                              tag.toLowerCase() === "demo"
                                ? "badge-success" // Green color for "Demo" tags
                                : "badge-warning"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {(companyMap[problem.id] || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="badge badge-outline badge-info text-xs font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge font-semibold text-xs text-white ${
                          problem.difficulty === "EASY"
                            ? "badge-success"
                            : problem.difficulty === "MEDIUM"
                            ? "badge-warning"
                            : "badge-error"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        {authUser?.role === "ADMIN" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDelete(problem.id)}
                              className="btn btn-sm btn-error"
                            >
                              <TrashIcon className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        )}
                        <button
                          className="btn btn-sm btn-outline flex gap-2 items-center"
                          onClick={() => handleAddToPlaylist(problem.id)}
                        >
                          <Bookmark className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            Save to Playlist
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && <div ref={observerRef} className="h-10"></div>}

      {/* Scroll-to-Top Button */}

      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />

      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default ProblemsTable;
