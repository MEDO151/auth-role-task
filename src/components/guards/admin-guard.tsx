"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useLocale } from "next-intl";

import { useGetCurrentUserQuery } from "@/features/auth/authApi";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const locale = useLocale();

  const { data, isLoading } = useGetCurrentUserQuery();

  const user = data?.data;

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace(`/${locale}/login`);

      return;
    }

    if (user.userType !== "SUPER_ADMIN") {
      router.replace(`/${locale}`);
    }
  }, [user, isLoading, router, locale]);

  if (isLoading) {
    return null;
  }

  if (!user || user.userType !== "SUPER_ADMIN") {
    return null;
  }

  return children;
}
