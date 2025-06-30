import express from "express";
import {
  addProblemToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllListDetails,
  getAllLists,
  getCustomPlayListDetails,
  getPlayListDetails,
  removeProblemFromPlaylist,
} from "../controllers/playlist.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const playlistRoutes = express.Router();

playlistRoutes.post("/create-playlist", authMiddleware, createPlaylist);

playlistRoutes.get("/", authMiddleware, getAllListDetails);
playlistRoutes.get("/all-playsist", getAllLists);

playlistRoutes.get("/:playlistId", authMiddleware, getPlayListDetails);
playlistRoutes.get(
  "/custom/:playlistId",

  getCustomPlayListDetails
);

playlistRoutes.post(
  "/:playlistId/add-problem",
  authMiddleware,
  addProblemToPlaylist
);

playlistRoutes.delete("/:playlistId", authMiddleware, deletePlaylist);

playlistRoutes.delete(
  "/:playlistId/remove-problem",
  authMiddleware,
  removeProblemFromPlaylist
);

export default playlistRoutes;
