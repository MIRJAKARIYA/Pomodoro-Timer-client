"use client";
import { useState } from "react";
import Head from "next/head";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useDispatch } from "react-redux";
import { addUser } from "@/app/redux-toolkit/Slices/UserSlice";
import { useRouter } from "next/navigation";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Link from "next/link";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    const errors = {};
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required.";
    if (!formData.password || formData.password.length < 6)
      errors.password = "Password must be at least 6 characters long.";
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
    } else {
      setErrors({});
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((currentUser) => {
          axiosPublic
            .get(`/api/users/${currentUser?.user?.email}`)
            .then((res) => {
              dispatch(addUser(res?.data?.data));
              localStorage.setItem(
                "loggedInUser",
                JSON.stringify(res?.data?.data)
              );
              router.push("/");
            });
        })
        .catch((error) => {
          setErrors({ email: "Invalid login credentials." });
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
      <Head>
        <title>Login</title>
      </Head>
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/10">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-200 mb-4">
          Log in to your account to continue.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-white/30 border border-white/20 rounded-lg shadow-sm text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-white/30 border border-white/20 rounded-lg shadow-sm text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Login
          </button>
        </form>

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-300 text-center mt-4">{successMessage}</p>
        )}

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-200 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-purple-300 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
