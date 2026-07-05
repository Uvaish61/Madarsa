# Madarsa Tech Academy — API Contract & Flow Sheet

> Handoff document for the backend developer.
> This maps every place the frontend currently uses a **localStorage mock** to the
> **real HTTP endpoint** that must replace it, plus the end-to-end user flow.
>
> Frontend stack: Next.js (App Router). Today auth/enrollment live in
> `localStorage`; this document is the plan to move them server-side.

---

## ⭐ Scope — what you actually need NOW (MVP) vs later

The frontend today renders **all dashboard data hardcoded**. So the *core value loop*
(signup → browse → pay → enrolled → see my courses) needs only **8 endpoints**.
Everything else can stay static and be added later without reworking the frontend.

**BUILD NOW (8) — unblocks the real product:**
- `POST /auth/signup`, `POST /auth/login`, `GET /auth/me`, `POST /auth/logout`  *(session core)*
- `GET /enrollments`  *(makes "My Courses" + stat cards real)*
- `POST /orders`, `POST /orders/{id}/confirm`, `POST /webhooks/payment`  *(the revenue path)*

**KEEP STATIC for launch — no endpoint needed yet:**
- Courses (`/courses`, `/courses/{slug}`) → stays in `lib/landing-data.ts` / `lib/course-data.ts`. Course content isn't changing yet.
- Dashboard widgets (`/me/stats`, `/me/streak`, `/me/rank`, `/me/daily-goal`, `/leaderboard`, `/me/calendar`) → currently hardcoded; wire when gamification is real.
- Password reset (`/auth/forgot-password`, `/auth/reset-password`) → no reset UI exists yet.

**NOT in this doc — because the feature doesn't exist yet (add when you build it):**
- **Course progress write** (e.g. `POST /lessons/{id}/complete`) — needed only once a lesson/video player exists. The "Continue Learning" button + progress bar are static for now.
- Search, notifications, profile/settings update — UI is decorative/absent today.

**Recommended small add (security):** email verification (`/auth/verify-email`, resend) if you gate the dashboard behind a verified email.

---

## 0. Conventions

| Item | Decision |
|---|---|
| Base URL | `https://api.madarsa.example/v1` (env: `NEXT_PUBLIC_API_BASE_URL`) |
| Format | JSON. `Content-Type: application/json` |
| **Auth mechanism** | **httpOnly, Secure, SameSite=Lax session cookie** (NOT localStorage — XSS-safe). Cookie set by server on login/signup. |
| Auth header | None on client — cookie sent automatically with `credentials: "include"` |
| Timezone/dates | ISO 8601 UTC (`2026-07-05T10:00:00Z`) |
| IDs | Course = `slug` (string, e.g. `"web-development"`). User = server UUID. |
| Money | Integer **paise** server-side (₹499 → `49900`); never trust client-sent amounts. |

### Standard error envelope
```json
{ "error": { "code": "INVALID_CREDENTIALS", "message": "Email or password is incorrect." } }
```

### Standard status codes
`200` OK · `201` Created · `400` validation · `401` not authenticated · `403` forbidden · `404` not found · `409` conflict (e.g. already enrolled / email taken) · `422` payment failed · `500` server.

---

## 1. Auth endpoints

Replaces the mock in `context/AuthContext.tsx` (`login`, `signup`, `logout`) and the session-restore `useEffect`.

| # | Method | Path | Auth | Purpose | Frontend touchpoint |
|---|---|---|---|---|---|
| 1 | `POST` | `/auth/signup` | public | Create account + start session | `SignUp.tsx` → `signup()` |
| 2 | `POST` | `/auth/login` | public | Verify credentials + start session | `Login.tsx` → `login()` |
| 3 | `POST` | `/auth/logout` | user | Destroy session | `DashboardTopbar.tsx` → `handleLogout()` |
| 4 | `GET` | `/auth/me` | cookie | Restore session on app load | `AuthProvider` mount effect |
| 5 | `POST` | `/auth/forgot-password` | public | Email a reset link | "Forgot password?" (currently dead link) |
| 6 | `POST` | `/auth/reset-password` | public | Set new password from token | reset page (to build) |

**`POST /auth/signup`**
```jsonc
// Request
{ "firstName": "Ahmad", "lastName": "Raza", "email": "you@example.com", "password": "min-8-chars" }
// 201 — sets session cookie
{ "user": { "id": "u_123", "email": "you@example.com", "name": "Ahmad Raza" } }
// 409 → { "error": { "code": "EMAIL_TAKEN", ... } }
```

**`POST /auth/login`**
```jsonc
// Request
{ "email": "you@example.com", "password": "…" }
// 200 — sets session cookie
{ "user": { "id": "u_123", "email": "you@example.com", "name": "Ahmad Raza" } }
// 401 → { "error": { "code": "INVALID_CREDENTIALS", ... } }
```

**`GET /auth/me`** — the single most important call; drives every route guard.
```jsonc
// 200 (valid cookie)
{ "user": { "id": "u_123", "email": "you@example.com", "name": "Ahmad Raza" } }
// 401 (no/expired session) → frontend treats as logged-out
```

> **Security must-haves:** bcrypt/argon2 password hashing · rate-limit login (brute-force) · email verification before dashboard access · refresh/expiry on the session cookie.

---

## 2. Course endpoints

Currently hardcoded in `lib/landing-data.ts` and `lib/course-data.ts`. Can stay static at launch; move server-side when courses become editable.

| # | Method | Path | Auth | Purpose | Frontend touchpoint |
|---|---|---|---|---|---|
| 7 | `GET` | `/courses` | public | List all courses (cards) | Landing `#courses`, dashboard catalog |
| 8 | `GET` | `/courses/{slug}` | public | Course detail + curriculum | `/courses/[slug]` page |

**`GET /courses/{slug}`** returns course + `curriculum` (sections/lessons) + `instructor` + `config`. Shape = merge of today's `CourseItem` + `curricula[slug]` + `courseConfigs[slug]`.

---

## 3. Enrollment endpoints

Replaces `lib/enrollment.ts` (`getEnrolledSlugs`, `isEnrolled`, `enrollInCourse`).
**Enrollment must be server-authoritative** — today anyone can fake it via console.

| # | Method | Path | Auth | Purpose | Frontend touchpoint |
|---|---|---|---|---|---|
| 9 | `GET` | `/enrollments` | user | My enrolled courses | Dashboard "My Courses" |
| 10 | `GET` | `/enrollments/{slug}` | user | Is-enrolled check | Course detail / enroll button state |

> There is **no** "enroll" write here — enrollment is a *side effect of a successful payment* (see §4). Free courses enroll via the order endpoint with amount 0.

```jsonc
// GET /enrollments → 200
{ "enrollments": [
  { "slug": "web-development", "enrolledAt": "2026-07-01T09:00:00Z", "progress": 0.35 }
] }
```

---

## 4. Checkout / Payment endpoints ⭐ (the critical path)

Replaces the `setTimeout` fake-payment in `components/checkout/CheckoutBill.tsx`.
Use an **order state machine**: `created → paid → enrolled` (or `failed`). Enrollment is granted **only** by the server after payment verification / webhook.

| # | Method | Path | Auth | Purpose | Frontend touchpoint |
|---|---|---|---|---|---|
| 11 | `POST` | `/orders` | user | Create an order for a course (server computes price) | `CheckoutBill` → "Complete Purchase" |
| 12 | `POST` | `/orders/{id}/confirm` | user | Verify payment + grant enrollment | after gateway callback |
| 13 | `GET` | `/orders/{id}` | user | Poll order status | success screen |
| 14 | `POST` | `/webhooks/payment` | gateway (signed) | Async source-of-truth confirmation | — (server↔gateway) |

**`POST /orders`** — send only the course; server looks up the real price.
```jsonc
// Request  (Idempotency-Key header recommended to prevent double-charge on double-click)
{ "courseSlug": "web-development" }
// 201
{ "order": { "id": "ord_789", "courseSlug": "web-development",
             "amount": 49900, "currency": "INR", "status": "created",
             "gateway": { "razorpayOrderId": "order_abc" } } }
// 409 → already enrolled
```

**`POST /orders/{id}/confirm`**
```jsonc
// Request (payload from the payment gateway on the client)
{ "razorpayPaymentId": "pay_xyz", "razorpaySignature": "…" }
// 200
{ "order": { "id": "ord_789", "status": "enrolled" }, "redirect": "/dashboard" }
// 422 → { "error": { "code": "PAYMENT_FAILED", ... } }
```

> **Non-negotiables:** signature verification on `/confirm` and on the webhook · idempotency (retry-safe) · never grant enrollment from the client · the webhook is the real source of truth (network can drop between pay and confirm).

---

## 5. Dashboard widget data (Phase 2)

The dashboard right-panel widgets are hardcoded today. Fine to ship static; wire these when gamification is real.

| # | Method | Path | Auth | Feeds |
|---|---|---|---|---|
| 15 | `GET` | `/me/stats` | user | 3 stat cards (enrolled/completed/certificates) |
| 16 | `GET` | `/me/streak` | user | `StreakWidget` |
| 17 | `GET` | `/me/rank` | user | `RankWidget` (XP, rank, next-rank) |
| 18 | `GET` | `/me/daily-goal` | user | `DailyGoalWidget` |
| 19 | `GET` | `/leaderboard` | user | `LeaderboardWidget` (top N + my row) |
| 20 | `GET` | `/me/calendar?month=2026-07` | user | `CalendarWidget` activity dots |

---

## 6. End-to-end flows (with endpoint calls)

**App load / session restore**
`AuthProvider` → `GET /auth/me` → 200 sets user / 401 = guest. Route guards (`ProtectedRoute`) act on the result.

**Signup → Dashboard**
`/signup` submit → `POST /auth/signup` (201, cookie) → `getPostAuthRedirectTarget()` → `/dashboard`.

**Guest enrolls (landing card OR course-detail page)** — now one unified flow
1. Click Enroll → guest → `setPendingEnrollment({courseSlug})` + go to `/login?redirect=checkout`
2. `POST /auth/login` (200, cookie)
3. `getPostAuthRedirectTarget()` reads `redirect=checkout` + pending → `/checkout?course=X`
4. `/checkout` page → `POST /orders` → gateway → `POST /orders/{id}/confirm`
5. Server grants enrollment → redirect `/dashboard` → dashboard calls `GET /enrollments`

**Logged-in enrolls** — `CheckoutModal` popup → same `POST /orders` → `/confirm` → `/dashboard`.

**Deep-link `/checkout?course=X` while logged out**
`ProtectedRoute` → `/login?redirect=%2Fcheckout%3Fcourse%3DX` → after login returns to that exact URL.

**Logout** — `DashboardTopbar` → `POST /auth/logout` → clear cookie → `/`.

---

## 7. Frontend mock → endpoint migration checklist

| Mock (today) | Replace with | File |
|---|---|---|
| `AuthContext.login/signup` (localStorage write) | `POST /auth/login` · `/auth/signup` | `context/AuthContext.tsx` |
| `AuthContext` mount restore | `GET /auth/me` | `context/AuthContext.tsx` |
| `logout()` | `POST /auth/logout` | `context/AuthContext.tsx` |
| `getEnrolledSlugs()` / `isEnrolled()` | `GET /enrollments` | `lib/enrollment.ts` |
| `enrollInCourse()` (localStorage write) | ❌ delete — enrollment via `/orders/confirm` | `lib/enrollment.ts` |
| `CheckoutBill` `setTimeout` fake pay | `POST /orders` + `/orders/{id}/confirm` | `components/checkout/CheckoutBill.tsx` |
| `pendingEnrollment` (localStorage) | keep client-side (pre-auth UX intent) — OK to leave | `lib/pendingEnrollment.ts` |

> `lib/pendingEnrollment.ts` can stay client-side: it only remembers "what the guest
> wanted to buy" before they have a session. No security value in server-storing it.

---

## 8. Suggested build order for backend

1. **Session core** — `/auth/signup`, `/auth/login`, `/auth/me`, `/auth/logout` (cookie). Unblocks every guard.
2. **Enrollment read** — `/enrollments`. Dashboard shows real data.
3. **Payments** — `/orders`, `/orders/{id}/confirm`, `/webhooks/payment`. The revenue path.
4. **Courses** — `/courses`, `/courses/{slug}` (only when courses become CMS-managed).
5. **Gamification** — `/me/*`, `/leaderboard` (last; static is fine to launch).
