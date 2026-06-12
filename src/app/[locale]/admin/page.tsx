'use client';

import {
  useGetCurrentUserQuery,
} from '@/features/auth/authApi';

export default function AdminPage() {
  const {
    data,
    isLoading,
    isError,
  } =
    useGetCurrentUserQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (
    isError ||
    !data?.data
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Failed to load user
      </div>
    );
  }

  const user =
    data.data;

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl rounded-[32px] bg-card p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

        <h1 className="mb-8 text-4xl font-bold text-text-primary">
          Admin Dashboard
        </h1>

        <div className="space-y-5">

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <h2 className="text-xl font-semibold">
              {user.fullName}
            </h2>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-gray-500">
              Email
            </p>

            <h2 className="text-xl font-semibold">
              {user.email}
            </h2>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-gray-500">
              Phone Number
            </p>

            <h2 className="text-xl font-semibold">
              {user.phoneNumber ??
                'No Phone'}
            </h2>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <p className="text-sm text-gray-500">
              User Type
            </p>

            <h2 className="text-xl font-semibold">
              {user.userType}
            </h2>
          </div>

        </div>
      </div>
    </main>
  );
}