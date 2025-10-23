# HRMS Mock Accounts

This document contains the mock user accounts for testing the HRMS application. These accounts are defined in `src/context/AuthContext.jsx`.

## Mock User Accounts

### 1. Super Admin
- **Email:** `superadmin@hrms.com`
- **Password:** `admin123`
- **Role:** `super-admin`
- **MFA Enabled:** Yes
- **Dashboard:** `/dashboard/super-admin`

### 2. Site Admin
- **Email:** `siteadmin@hrms.com`
- **Password:** `admin123`
- **Role:** `site-admin`
- **MFA Enabled:** Yes
- **Dashboard:** `/dashboard/site-admin`

### 3. Operator
- **Email:** `operator@hrms.com`
- **Password:** `admin123`
- **Role:** `operator`
- **MFA Enabled:** No
- **Dashboard:** `/dashboard/operator`

### 4. Client Admin
- **Email:** `clientadmin@hrms.com`
- **Password:** `admin123`
- **Role:** `client-admin`
- **MFA Enabled:** No
- **Dashboard:** `/dashboard/client-admin`

### 5. Client User
- **Email:** `clientuser@hrms.com`
- **Password:** `admin123`
- **Role:** `client-user`
- **MFA Enabled:** No
- **Dashboard:** `/dashboard/client-user`

## Features Implemented

### 1. Authentication & Authorization
- ✅ Authentication context with mock user management
- ✅ Protected routes with role-based access control
- ✅ Automatic redirection based on user roles
- ✅ Persistent login state using localStorage

### 2. Loading States
- ✅ ShimmerLoader applied to all dashboard pages
- ✅ Initial loading simulation (1.5 seconds)
- ✅ Logout loading with smooth transitions

### 3. Responsive Design
- ✅ LoginPage: Mobile-first responsive design
- ✅ SignupPage: Mobile-first responsive design
- ✅ MFA_Setup: Mobile-first responsive design
- ✅ NoInternet: Mobile-first responsive design

### 4. Mock Authentication
- ✅ 5 mock accounts for different roles
- ✅ OTP verification simulation (accepts any 6-digit code)
- ✅ MFA status checking for Super Admin and Site Admin
- ✅ Role-based dashboard redirection

## Usage Instructions

1. **Login:** Use any of the mock email/password combinations above
2. **MFA Users:** Super Admin and Site Admin will be prompted for OTP verification
3. **Non-MFA Users:** Operator, Client Admin, and Client User will be redirected directly to their dashboards
4. **OTP Verification:** Enter any 6-digit numeric code to proceed
5. **Logout:** Click logout button to return to login page

## Technical Notes

- All passwords are set to `admin123` for easy testing
- MFA is enabled only for Super Admin and Site Admin accounts
- The authentication system is designed to be easily replaceable with real backend integration
- Protected routes automatically redirect unauthorized users to login
- User state persists across browser sessions using localStorage
