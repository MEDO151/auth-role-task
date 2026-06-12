"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useLocale } from "next-intl";

import { RootState } from "@/store/store";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const locale = useLocale();

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) return;

    if (user.userType !== "SUPER_ADMIN") {
      router.replace(`/${locale}`);
    }
  }, [user, router, locale]);

  if (user?.userType !== "SUPER_ADMIN") {
    return null;
  }

  return children;
}