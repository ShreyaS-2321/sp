"use client";

import { useState } from "react";
import { Mail, Lock, Chrome } from "lucide-react";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex items-center justify-center">
          <img
            src="../public/signuplogin.svg"
            alt="Students"
            className="w-full max-w-sm rounded-2xl"
          />
        </div>

        {/* Right Side - Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-400 mb-8">
              {isSignup
                ? "Join thousands of students finding their perfect stay"
                : "Login to find your perfect PG"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between">
                {/* Remember Me */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-700"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-400">
                    Remember Me
                  </label>
                </div>
                {!isSignup && (
                  <p className="text-center">
                    <a
                      href="#"
                      className="text-sm text-gray-400"
                    >
                      Forgot Password?
                    </a>
                  </p>
                )}
              </div>
              {/* Login Button */}
              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#87E64B] text-black rounded-lg font-semibold"
              >
                {isSignup ? "Sign Up" : "Login"}
              </button>

              {/* Google Login */}
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-700 rounded-lg text-black hover:cursor-pointer transition font-semibold"
              >
                <Chrome size={18} />
                Google
              </button>
            </form>

            {/* Toggle Signup/Login */}
            <p className="text-center text-gray-400 mt-6">
              {isSignup
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-black font-semibold"
              >
                {isSignup ? "Login" : "Sign up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
