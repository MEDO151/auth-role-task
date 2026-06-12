"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import {
  loginSchema,
  LoginFormData,
} from "@/features/auth/schema";

import {
  useLoginMutation,
} from "@/features/auth/authApi";

import {
  setCredentials,
} from "@/features/auth/authSlice";

import {
  setTokens,
} from "@/lib/cookies";

export default function LoginPage() {
  const router =
    useRouter();

  const dispatch =
    useDispatch();

  const [
    login,
    { isLoading },
  ] =
    useLoginMutation();

  const [
    loginError,
    setLoginError,
  ] = useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } =
    useForm<LoginFormData>({
      resolver:
        zodResolver(
          loginSchema
        ),
    });

  const onSubmit =
    async (
      data:
        LoginFormData
    ) => {
      try {
        setLoginError(
          ""
        );

        const response =
          await login(
            data
          ).unwrap();

        setTokens(
          response.data
            .accessToken,
          response.data
            .refreshToken
        );

        dispatch(
          setCredentials(
            response.data
          )
        );

        if (
          response.data
            .user
            .userType ===
          "SUPER_ADMIN"
        ) {
          router.push(
            "/en/admin"
          );
        } else {
          router.push(
            "/en"
          );
        }
      } catch (
        error: any
      ) {
        console.error(
          "Login Error:",
          error
        );

        if (
          error?.status ===
          401
        ) {
          setLoginError(
            "Incorrect email or password"
          );
        } else {
          setLoginError(
            "Something went wrong. Please try again."
          );
        }
      }
    };

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-bg p-4">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[40px] bg-card shadow-[0_10px_50px_rgba(0,0,0,0.08)] lg:grid-cols-2">

        <section className="relative hidden overflow-hidden bg-brand-dark p-10 lg:flex lg:items-center lg:justify-center">
          <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />

          <div className="absolute bottom-10 left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 max-w-md">
            <span className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700">
              Welcome Back
            </span>

            <h1 className="mb-4 text-5xl font-bold leading-tight text-slate-800">
              Login to your account
            </h1>

            <p className="text-lg text-slate-700">
              Access your dashboard
              and continue
              managing your
              cleaning services
              easily.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">

            <div className="mb-8">
              <div className="mb-5 flex items-center justify-center rounded-2xl">
                <img
                  src="/main_icon.png"
                  alt="zoom icon"
                />
              </div>

              <h2 className="text-4xl font-bold text-foreground">
                Sign In
              </h2>

              <p className="mt-2 text-text-secondary">
                Enter your
                credentials to
                continue
              </p>
            </div>

            <form
              onSubmit={handleSubmit(
                onSubmit
              )}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register(
                    "email"
                  )}
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-border
                    bg-white
                    px-5
                    outline-none
                    transition-all
                    duration-200
                    focus:border-brand
                    focus:ring-4
                    focus:ring-brand/30
                  "
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {
                      errors
                        .email
                        .message
                    }
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register(
                    "password"
                  )}
                  className="
                    h-14
                    w-full
                    rounded-2xl
                    border
                    border-border
                    bg-white
                    px-5
                    outline-none
                    transition-all
                    duration-200
                    focus:border-brand
                    focus:ring-4
                    focus:ring-brand/30
                  "
                />

                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {
                      errors
                        .password
                        .message
                    }
                  </p>
                )}
              </div>

              {loginError && (
                <div
                  className="
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    font-medium
                    text-red-600
                  "
                >
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={
                  isLoading
                }
                className="
                  h-14
                  w-full
                  rounded-2xl
                  bg-slate-900
                  text-lg
                  font-medium
                  text-white
                  transition
                  hover:opacity-90
                  disabled:opacity-50
                "
              >
                {isLoading
                  ? "Loading..."
                  : "Login"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}