import React, { useState, useEffect } from "react";
import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsNavbarVisible(false);
    const timer = setTimeout(() => {
      setIsNavbarVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full py-5 transition-all duration-1000 ease-in-out ${
        isNavbarVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10"
      }`}
    >
      <div className="flex w-full justify-between mx-auto max-w-4xl bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl">
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <img
            src="/dsasnippets.svg"
            className="h-18 w-18 bg-primary/20 text-primary border-none px-2 py-2 rounded-full"
          />
        </Link>

        <div className="flex items-center gap-8">
          {authUser ? (
            // User Profile and Dropdown
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg ring ring-primary ring-offset-base-100 ring-offset-2">
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

// Make a new navbar that is permenent and expended to full width

// Playlist Access after Buying and solving
