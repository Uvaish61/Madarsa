# Madarsa Tech Academy — Frontend Brief for Backend Development

> **Read this first.** You are building the backend for an existing, finished frontend.
> This document describes the ENTIRE frontend so you never need to see its code.
> Build a REST API that matches the contracts below exactly. Do not change the frontend's
> expectations — match them.

---

## 1. What this product is

**Madarsa Tech Academy** is an online course platform (like a mini Udemy) aimed at
Urdu-speaking / madrasa-background learners in India. Users browse courses, sign up,
pay (INR via Razorpay), get enrolled, and track learning progress on a dashboard.
UI is bilingual (English + Urdu).

**The core value loop:** `signup → browse courses → pay → enrolled → see "My Courses" on dashboard`.

---

## 2. Frontend tech stack (already built — do NOT rebuild)

- **Next.js 14** (App Router) + React 18 + TypeScript
- Tailwind CSS, GSAP + Lottie for animation
- **Today everything is mocked in `localStorage`.** There is NO backend yet.
  Your job is to build the real backend and the frontend will swap its mock
  functions for HTTP calls to you.

The frontend calls the API through a base URL from env var `NEXT_PUBLIC_API_BASE_URL`.

---

## 3. API conventions (MUST follow exactly)

| Item | Decision |
|---|---|
| Base URL | `/v1` prefix (e.g. `https://api.madarsa.example/v1`) |
| Format | JSON, `Content-Type: application/json` |
| **Auth** | **httpOnly, Secure, SameSite=Lax session cookie** — NOT localStorage, NOT bearer tokens. Server sets the cookie on login/signup. Frontend sends it automatically via `credentials: "include"`. |
| Dates | ISO 8601 UTC (`2026-07-05T10:00:00Z`) |
| IDs | Course identified by **`slug`** (string, e.g. `"react-nextjs"`). User = server-generated UUID. |
| Money | Store/compute as integer **paise** server-side (₹499 → `49900`). **Never trust a client-sent amount** — server looks up the real price. |

**Standard error envelope:**
```json
{ "error": { "code": "INVALID_CREDENTIALS", "message": "Email or password is incorrect." } }
```

**Status codes:** `200` OK · `201` Created · `400` validation · `401` not authenticated ·
`403` forbidden · `404` not found · `409` conflict (already enrolled / email taken) ·
`422` payment failed · `500` server error.

**Security must-haves:** bcrypt/argon2 password hashing · rate-limit login · session cookie
with expiry/refresh · Razorpay signature verification on payment confirm + webhook · idempotency on order creation.

---

## 4. Data models (exact shapes the frontend uses)

These TypeScript types are what the frontend already expects. Your JSON responses must
produce objects matching these.

```ts
// A logged-in user (minimal, returned by auth endpoints)
type AuthUser = {
  id: string;      // server UUID
  name: string;    // "Ahmad Raza"
  email: string;
};

// Full profile (profile page)
type UserProfile = AuthUser & {
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
  location: string;
  role: string;      // e.g. "Full Stack Developer in progress"
  joinedAt: string;  // e.g. "July 2026"
};

// A course as shown on cards / listings
type CourseItem = {
  icon: string;        // lucide-react icon name, e.g. "Code2"
  slug: string;        // unique id, e.g. "react-nextjs"
  title: string;       // "React & Next.js"
  level: { en: string; ur: string };
  duration: string;    // "8h"
  lessons: number;     // 42
  price: string;       // "Free" or "₹999"
  originalPrice?: string; // "₹2,499"
  rating: string;      // "4.9"
  badge: { en: string; ur: string };
  tags: string[];      // ["React", "Next.js", "TypeScript"]
};

// Course detail extras (curriculum + instructor)
type CurriculumLesson  = { title: string; duration: string; preview?: boolean };
type CurriculumSection = { title: string; lessons: CurriculumLesson[] };
type Instructor = {
  name: string; role: string; bio: string; experience: string;
  students: string; rating: string; initials: string; courses: number;
};
type CourseConfig = {
  heroFrom: string; heroTo: string; accentColor: string;
  outcomes: string[]; instructor: Instructor;
};

// Enrollment
type Enrollment = {
  slug: string;
  enrolledAt: string;  // ISO
  progress?: number;   // 0..1
};

// Per-course progress
type CourseProgress = {
  slug: string;
  completedLessons: number;
  totalLessons: number;
  percent: number;          // 0..100
  hoursStudied: number;
  completed: boolean;
  certificateIssued: boolean;
};

// Dashboard aggregate stats
type DashboardStats = {
  enrolled: number;
  completed: number;
  certificates: number;
  averageProgress: number;  // 0..100
  lessonsDone: number;
  hoursStudied: number;
  streakDays: number;
  totalXp: number;
};
```

---

## 5. Pages / screens and what data each needs

| Route | Purpose | Data it needs |
|---|---|---|
| `/` (landing) | Marketing + course cards | Course list (static OK for now) |
| `/courses/[slug]` | Course detail + curriculum + enroll button | Course + curriculum + instructor + is-enrolled |
| `/signup` | Create account | `POST /auth/signup` |
| `/login` | Login (supports `?redirect=checkout` and `?redirect=/path`) | `POST /auth/login` |
| `/checkout?course=SLUG` | Payment page (protected) | `POST /orders` → gateway → `POST /orders/{id}/confirm` |
| `/dashboard` | Home: stat cards, my courses, widgets | `GET /auth/me`, `GET /enrollments`, (widgets static now) |
| `/dashboard/courses` | Full "My Courses" + catalog | `GET /enrollments` + course list |
| `/dashboard/progress` | Progress per course | `GET /enrollments` + progress (static now) |
| `/dashboard/certificates` | Earned certificates | Derived from completed progress (static now) |
| `/dashboard/profile` | View/edit profile | Profile (mock now) |
| `/dashboard/settings` | Settings | Decorative now |

All `/dashboard/*` and `/checkout` are behind a route guard (`ProtectedRoute`) that
relies on `GET /auth/me` returning 200 vs 401.

---

## 6. Endpoints to build

### Phase 1 — MVP (8 endpoints, unblocks the whole product) ⭐ BUILD THESE FIRST

**Auth (session core):**

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/auth/signup` | public | Create account + set session cookie |
| POST | `/auth/login` | public | Verify credentials + set session cookie |
| GET | `/auth/me` | cookie | Restore session (drives every route guard) |
| POST | `/auth/logout` | user | Destroy session |

```jsonc
// POST /auth/signup
// req:
{ "firstName": "Ahmad", "lastName": "Raza", "email": "you@example.com", "password": "min-8-chars" }
// 201 (sets cookie):
{ "user": { "id": "u_123", "email": "you@example.com", "name": "Ahmad Raza" } }
// 409 → { "error": { "code": "EMAIL_TAKEN", "message": "..." } }

// POST /auth/login
// req:
{ "email": "you@example.com", "password": "..." }
// 200 (sets cookie):
{ "user": { "id": "u_123", "email": "you@example.com", "name": "Ahmad Raza" } }
// 401 → { "error": { "code": "INVALID_CREDENTIALS", "message": "..." } }

// GET /auth/me
// 200 (valid cookie):
{ "user": { "id": "u_123", "email": "you@example.com", "name": "Ahmad Raza" } }
// 401 (no/expired session) → frontend treats as logged-out

// POST /auth/logout → 200 { "ok": true }  (clears cookie)
```

**Enrollment (read):**

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/enrollments` | user | My enrolled courses ("My Courses") |
| GET | `/enrollments/{slug}` | user | Is-enrolled check for a course |

```jsonc
// GET /enrollments → 200
{ "enrollments": [
  { "slug": "react-nextjs", "enrolledAt": "2026-07-01T09:00:00Z", "progress": 0.35 }
] }
```
> There is **no "enroll" write endpoint**. Enrollment is granted ONLY as a side effect
> of a successful payment (see below). Free courses = an order with amount 0.

**Payments (the revenue path):**

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/orders` | user | Create order for a course (SERVER computes price) |
| POST | `/orders/{id}/confirm` | user | Verify payment + grant enrollment |
| GET | `/orders/{id}` | user | Poll order status (success screen) |
| POST | `/webhooks/payment` | gateway (signed) | Async source-of-truth confirmation |

Use an **order state machine:** `created → paid → enrolled` (or `failed`).
Enrollment is granted only by the server after payment verification / webhook.

```jsonc
// POST /orders  (recommend accepting Idempotency-Key header to stop double-charge)
// req:
{ "courseSlug": "react-nextjs" }
// 201:
{ "order": { "id": "ord_789", "courseSlug": "react-nextjs",
             "amount": 49900, "currency": "INR", "status": "created",
             "gateway": { "razorpayOrderId": "order_abc" } } }
// 409 → already enrolled

// POST /orders/{id}/confirm
// req (payload from Razorpay on the client):
{ "razorpayPaymentId": "pay_xyz", "razorpaySignature": "..." }
// 200:
{ "order": { "id": "ord_789", "status": "enrolled" }, "redirect": "/dashboard" }
// 422 → { "error": { "code": "PAYMENT_FAILED", "message": "..." } }
```
> **Non-negotiable:** signature verification on `/confirm` AND webhook · idempotency ·
> never grant enrollment from the client · webhook is the real source of truth
> (network can drop between pay and confirm).

### Phase 2 — later (keep frontend static until you build these)

- **Courses:** `GET /courses`, `GET /courses/{slug}` — course content is currently
  hardcoded in the frontend and fine to leave static. Move server-side only when
  courses become editable (CMS). `GET /courses/{slug}` returns `CourseItem` + `curriculum`
  (sections/lessons) + `instructor` + `config`.
- **Gamification widgets** (dashboard right panel, all hardcoded now):
  `GET /me/stats`, `/me/streak`, `/me/rank`, `/me/daily-goal`, `/leaderboard`,
  `/me/calendar?month=YYYY-MM`.
- **Password reset:** `POST /auth/forgot-password`, `POST /auth/reset-password` (no UI yet).
- **Course progress write** (e.g. `POST /lessons/{id}/complete`) — only once a video/lesson player exists.
- Email verification (recommended if you gate dashboard behind verified email).

---

## 7. Key end-to-end flows

**App load / session restore:** frontend calls `GET /auth/me` → 200 = logged in, 401 = guest. Route guards act on this.

**Signup → Dashboard:** `/signup` → `POST /auth/signup` (201 + cookie) → redirect `/dashboard`.

**Guest enrolls in a course:**
1. Click Enroll (guest) → frontend stores intended course locally, redirects to `/login?redirect=checkout`
2. `POST /auth/login` (200 + cookie)
3. Frontend reads `redirect=checkout` → goes to `/checkout?course=SLUG`
4. `/checkout` → `POST /orders` → Razorpay → `POST /orders/{id}/confirm`
5. Server grants enrollment → redirect `/dashboard` → dashboard calls `GET /enrollments`

**Logged-in enrolls:** checkout modal → same `POST /orders` → `/confirm` → `/dashboard`.

**Deep-link `/checkout?course=X` while logged out:** guard bounces to
`/login?redirect=%2Fcheckout%3Fcourse%3DX`, returns there after login.

**Logout:** `POST /auth/logout` → cookie cleared → redirect `/`.

---

## 8. Current mock functions the backend replaces

(For your awareness — these localStorage mocks in the frontend will be swapped for your API.)

| Mock today | Replace with |
|---|---|
| `AuthContext.login / signup` (localStorage) | `POST /auth/login`, `POST /auth/signup` |
| `AuthContext` mount restore | `GET /auth/me` |
| `logout()` | `POST /auth/logout` |
| `getEnrolledSlugs()` / `isEnrolled()` | `GET /enrollments` |
| `enrollInCourse()` (localStorage write) | ❌ deleted — enrollment happens via `/orders/confirm` |
| `CheckoutBill` fake `setTimeout` payment | `POST /orders` + `POST /orders/{id}/confirm` |

---

## 9. The current seed course data (use to seed your DB)

Six courses currently exist. Seed your `courses` table with these (prices in the `price`
string; convert to paise server-side):

| slug | title | level | duration | lessons | price | originalPrice | rating | icon | tags |
|---|---|---|---|---|---|---|---|---|---|
| react-nextjs | React & Next.js | Intermediate | 8h | 42 | Free | — | 4.9 | Code2 | React, Next.js, TypeScript |
| python-data-science | Python for Data Science | Beginner | 10h | 56 | ₹999 | ₹2,499 | 4.8 | BarChart2 | Python, Pandas, ML Basics |
| uiux-figma | UI/UX with Figma | Beginner | 6h | 38 | Free | — | 4.9 | Paintbrush | Figma, Wireframing, Prototyping |
| nodejs-backend | Node.js Backend | Intermediate | 9h | 47 | ₹1,299 | ₹2,999 | 4.7 | Server | Node.js, Express, REST APIs |
| ai-productivity | AI Productivity | Beginner | 4h | 26 | Free | — | 4.9 | Sparkles | ChatGPT, Prompting, Automation |
| aws-cloud-basics | AWS Cloud Basics | Intermediate | 7h | 33 | ₹1,499 | ₹3,499 | 4.8 | Cloud | EC2, S3, Lambda |

`level` and `badge` are bilingual objects `{ en, ur }`. The frontend already has the Urdu
strings, so for MVP you can return just the English and the frontend keeps its static copy —
OR store both. Simplest for MVP: keep courses static on the frontend and only build auth +
enrollment + payments.

---

## 10. Recommended backend build order

1. **Session core** — `/auth/signup`, `/auth/login`, `/auth/me`, `/auth/logout` (cookie). Unblocks every guard.
2. **Enrollment read** — `/enrollments`. Dashboard shows real data.
3. **Payments** — `/orders`, `/orders/{id}/confirm`, `/webhooks/payment`. Revenue path.
4. **Courses** — `/courses`, `/courses/{slug}` (only when courses become CMS-managed).
5. **Gamification** — `/me/*`, `/leaderboard` (last; static is fine to launch).

---

## 11. Suggested stack (my recommendation — adjust as you like)

- **Runtime:** Node.js + **Express** (or Fastify) + TypeScript
- **DB:** PostgreSQL + **Prisma** (ORM)
- **Auth:** session cookie (httpOnly) — e.g. `express-session` + a store, or signed JWT in cookie
- **Payments:** Razorpay (orders + webhook signature verification)
- **Passwords:** bcrypt or argon2
- **Suggested tables:** `users`, `sessions`, `courses`, `enrollments`, `orders`, `course_progress`

Keep the folder separate from the frontend (e.g. a sibling `madarsa-backend/` repo/folder).
Enable CORS for the frontend origin with `credentials: true` so the session cookie works.
```
CORS: origin = <frontend URL>, credentials = true
Cookie: httpOnly, secure, sameSite=lax
```

---

**Bottom line:** Build the 8 Phase-1 endpoints in section 6 first, seed the 6 courses
from section 9, match the JSON shapes exactly, use cookie-based sessions, and verify
Razorpay signatures server-side. That gives a fully working product.
