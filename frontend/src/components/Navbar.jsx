import React, { useState, useEffect } from "react";
import { User, Code, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import MyImage from "../assets/dsasnippets.svg";

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
    <div>
      <nav className="sticky top-0 w-full z-50 h-20 mt-5 py-3.5 bg-black/30 backdrop-blur-md shadow-lg border border-gray-200/10 rounded-2xl min-w-[800px]">
        <div>
          <div className="flex w-full h-full justify-between items-center mx-auto px-6  ">
            <Link to="/" className="flex items-center gap-3 cursor-pointer">
              <img
                src={MyImage}
                className="h-12 w-20 text-primary rounded-2xl border-none px-2 "
              />
            </Link>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-6">
                <Link
                  to="/home"
                  className="relative inline-block w-40 text-center rounded-full p-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105"
                >
                  <span className="block px-3 py-2 text-white font-medium text-base rounded-full bg-gray-900">
                    See All Problems
                  </span>
                </Link>

                <Link
                  to="/pricing"
                  className="relative inline-block w-30 text-center rounded-full p-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105"
                >
                  <span className="block px-3 py-2 text-white font-medium text-base rounded-full bg-gray-900">
                    Pricing
                  </span>
                </Link>

                <Link
                  to="/playlist/all-playsist"
                  className="relative inline-block w-40 text-center rounded-full p-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105"
                >
                  <span className="block px-3 py-2 text-white font-medium text-base rounded-full bg-gray-900">
                    See All Playlists
                  </span>
                </Link>
              </div>
            </div>

            {/* User Actions */}
            <div>
              <div className="flex items-center gap-6">
                {authUser ? (
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className=" btn-circle">
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
                      <li>
                        <p className="text-base font-semibold">
                          {authUser.name}
                        </p>
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
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
