"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { SocialLoginButton } from "./auth/SocialLoginButton";
import { Chrome, Github } from "lucide-react";

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
        <p className="mt-2 text-gray-400">Log in to continue your learning journey.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <Input id="email" name="email" type="email" autoComplete="email" required placeholder="your@email.com" value={formData.email} onChange={handleInputChange} className="h-12 bg-gray-800 border-gray-700 rounded-md text-gray-200 placeholder-gray-400 focus:ring-indigo-500" />
        </div>

        <div>
          <Label htmlFor="password" className="sr-only">
            Password
          </Label>
          <Input id="password" name="password" type="password" autoComplete="current-password" required placeholder="Enter your password" value={formData.password} onChange={handleInputChange} className="h-12 bg-gray-800 border-gray-700 rounded-md text-gray-200 placeholder-gray-400 focus:ring-indigo-500" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember-me" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="remember-me" className="text-sm text-gray-400 cursor-pointer">
              Remember me
            </Label>
          </div>
          <div className="text-sm">
            <Link href="/forgot-password" className="font-medium text-indigo-400 hover:text-indigo-300">
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <Button type="submit" className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-500 rounded-md" size="lg">
            Log In
          </Button>
        </div>
      </form>

      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <SocialLoginButton provider="google" icon={Chrome} label="Login with Google" />
        <SocialLoginButton provider="github" icon={Github} label="Login with GitHub" />
      </div>
    </div>
  );
}
