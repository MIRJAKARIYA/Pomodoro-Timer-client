"use client";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebase.config";
import { removeUser } from "../redux-toolkit/Slices/UserSlice";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user} = useSelector((state)=> state?.userData)
  const router = useRouter()
  const dispatch = useDispatch()
  
 const handleSignOut = () =>{
  signOut(auth)
  .then(()=>{
    dispatch(removeUser({}))

  })
 }
  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-bold">
            <span className="cursor-pointer hover:text-gray-300 transition duration-300">
              PROMODORO
            </span>
        </div>

        {/* Hamburger Menu for Small Screens */}
        <button
          className="md:hidden block text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Links for Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {!user?.email ? (
            <Link
              href="/sign-in"
              className="hover:text-gray-200 transition duration-300 font-medium"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                href="/"
                className="hover:text-gray-200 transition duration-300 font-medium"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="hover:text-gray-200 transition duration-300 font-medium"
              >
                Dashboard
              </Link>
              <div className="flex justify-center items-center">
                <img className="w-10 h-10 rounded-[50%]" src={user?.avatar_url} alt="" />
              <button
                onClick={handleSignOut} // Replace with actual logout logic
                className="bg-white text-purple-600 hover:bg-gray-200 font-medium px-4 py-2 rounded-lg shadow-md transition duration-300"
              >
                Logout
              </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Dropdown for Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-600 text-white space-y-4 py-4 px-6">
          {!user?.email ? (
            <Link
              href="/sign-in"
              className="block hover:text-gray-300 transition duration-300"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                href="/"
                className="block hover:text-gray-300 transition duration-300"
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                className="block hover:text-gray-300 transition duration-300"
              >
                Dashboard
              </Link>
              <div className="flex justify-center items-center ">
                <img className="h-10 w-10 rounded-[50%]" src={user?.avatar_url} alt="" />
              <button
                onClick={handleSignOut} // Replace with actual logout logic
                className="bg-white text-purple-600 hover:bg-gray-200 font-medium px-4 py-2 rounded-lg shadow-md transition duration-300"
              >
                Logout
              </button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
