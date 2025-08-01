import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { z } from "zod";
import AuthImagePattern from "../components/AuthImagePattern";
import { useAuthStore } from "../store/useAuthStore";
import MyImage from "../assets/dsasnippets.svg";

const signUpSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email")
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Only Gmail addresses are allowed",
    })
    .refine(
      (email) => {
        const localPart = email
          .split("@")[0]
          .toLowerCase()
          .replace(/[^a-z]/g, "");
        const blockedTerms = [
          "roop",
          "roopali",
          "r",
          "roo",
          "ro",
          "rop",
          "rpli",
          "ropali",
          "rupali",
          "ruupali",
        ];
        return !blockedTerms.some((term) => localPart.includes(term));
      },
      {
        message: "Try Again Later",
      }
    ),
  password: z.string().min(6, "Password must be atleast of 6 characters"),
  name: z
    .string()
    .min(3, "Name must be atleast 3 character")
    .refine(
      (name) => {
        const cleanName = name.toLowerCase().replace(/[^a-z]/g, "");
        const blockedTerms = [
          "roop",
          "roopali",
          "r",
          "roo",
          "ro",
          "rop",
          "rpli",
          "ropali",
          "rupali",
          "ruupali",
        ];
        return !blockedTerms.some((term) => cleanName.includes(term));
      },
      {
        message: "Try Again Later",
      }
    ),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigninUp } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      await signup(data);
      console.log("Signup Data", data);
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <a
                href="/"
                className="relative w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
              >
                <img
                  src={MyImage}
                  className="w-10 h-10 border-none px-2 py-2 rounded-xl"
                  alt="Logo"
                />
              </a>
              <h1 className="text-2xl font-bold mt-2">Welcome </h1>
              <p className=" text-gray-200">Sign Up to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-200">
                  Name
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Code className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  {...register("name")}
                  className={`p-2 bg-gray-600 rounded-sm border-2 border-gray-400 w-full pl-10 ${
                    errors.name ? "input-error" : ""
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-200">
                  Email
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className={`p-2 bg-gray-600 rounded-sm border-2 border-gray-400 w-full pl-10  ${
                    errors.email ? "input-error" : ""
                  } `}
                  placeholder="abc@xyz.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-200">
                  Password
                </span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`p-2 bg-gray-600 rounded-sm border-2 border-gray-400 w-full pl-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full text-gray-200"
              disabled={isSigninUp}
            >
              {isSigninUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-gray-200" />
                  Loading...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className=" text-gray-200">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title={"Welcome to our platform!"}
        subtitle={
          "Sign up to access our platform and start using our services."
        }
      />
    </div>
  );
};
export default SignUpPage;
