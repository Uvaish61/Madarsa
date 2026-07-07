# Madarsa Tech Academy - Repo Review And Fix Prompt

Date: 2026-07-07

## One-Line Verdict

Madarsa Tech Academy ka frontend visually polished aur professionally styled hai, lekin current implementation abhi mostly localStorage-backed prototype hai. UI strong hai, par auth, enrollment, dashboard data, profile data, progress, aur settings flow real application state se properly connected nahi hain.

Claude review ka technical verdict mostly correct tha: approx 88% accurate. Tone thoda harsh tha, lekin core issues real hain.

## Accuracy Summary

| Area | Claude Claim | Verified Status | Accuracy |
|---|---|---|---:|
| UI quality | Design strong hai | Correct. Landing, auth, dashboard visual polish good hai | 95% |
| Enrollment flow | Checkout writes, dashboard does not read | Correct. `CheckoutBill` writes via `enrollInCourse`, but dashboard consumers missing | 100% |
| Auth | Password verify nahi hota | Correct. `Login.tsx` password sirf presence validate karta hai | 100% |
| User identity | Dashboard user hardcoded hai | Mostly correct. Auth route guard ke liye use hota hai, identity rendering mostly hardcoded hai | 90% |
| Dashboard stats | Numbers hardcoded hain | Correct. Stats/progress/courses pages actual state se derive nahi hote | 95% |
| localStorage trust | Schema validation nahi | Correct | 100% |
| Next.js usage | Protected pages client-side gated hain | Mostly correct. Public pages still useful hain, so "SEO zero" exaggerated hai | 75% |
| Styling | Tailwind + inline raw hex mixed | Correct | 90% |
| Large files | Dashboard components too large | Correct. Multiple 1000+ line files exist | 100% |
| Repo hygiene | `tsconfig.tsbuildinfo` tracked hai | Correct | 100% |

Overall technical accuracy: 88%

## Current App Flow

### Guest Enrollment Flow

1. User landing/course page par Enroll click karta hai.
2. Agar user logged out hai, `setPendingEnrollment()` course intent ko localStorage me save karta hai.
3. User `/login?redirect=checkout` par bheja jata hai.
4. Login submit hone par `login(values.email)` localStorage me user save karta hai.
5. `getPostAuthRedirectTarget()` pending enrollment read karke user ko `/checkout?course=...` par bhejta hai.
6. Checkout button 900ms fake payment simulate karta hai.
7. `enrollInCourse(course.slug)` localStorage me course slug save karta hai.
8. User `/dashboard` par redirect hota hai.
9. Problem: dashboard enrolled courses localStorage se read nahi karta, isliye dashboard hardcoded data dikhata hai.

### Logged-In Enrollment Flow

1. Logged-in user Enroll click karta hai.
2. Checkout modal open hota hai.
3. Complete Purchase fake payment run karta hai.
4. Enrollment localStorage me write hota hai.
5. User dashboard par jata hai.
6. Problem: dashboard us enrollment ko use nahi karta.

### Auth Flow

1. `AuthContext` mount par `madarsa_user` localStorage se read karta hai.
2. `login(email)` sirf email persist karta hai.
3. `signup(email, name)` email/name persist karta hai.
4. Password storage, password verification, backend session, cookie auth, `/auth/me` call abhi nahi hai.
5. `ProtectedRoute` localStorage-backed user state se protected pages gate karta hai.

## What Is Good

| Good Part | Why It Matters |
|---|---|
| Visual polish | Product ka first impression strong hai |
| Folder separation | `auth`, `checkout`, `dashboard`, `lib`, `context` broadly understandable hain |
| Pending enrollment intent | Guest enroll -> login -> checkout resume flow ka idea good hai |
| API contract exists | Backend migration ka direction already documented hai |
| Static course data isolated | Backend later add karna easier hoga |
| Shared checkout bill | Modal checkout aur full-page checkout same bill component use karte hain |

## Major Problems

### 1. Enrollment Is Not Connected To Dashboard

Files:

- `components/checkout/CheckoutBill.tsx`
- `lib/enrollment.ts`
- `components/dashboard/DashboardCourses.tsx`
- `components/dashboard/DashboardStats.tsx`
- `components/dashboard/CoursesContent.tsx`
- `components/dashboard/ProgressContent.tsx`

Issue:

`CheckoutBill` localStorage me enrolled slug write karta hai, but dashboard UI enrolled slugs read nahi karta. Isliye course purchase karne ke baad dashboard real purchased course nahi dikhata.

Impact:

Core product loop broken hai: browse -> checkout -> enroll -> dashboard.

### 2. Auth Is Mock Only

Files:

- `context/AuthContext.tsx`
- `components/auth/Login.tsx`
- `components/auth/SignUp.tsx`

Issue:

Login password verify nahi karta. `login(values.email)` directly session create karta hai. User object incomplete hai. localStorage blindly trusted hai.

Impact:

Backend ke bina acceptable prototype hai, but "auth" ko real security nahi maana ja sakta.

### 3. User Identity Hardcoded

Files:

- `components/dashboard/DashboardSidebar.tsx`
- `components/dashboard/DashboardTopbar.tsx`
- `components/dashboard/ProfileContent.tsx`
- `components/dashboard/SettingsContent.tsx`
- `components/dashboard/CertificateCard.tsx`

Issue:

Dashboard me multiple places par "Uvaish Khan", "uvaishkhan@gmail.com", aur "EduLearn" hardcoded hain. Signup user ka name/email profile/dashboard me reflect nahi hota.

Impact:

App personalized nahi lagti; user trust break hota hai.

### 4. No Single Domain Model

Issue:

Course, enrollment, progress, certificates, stats, user profile ke liye ek shared domain layer nahi hai. Har page apna data hardcode karta hai.

Impact:

Stats contradict kar sakte hain. Ek page update karne par dusre pages stale rahenge.

### 5. Large Dashboard Files

Observed line counts:

| File | Approx Lines |
|---|---:|
| `SettingsContent.tsx` | 1146 |
| `CoursesContent.tsx` | 1131 |
| `ProfileContent.tsx` | 1018 |
| `ProgressContent.tsx` | 493 |

Impact:

Maintainability low hai. Data, styles, and subcomponents mixed hain.

### 6. Styling Is Duplicated

Issue:

Dashboard me many inline styles and repeated raw colors like `#16c564` exist. Tailwind/design tokens exist but dashboard ignores them in many places.

Impact:

Brand/theme update painful hoga.

### 7. Settings/Profile Forms Do Not Save Real State

Files:

- `components/dashboard/SettingsContent.tsx`
- `components/dashboard/ProfileContent.tsx`

Issue:

Inputs use `defaultValue`, but save action actual user profile state update nahi karta.

Impact:

UI editable dikhti hai, but data persist nahi hota.

### 8. Dead Links And Decorative Buttons

Examples:

- Forgot password points to `/`
- View all uses `#`
- Bell/camera/edit style buttons often decorative

Impact:

UX incomplete lagti hai.

### 9. Repo Hygiene

Issue:

`tsconfig.tsbuildinfo` tracked hai, but it is build cache and should be ignored.

Fix:

Add `tsconfig.tsbuildinfo` to `.gitignore` and remove it from git tracking.

## Priority Fix Plan

### Phase 1 - Make Prototype Behave Like A Real App

1. Add domain types: `User`, `Course`, `Enrollment`, `Progress`, `DashboardStats`, `UserProfile`.
2. Add a single mock store wrapper over localStorage.
3. Make auth user object complete: id, name, email.
4. Use auth user in dashboard sidebar, topbar, profile, settings, certificate.
5. Make checkout enrollment write through the shared store.
6. Make dashboard courses/stats read from the shared store.
7. Derive progress/stats from one source of truth.

### Phase 2 - Clean UX

1. Make settings/profile forms controlled.
2. Save profile changes to mock store.
3. Replace or wire dead links/buttons.
4. Add accessibility for clickable rows.

### Phase 3 - Maintainability

1. Extract shared dashboard primitives:
   - `DashboardCard`
   - `StatTile`
   - `ProgressBar`
   - `UserAvatar`
   - `Chip`
   - `IconButton`
2. Move repeated constants and colors into theme/tokens.
3. Split large files into smaller components and data modules.

### Phase 4 - Backend Migration

Use `API_CONTRACT.md` as source of truth:

1. Replace local auth with:
   - `POST /auth/signup`
   - `POST /auth/login`
   - `GET /auth/me`
   - `POST /auth/logout`
2. Use httpOnly Secure SameSite cookie session.
3. Replace enrollment localStorage with:
   - `GET /enrollments`
4. Replace fake checkout with:
   - `POST /orders`
   - Payment gateway
   - `POST /orders/{id}/confirm`
   - `POST /webhooks/payment`
5. Never store real JWTs in localStorage.

## Acceptance Criteria

The app is fixed when these flows work:

1. Signup with name/email -> dashboard shows same name/email.
2. Login -> protected pages open.
3. Logout -> protected pages redirect to login.
4. Guest clicks enroll -> login -> checkout -> complete purchase -> dashboard shows that course.
5. Logged-in user enrolls -> checkout modal -> complete purchase -> dashboard updates.
6. Dashboard stats match enrolled/completed/certificate state.
7. Profile and settings show same user data.
8. Settings save persists and updates profile/sidebar/topbar.
9. No contradictory progress/certificate numbers across dashboard pages.
10. `tsconfig.tsbuildinfo` is ignored and not tracked.

## Complete AI Prompt To Fix This Repo

Copy and paste the following prompt into any coding AI:

```text
You are working on my Next.js App Router project "Madarsa Tech Academy".

Important context:
- The project is currently a polished frontend prototype.
- It uses localStorage for mock auth and mock enrollment.
- I will add a backend later, so do not build a backend now.
- Preserve the current visual design as much as possible.
- Use API_CONTRACT.md as the future backend contract.

Your goal:
Turn the current localStorage prototype into a backend-ready frontend where auth identity, enrollment, dashboard stats, profile, settings, and progress use one consistent app state instead of hardcoded disconnected values.

First inspect the repo. Then implement the following changes in order.

1. Create a proper frontend domain model
- Add shared types for:
  - AuthUser
  - UserProfile
  - Course
  - Enrollment
  - CourseProgress
  - DashboardStats
- Put them in a sensible location such as `types/` or `lib/domain.ts`.
- Keep the types close to API_CONTRACT.md so backend migration is easy.

2. Create a single mock app store
- Create one localStorage-backed store module, for example `lib/mockStore.ts` or `lib/app-store.ts`.
- It should safely parse JSON.
- It should validate/normalize data enough that bad localStorage does not crash the app.
- It should expose functions like:
  - getCurrentUser()
  - saveCurrentUser(user)
  - clearCurrentUser()
  - getUserProfile()
  - saveUserProfile(profile)
  - getEnrollments()
  - addEnrollment(courseSlug)
  - isCourseEnrolled(courseSlug)
  - getCourseProgress(courseSlug)
  - saveCourseProgress(progress)
  - getDashboardStats()
- Do not scatter direct localStorage access across components.

3. Fix AuthContext
- Update AuthContext to use the shared store.
- User should include id, name, email.
- Signup should create a proper mock user with name/email.
- Login can remain mock until backend exists, but it must return a consistent user object.
- Structure AuthContext methods so later they can be replaced by:
  - POST /auth/login
  - POST /auth/signup
  - GET /auth/me
  - POST /auth/logout
- Do not store real JWTs in localStorage.

4. Wire user identity into dashboard
- Replace hardcoded "Uvaish Khan" and "uvaishkhan@gmail.com" where user identity should be dynamic.
- Use AuthContext/profile store in:
  - DashboardSidebar
  - DashboardTopbar
  - ProfileContent
  - SettingsContent
  - CertificateCard where relevant
- If the user has no name, derive a display name from email.
- Keep layout and design unchanged.

5. Fix enrollment flow
- Replace `lib/enrollment.ts` or refactor it to use the new shared store.
- CheckoutBill should add enrollment through the store after the fake payment succeeds.
- DashboardCourses must read real enrolled courses from the store.
- DashboardStats must derive enrolled count from the store.
- CoursesContent and course detail/enroll buttons should show enrolled state when applicable.
- If no enrolled courses exist, show a polished empty state with CTA to browse courses.
- Keep fake payment for now, but isolate it so later it can be replaced with `/orders` and `/orders/{id}/confirm`.

6. Fix dashboard stats and progress consistency
- Create one source of truth for course progress.
- DashboardStats, DashboardCourses, CoursesContent, ProgressContent, ProfileContent, and CertificatesContent should not contradict each other.
- Completed courses and certificates should be derived from progress/enrollment.
- Do not leave hardcoded "1 enrolled", "30%", "12 of 40 lessons", etc. unless they come from the mock store seed data.

7. Seed realistic mock data
- On first run, create reasonable mock data only if localStorage is empty.
- If a user signs up fresh, start them with no enrollments unless they complete checkout.
- For demo users created by login, keep behavior predictable.
- Do not overwrite existing localStorage data on every load.

8. Make Settings/Profile forms functional
- Convert important profile/settings inputs from uncontrolled `defaultValue` to controlled state.
- Save Changes should persist user profile to the shared store.
- Profile page, sidebar, topbar should reflect saved changes.
- Keep UI style unchanged.

9. Clean dead links/buttons
- Replace `href="#"` with real routes or buttons with handlers.
- Forgot password can route to a placeholder page or be disabled with a clear future TODO, but it should not navigate to `/` pretending to work.
- Decorative buttons should either get a handler, disabled state, or be removed if misleading.

10. Improve maintainability without redesigning
- Extract small shared dashboard primitives only where it reduces obvious duplication:
  - Card
  - StatTile
  - ProgressBar
  - UserAvatar
  - Chip
  - IconButton
- Do not perform a giant redesign.
- Keep refactors scoped and incremental.

11. Consolidate theme constants
- Move repeated dashboard colors like `#16c564` into shared constants/tokens.
- Replace repeated raw values only where safe.
- Do not break the current visual look.

12. Repo hygiene
- Add `tsconfig.tsbuildinfo` to `.gitignore`.
- Remove `tsconfig.tsbuildinfo` from git tracking if tracked.
- Do not delete unrelated user files.
- Do not revert unrelated changes.

13. Verification
- Run lint/build if available.
- Manually verify these flows:
  - signup with name/email -> dashboard/sidebar/profile show same identity
  - guest enroll -> login -> checkout -> complete purchase -> dashboard shows enrolled course
  - logged-in enroll -> checkout modal -> dashboard updates
  - settings save -> profile/sidebar/topbar update
  - logout -> protected pages redirect to login
- Report any tests/build commands that fail and why.

Constraints:
- Preserve existing design.
- Do not add a real backend.
- Do not store real JWTs in localStorage.
- Keep future migration aligned with API_CONTRACT.md.
- Prefer small, reviewable changes over a massive rewrite.
```

