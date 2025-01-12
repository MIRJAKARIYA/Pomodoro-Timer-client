"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword,updateProfile,signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { useRouter } from 'next/navigation';
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignUpPage = () => {
  const router = useRouter();
  const axiosPublic = useAxiosPublic()
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
      errors.avatar =
        "Avatar URL must be a valid image URL (jpg, jpeg, png, gif).";
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

          console.log(formData.name,formData.avatar)
          updateProfile(user, {
            displayName: formData.name, photoURL: formData.avatar
          }).then(async() => {
            //call api from here to store user data
            axiosPublic.post("/api/users",{
              name:formData.name,
              email:formData.email,
              avatar_url:formData.avatar
            })
            signOut(auth).then(()=>{
              router.push("/sign-in")
            })
            
          })
      
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          // ..
        });
      
      setSuccessMessage("Signup successful!");
      setFormData({ name: "", email: "", avatar: "", password: "" });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-500 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar URL
            </label>
            <input
              type="url"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your avatar URL"
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>


          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>

        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
