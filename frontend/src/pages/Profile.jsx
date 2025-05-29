import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, User, Shield, Image } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import ProfileSubmission from "../components/ProfileSubmission";
import ProblemSolvedByUser from "../components/ProblemSolvedByUser";
import PlaylistProfile from "../components/PlaylistProfile";

const Profile = () => {
  const { authUser } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center py-10 px-4 md:px-8 w-full">
      {/* Header with back button */}
      <div className="flex flex-row justify-between items-center w-full max-w-6xl mb-8">
        <div className="flex items-center gap-3">
          <Link
            to={"/home"}
            className="btn btn-circle btn-ghost hover:bg-gray-700"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text">
            Profile
          </h1>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="card bg-black/40 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-lg">
          <div className="card-body p-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full w-28 h-28 flex items-center justify-center text-4xl font-bold shadow-lg">
                  {authUser.name
                    ? authUser.name
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase()
                    : "U"}
                </div>
              </div>

              {/* Name and Role Badge */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold text-white">
                  {authUser.name.toUpperCase()}
                </h2>
                <div className="badge bg-gradient-to-r from-purple-500 to-cyan-500 text-white mt-2 px-4 py-2 rounded-full">
                  {authUser.role}
                </div>
              </div>
            </div>

            <div className="divider my-8 border-gray-700"></div>

            {/* User Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="stat bg-black/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
                <div className="stat-figure text-purple-400">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="stat-title text-gray-400">Email</div>
                <div className="stat-value text-white text-lg break-all">
                  {authUser.email}
                </div>
              </div>

              {/* User ID */}
              <div className="stat bg-black/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
                <div className="stat-figure text-cyan-400">
                  <User className="w-8 h-8" />
                </div>
                <div className="stat-title text-gray-400">User ID</div>
                <div className="stat-value text-white text-sm break-all">
                  {authUser.id}
                </div>
              </div>

              {/* Role Status */}
              <div className="stat bg-black/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
                <div className="stat-figure text-green-400">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="stat-title text-gray-400">Role</div>
                <div className="stat-value text-white text-lg">
                  {authUser.role}
                </div>
                <div className="stat-desc text-gray-500">
                  {authUser.role === "ADMIN"
                    ? "Full system access"
                    : "Limited access"}
                </div>
              </div>

              {/* Profile Image Status */}
              <div className="stat bg-black/50 backdrop-blur-lg border border-gray-700 rounded-xl p-6">
                <div className="stat-figure text-yellow-400">
                  <Image className="w-8 h-8" />
                </div>
                <div className="stat-title text-gray-400">Profile Image</div>
                <div className="stat-value text-white text-lg">
                  {authUser.image ? "Uploaded" : "Not Set"}
                </div>
                <div className="stat-desc text-gray-500">
                  {authUser.image
                    ? "Image available"
                    : "Upload a profile picture"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="card-actions justify-end mt-8">
              <button className="btn btn-outline btn-primary hover:bg-purple-500 hover:border-purple-500">
                Edit Profile
              </button>
              <button className="btn btn-primary bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="w-full max-w-6xl mt-12 space-y-12">
        <ProfileSubmission />
        <ProblemSolvedByUser />
        <PlaylistProfile />
      </div>
    </div>
  );
};

export default Profile;
