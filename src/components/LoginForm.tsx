"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // Add your login logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }));
  };

  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Welcome Back</h2>
        <p className="mt-2 text-gray-400">
          Log in to continue your learning journey.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleInputChange}
            className="h-12 bg-gray-800 border-gray-700 rounded-md text-gray-200 placeholder-gray-400 focus:ring-indigo-500"
          />
        </div>

        <div>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className="h-12 bg-gray-800 border-gray-700 rounded-md text-gray-200 placeholder-gray-400 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember-me"
              checked={formData.rememberMe}
              onCheckedChange={handleCheckboxChange}
            />
            <Label
              htmlFor="remember-me"
              className="text-sm text-gray-400 cursor-pointer"
            >
              Remember me
            </Label>
          </div>
          <div className="text-sm">
            <Link
              href="/forgot-password"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-500 rounded-md"
            size="lg"
          >
            Log In
          </Button>
        </div>
      </form>

      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-gray-900 px-2 text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button variant="outline" type="button" className="h-11 gap-3 bg-gray-800 border-gray-700 hover:bg-gray-700">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          <span className="text-white">Google</span>
        </Button>

        <Button variant="outline" type="button" className="h-11 gap-3 bg-gray-800 border-gray-700 hover:bg-gray-700">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
              fillRule="evenodd"
            />
          </svg>
          <span className="text-white">GitHub</span>
        </Button>
      </div>

      <p className="text-center text-sm text-gray-400">
        New to DHKE?{" "}
        <Link
          href="/signup"
          className="font-medium text-indigo-400 hover:text-indigo-300"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
