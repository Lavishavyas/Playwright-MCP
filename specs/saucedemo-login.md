# Test Plan: Sauce Demo Login

**Target:** https://www.saucedemo.com
**Seed:** tests/seed.spec.ts
**Date:** 2026-09-22

## Overview
Validate the Sauce Demo login form for a successful standard-user login and the expected failure states for a locked account, missing fields, and invalid credentials. Each scenario starts from a fresh login page so the outcomes are independent.

## Preconditions
- The test can open `https://www.saucedemo.com`.
- The login page is displayed with accessible Username and Password fields and a Login button.
- Use `standard_user`, `locked_out_user`, and `secret_sauce` only as specified by the test data.
- Reset to the login page before each scenario; do not reuse an authenticated session.

## Scenarios

### Scenario 1.1 — Standard user logs in successfully
- **Priority:** P0
- **Tags:** @smoke
- **Preconditions:** A fresh Sauce Demo login page is displayed.
- **Steps:**
  1. Enter `standard_user` in the Username field — expected: the username value is accepted.
  2. Enter `secret_sauce` in the Password field — expected: the password field contains a masked value.
  3. Select the Login button — expected: the app navigates to the inventory page.
- **Assertions:**
  - The URL ends with `/inventory.html`.
  - A page heading named `Products` is visible.
  - The inventory page exposes the shopping cart control.
- **Edge cases considered:**
  - Verify the login does not remain on the login page after valid submission.
  - Verify the password is not displayed as plain text while entered.

### Scenario 1.2 — Locked-out user is rejected
- **Priority:** P0
- **Tags:** @regression
- **Preconditions:** A fresh Sauce Demo login page is displayed.
- **Steps:**
  1. Enter `locked_out_user` in the Username field — expected: the username value is accepted.
  2. Enter `secret_sauce` in the Password field — expected: the password field contains a masked value.
  3. Select the Login button — expected: the login page remains displayed with a locked-account error.
- **Assertions:**
  - The error message `Epic sadface: Sorry, this user has been locked out.` is visible.
  - The URL does not navigate to `/inventory.html`.
- **Edge cases considered:**
  - Confirm the locked-out message is associated with the failed submission and is visible without a page reload.

### Scenario 1.3 — Empty username is rejected
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** A fresh Sauce Demo login page is displayed.
- **Steps:**
  1. Leave the Username field empty — expected: no username is present.
  2. Enter `secret_sauce` in the Password field — expected: the password field contains a masked value.
  3. Select the Login button — expected: the login page remains displayed with a required-username error.
- **Assertions:**
  - The error message `Epic sadface: Username is required` is visible.
  - The URL does not navigate to `/inventory.html`.
- **Edge cases considered:**
  - Confirm a password alone cannot submit the form.
  - Confirm the username field remains empty after the validation response.

### Scenario 1.4 — Empty password is rejected
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** A fresh Sauce Demo login page is displayed.
- **Steps:**
  1. Enter `standard_user` in the Username field — expected: the username value is accepted.
  2. Leave the Password field empty — expected: no password is present.
  3. Select the Login button — expected: the login page remains displayed with a required-password error.
- **Assertions:**
  - The error message `Epic sadface: Password is required` is visible.
  - The URL does not navigate to `/inventory.html`.
- **Edge cases considered:**
  - Confirm a username alone cannot submit the form.
  - Confirm the password field remains empty after the validation response.

### Scenario 1.5 — Invalid credentials are rejected
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** A fresh Sauce Demo login page is displayed.
- **Steps:**
  1. Enter an invalid username such as `invalid_user` in the Username field — expected: the value is accepted.
  2. Enter `secret_sauce` in the Password field — expected: the password field contains a masked value.
  3. Select the Login button — expected: the login page remains displayed with an invalid-credentials error.
- **Assertions:**
  - The error message `Epic sadface: Username and password do not match any user in this service` is visible.
  - The URL does not navigate to `/inventory.html`.
- **Edge cases considered:**
  - Confirm a syntactically filled form with an unknown username is treated differently from missing-field validation.
  - Confirm no authenticated inventory content is exposed after the failed attempt.

## Not covered (and why)
- Logout and authenticated inventory workflows are outside the requested login coverage.
- Other supplied Sauce Demo accounts are not covered because the request specifies only `standard_user` and `locked_out_user`.
- Network failures, browser compatibility, and session persistence are not covered because they require environment-level test setup beyond the login scenarios.