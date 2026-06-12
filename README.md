# Cleaning Services Platform

A modern multilingual cleaning services platform built with **Next.js**, **TypeScript**, **Redux Toolkit**, **RTK Query**, and **Tailwind CSS**.

The project includes:

* Authentication & Authorization
* Protected Routes
* Role-Based Access Control
* Refresh Token Mechanism
* Global API Error Handling
* Toast Notification System
* Multilingual Support (`next-intl`)
* Responsive Landing Page
* Admin Dashboard

---

## Tech Stack

### Frontend

* Next.js 15 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* Shadcn UI

### State Management

* Redux Toolkit
* RTK Query

### Forms & Validation

* React Hook Form
* Zod

### Internationalization

* next-intl

### Notifications

* Sonner

---

## Features

### Authentication System

* Login functionality
* Access Token & Refresh Token support
* Automatic token refresh
* Persistent authentication using cookies
* Role-based redirects

### Route Protection

Protected pages cannot be accessed without authentication.

#### Protected Routes

* Home Page (`/`)
* Admin Dashboard (`/admin`)

#### Public Routes

* Login Page (`/login`)

Authenticated users are automatically redirected away from the login page.

---

## Internationalization (i18n)

The project supports multiple languages using **next-intl**.

Supported locales:

```txt
en
ar
```

Locale-aware routing example:

```txt
/en/login
/ar/login
/en/admin
```

---

## Folder Structure

```txt
src
├── app
│   ├── [locale]
│   │   ├── admin
│   │   ├── login
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   └── icon.png
│
├── components
│   ├── guards
│   ├── sections
│   ├── shared
│   └── ui
│
├── features
│   └── auth
│       ├── authApi.ts
│       ├── authSlice.ts
│       └── schema.ts
│
├── i18n
│   ├── request.ts
│   └── routing.ts
│
├── lib
│   ├── baseQuery.ts
│   ├── cookies.ts
│   ├── handle-api-error.ts
│   ├── toast.ts
│   └── utils.ts
│
├── messages
│   ├── ar.json
│   └── en.json
│
├── store
│   ├── provider.tsx
│   └── store.ts
│
├── types
└── middleware.ts
```

---

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd your-project-name
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

---

## Running the Project

Start the development server:

```bash
npm run dev
```

The app will be available at:

```txt
http://localhost:3000
```

---

## Authentication Flow

1. User logs in
2. API returns:

   * Access Token
   * Refresh Token
   * User Data
3. Tokens are stored in cookies
4. Redux stores authentication state
5. Protected routes become accessible
6. Expired tokens are refreshed automatically

---

## API Error Handling

The project includes centralized API error handling.

Handled status codes:

```txt
400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
500 → Server Error
```

Errors are automatically displayed using toast notifications.

---

## Scripts

Run development server:

```bash
npm run dev
```

Build production app:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

Run linting:

```bash
npm run lint
```

---

## Future Improvements

* Registration System
* Forgot Password Flow
* Dark Mode
* Testing (Jest / Cypress)
* Dashboard Analytics
* Better Role Permissions

---

## Author

Built with ❤️ using Next.js & TypeScript.
