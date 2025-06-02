import { db } from "../libs/db.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    const playlist = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create playlist",
    });
  }
};

export const getAllLists = async (req, res) => {
  try {
    const playlist = await db.playlist.findMany({
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "No Problems Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error Featching Playlist:", error);
    res.status(500).json({
      success: false,
      message: "Failed to Fatch Playlist",
    });
  }
};

export const getAllListDetails = async (req, res) => {
  const userId = req.user.id;
  try {
    const playlist = await db.playlist.findMany({
      where: {
        userId,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "No Problems Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error Featching Playlist:", error);
    res.status(500).json({
      success: false,
      message: "Failed to Fatch Playlist",
    });
  }
};

export const getPlayListDetails = async (req, res) => {
  const userId = req.user.id;
  const playlistId = req.params.playlistId;

  try {
    const playlist = await db.playlist.findUnique({
      where: {
        userId,
        playlistId,
      },
      include: {
        problems: {
          include: {
            problems: true,
          },
        },
      },
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "No playlisy found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error Featching Playlist Details :", error);
    res.status(500).json({
      success: false,
      message: "Failed to Featch Playlist Details",
    });
  }
};

export const getCustomPlayListDetails = async (req, res) => {
  const { playlistId } = req.params; // Extract playlist ID from the request parameters

  try {
    // Fetch the playlist by ID, including all problems in the playlist
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
      },
      include: {
        problems: {
          include: {
            problem: true, // Include problem details
          },
        },
        user: true, // Include user details (creator of the playlist)
      },
    });

    // If the playlist is not found, return a 404 error
    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // Transform the playlist data to include the problems directly

    // Return the playlist details
    res.status(200).json({
      success: true,
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error fetching playlist with problems:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch playlist details",
    });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  const userId = req.user.id;
  const { problemIds } = req.body;
  const playlistId = req.params.playlistId;
  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return scrollbars.status(404).json({
        success: false,
        message: "Invalid or Missing Problem ID's",
      });
    }

    const problemsInPlaylist = await db.problemsInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playlistId,
        problemId,
      })),
    });

    res.status(201).json({
      success: true,
      message: "Problems added to playlist successfully",
      problemsInPlaylist,
    });
  } catch (error) {
    console.error("Error adding Problems to the Palylist :", error);
    res.status(500).json({
      success: false,
      message: "Failed to Add Problems to the Palylist",
    });
  }
};

export const deletePlaylist = async (req, res) => {
  const playlistId = req.params.playlistId;

  try {
    const deletedPlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    if (!deletePlaylist) {
      res.status(200).json({
        success: false,
        message: "Playlist Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
      deletedPlaylist,
    });
  } catch (error) {
    console.error("Error Featching Playlist Details :", error);
    res.status(500).json({
      success: false,
      message: "Failed to Featch Playlist Details",
    });
  }
};

export const removeProblemFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;
  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return scrollbars.status(404).json({
        success: false,
        message: "Invalid or Missing Problem ID's",
      });
    }

    const removedProblems = await db.problemsInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });
    res.status(200).json({
      success: true,
      message: "Problem removed from playlist successfully",
      deletedProblem,
    });
  } catch (error) {
    console.error("Error Removing Problem from Playlist :", error);
    res.status(500).json({
      success: false,
      message: "Failed to Remove Problem from Playlist",
    });
  }
};
