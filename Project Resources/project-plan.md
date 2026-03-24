# Admin-Managed Beekeeper Registration — Execution Plan

## Instructions
- Each [ ] item is one unit of work. Execute in order unless noted.
- Mark [x] when done. Mark [~] if blocked (skip and continue).
- Commits happen per completed item. Never commit this file.
- Recovery: if context resets, say "resume plan" to continue from next [ ].

---

## Phase 1 — Backend Foundation

- [x] Create migration: add `phone`, `invited_by`, `status` columns + make `password` nullable in users table
- [x] Update `app/Models/User.php`: add phone/invited_by/status to #[Fillable], add invitedBy()/invitees() relationships, add isPending()/isActive() helpers, add getRoleAttribute() with $appends
- [x] Remove `Features::registration()` from `config/fortify.php`
- [x] Update `app/Providers/FortifyServiceProvider.php`: remove createUsersUsing + registerView, remove canRegister from login view props
- [x] Update `resources/js/pages/auth/login.tsx`: remove "Don't have an account? Register here" block (lines 136-144)
- [x] Update `database/seeders/DatabaseSeeder.php`: add beekeeper role creation, add status=active to admin user
- [x] Create `app/Http/Middleware/EnsureUserIsAdmin.php`
- [x] Register admin middleware alias + admin routes in `bootstrap/app.php`
- [x] Update `app/Http/Middleware/HandleInertiaRequests.php`: share role in auth.user

---

## Phase 2 — Invite Flow

- [x] Create `app/Notifications/BeekeeperInviteNotification.php`: toMail() with 7-day signed URL invite link
- [x] Create `app/Http/Controllers/Auth/AcceptInviteController.php`: show() + store() methods
- [x] Add signed invite accept routes to `routes/web.php`
- [x] Create `resources/js/pages/auth/accept-invite.tsx`: AuthLayout, email (read-only), password + confirm, BuzzyHive core components

---

## Phase 3 — Admin Panel

- [x] Create `routes/admin.php`: GET /admin, GET/POST /beekeepers, PATCH /{user}, PATCH toggle-status, POST resend-invite
- [x] Create `app/Http/Requests/Admin/StoreBeekeeperRequest.php`: name/email/phone validation
- [x] Create `app/Http/Requests/Admin/UpdateBeekeeperRequest.php`: same rules + email unique ignores current user
- [x] Create `app/Http/Controllers/Admin/BeekeeperController.php`: index/store/update/toggleStatus/resendInvite
- [x] Create `resources/js/layouts/admin-layout.tsx`: wraps AuthenticatedLayout + sidebar (settings/layout.tsx pattern)
- [x] Create `resources/js/pages/admin/dashboard.tsx`: stats cards (total, pending, active) using AdminLayout
- [x] Create `resources/js/pages/admin/beekeepers/index.tsx`: DataTable + Dropdown actions + 5 modals (create/view/edit/toggle/resend)

---

## Phase 4 — Role-Based Access

- [x] Create `app/Http/Responses/LoginResponse.php`: redirect admin to /admin, beekeeper to /dashboard
- [x] Update `app/Providers/FortifyServiceProvider.php`: bind LoginResponse in register(), add authenticateUsing() to reject pending users
- [x] Update `resources/js/layouts/authenticated-layout.tsx`: role-based nav (add Admin item for admin role)
- [x] Update `resources/js/types/auth.ts`: add phone, role, status, invited_by to User type
- [x] Create `resources/js/types/admin.ts`: PaginatedUsers type
- [x] Update `resources/js/types/index.ts`: add export for admin types

---

## Verification Checklist

- [ ] `php artisan migrate:fresh --seed` — tables created, admin + roles seeded
- [ ] Login as admin@buzzyhive.com / password — redirects to /admin
- [ ] Add Beekeeper modal — fills form, submits, pending badge appears in table
- [ ] Invite email received in Mailpit/log with signed link
- [ ] Accept invite page — sets password, redirects to login
- [ ] View modal — shows beekeeper details
- [ ] Edit modal — pre-filled, saves changes
- [ ] Toggle Status modal — confirmation, badge changes
- [ ] Resend Invite modal — confirmation, email sent
- [ ] Login as beekeeper — redirects to /dashboard, no Admin nav item
- [ ] GET /register — returns 404
- [ ] GET /admin as beekeeper — returns 403
