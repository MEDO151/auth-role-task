"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";

import { useTranslations, useLocale } from "next-intl";

import { loginSchema, LoginFormData } from "@/features/auth/schema";

import { useLoginMutation } from "@/features/auth/authApi";

import { setCredentials } from "@/features/auth/authSlice";

import { setTokens } from "@/lib/cookies";

import { showSuccessToast } from "@/lib/toast";

export default function LoginPage() {
  const t = useTranslations("Login");
  const locale = useLocale();

  const router = useRouter();

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();

      setTokens({
        accessToken: response.data.accessToken,

        refreshToken: response.data.refreshToken,
      });

      dispatch(setCredentials(response.data));

      showSuccessToast(t("welcomeUser", { name: response.data.user.fullName }));

      if (response.data.user.userType === "SUPER_ADMIN") {
        router.push(`/${locale}/admin`);
      } else {
        router.push(`/${locale}`);
      }
    } catch (error) {
      console.error("Login Error:", error);
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
              {t("welcomeBack")}
            </span>

            <h1 className="mb-4 text-5xl font-bold leading-tight text-slate-800">
              {t("pageTitle")}
            </h1>

            <p className="text-lg text-slate-700">{t("pageDescription")}</p>
          </div>
        </section>

        <section className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="mb-5 flex items-center justify-center rounded-2xl">
                <img src="/nav/main_icon.png" alt="logo" />
              </div>

              <h2 className="text-4xl font-bold text-foreground">
                {t("signIn")}
              </h2>

              <p className="mt-2 text-text-secondary">
                {t("enterCredentials")}
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)(e);
              }}
              className="space-y-5"
            >
              
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {t("email")}
                </label>

                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  {...register("email")}
                  className="w-full rounded-2xl border border-border bg-white px-5 py-3 outline-none transition-all duration-200 focus:border-brand focus:ring-4 focus:ring-brand/30"
                />

                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.email.message === "Invalid email" ? t("errorInvalidEmail") : errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {t("password")}
                </label>

                <input
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  {...register("password")}
                  className="w-full rounded-2xl border border-border bg-white px-5 py-3 outline-none transition-all duration-200 focus:border-brand focus:ring-4 focus:ring-brand/30"
                />

                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.password.message === "Password must be at least 6 characters" ? t("errorPasswordLength") : errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer rounded-2xl bg-slate-900 py-3 text-lg font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? t("loading") : t("loginButton")}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
