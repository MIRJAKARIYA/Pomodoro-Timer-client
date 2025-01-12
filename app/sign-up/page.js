"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useRouter } from "next/navigation";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required.";
    if (!formData.password || formData.password.length < 6)
      errors.password = "Password must be at least 6 characters long.";
    if (
      formData.avatar &&
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(formData.avatar)
    )
      errors.avatar = "Avatar URL must be a valid image URL (jpg, jpeg, png, gif).";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
    } else {
      setErrors({});
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: formData.name,
            photoURL: formData.avatar,
          }).then(async () => {
            await axiosPublic.post("/api/users", {
              name: formData.name,
              email: formData.email,
              avatar_url: formData.avatar,
            });
            signOut(auth).then(() => {
              router.push("/sign-in");
            });
          });
        })
        .catch((error) => {
          console.error(error.message);
        });
      setSuccessMessage("Signup successful!");
      setFormData({ name: "", email: "", avatar: "", password: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md border border-white/10">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          Create Account
        </h2>
        <p className="text-center text-gray-200 mb-4">
          Fill out the form below to sign up for an account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-white/30 border border-white/20 rounded-lg shadow-sm text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
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
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Avatar URL Field */}
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-200">
              Avatar URL
            </label>
            <input
              type="url"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 bg-white/30 border border-white/20 rounded-lg shadow-sm text-gray-100 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              placeholder="Enter your avatar URL"
            />
            {errors.avatar && <p className="text-red-400 text-sm mt-1">{errors.avatar}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
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
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold shadow-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Sign Up
          </button>
        </form>

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-300 text-center mt-4">{successMessage}</p>
        )}

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-200 text-sm">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-purple-300 font-medium hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
