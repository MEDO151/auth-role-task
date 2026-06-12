"use client";

import { useTranslations, useLocale } from "next-intl";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import AdminGuard from "@/components/guards/admin-guard";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetCurrentUserQuery } from "@/features/auth/authApi";
import { logout } from "@/features/auth/authSlice";

import { clearTokens } from "@/lib/cookies";

export default function AdminPage() {
  const t = useTranslations("Admin");
  const locale = useLocale();

  const router = useRouter();

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetCurrentUserQuery();

  const handleLogout = () => {
    clearTokens();

    dispatch(logout());

    router.replace(`/${locale}/login`);
  };

  return (
    <AdminGuard>
      {isLoading ? (
        <main className="min-h-screen bg-background p-6">
          <div className="mx-auto max-w-3xl rounded-[32px] bg-card p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <Skeleton className="mb-8 h-10 w-64" />

            <div className="space-y-5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-2xl bg-slate-50 p-5">
                  <Skeleton className="mb-2 h-4 w-24" />
                  <Skeleton className="h-7 w-48" />
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : isError || !data?.data ? (
        <div className="flex min-h-screen items-center justify-center">
          {t("failedToLoadUser")}
        </div>
      ) : (
        <main className="min-h-screen bg-background p-6">
          <div className="mx-auto max-w-3xl rounded-[32px] bg-card p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-4xl font-bold text-text-primary">
                {t("dashboardTitle")}
              </h1>

              <button
                onClick={handleLogout}
                className="cursor-pointer rounded-full bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
              >
                {t("logout")}
              </button>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-gray-500">{t("fullName")}</p>
                <h2 className="text-xl font-semibold">{data.data.fullName}</h2>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-gray-500">{t("email")}</p>
                <h2 className="text-xl font-semibold">{data.data.email}</h2>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-gray-500">{t("phoneNumber")}</p>
                <h2 className="text-xl font-semibold">
                  {data.data.phoneNumber ?? t("noPhone")}
                </h2>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-gray-500">{t("userType")}</p>
                <h2 className="text-xl font-semibold">{data.data.userType}</h2>
              </div>
            </div>
          </div>
        </main>
      )}
    </AdminGuard>
  );
}
