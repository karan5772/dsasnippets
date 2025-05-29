import React from "react";
import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { authUser } = useAuthStore();

  return (
    <nav className="sticky top-0 z-50 w-full py-5">
      <div className="flex w-full justify-between mx-auto max-w-4xl bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="/dsasnippets.svg"
            className="h-18 w-18 bg-primary/20 text-primary border-none px-2 py-2 rounded-full"
          />
          <span className="text-lg md:text-2xl font-bold tracking-tight text-white hidden md:block">
            DSASNIPPETS
          </span>
        </Link>

        {/* Conditional Rendering for Authenticated and Non-Authenticated Users */}
        <div className="flex items-center gap-8">
          {authUser ? (
            // User Profile and Dropdown
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold ring ring-primary ring-offset-base-100 ring-offset-2">
                  {authUser.name
                    ? authUser.name
                        .split(" ")
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase()
                    : "U"}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
              >
                {/* Common Options */}
                <li>
                  <p className="text-base font-semibold">{authUser.name}</p>
                  <hr className="border-gray-200/10" />
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="hover:bg-primary hover:text-white text-base font-semibold"
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </Link>
                </li>
                {authUser.role === "ADMIN" && (
                  <li>
                    <Link
                      to="/add-problem"
                      className="hover:bg-primary hover:text-white text-base font-semibold"
                    >
                      <Code className="w-4 h-4 mr-1" />
                      Add Problem
                    </Link>
                  </li>
                )}
                <li>
                  <LogoutButton className="hover:bg-primary hover:text-white">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </LogoutButton>
                </li>
              </ul>
            </div>
          ) : (
            // Login and Sign Up Buttons
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="btn btn-outline btn-primary text-sm md:text-base"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary text-sm md:text-base"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
