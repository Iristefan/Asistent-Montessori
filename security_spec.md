# Security Specification: Montessori Assistant Authentication & Profiles

## 1. Data Invariants
- Invariant 1 (Identity Binding): A user document at `/users/{userId}` can only be created or modified if `request.auth.uid == userId`.
- Invariant 2 (Admin Integrity): The bootstrap admin (`constefan@gmail.com`) or users in `/admins/{adminId}` have administrative oversight.
- Invariant 3 (Role Boundary): Non-admin users cannot escalate their role to `admin` during user registration or update.
- Invariant 4 (Status Invariant): Clients cannot self-approve a suspended state.
- Invariant 5 (Schema & Type Safety): All fields must adhere to strict type and length limits (uid <= 128, email <= 256, displayName <= 128).
- Invariant 6 (PII Protection): Private user profile data cannot be read by arbitrary unauthenticated visitors or other non-admin users.

## 2. The Dirty Dozen Payloads (Designed to Fail)
1. **Unauthenticated Read**: Attempt to read `/users/user123` with no auth header.
2. **Unauthenticated Write**: Attempt to create `/users/user123` with no auth header.
3. **Identity Spoofing**: User with UID `attacker_uid` attempts to create `/users/victim_uid`.
4. **Role Escalation**: Regular user creates a profile with `role: "admin"`.
5. **Junk ID Poisoning**: Attempt to write to `/users/{invalid%20id%20with%20excessive%20junk}`.
6. **Denial of Wallet String Injection**: Payload with `displayName` containing 500,000 characters.
7. **Shadow Field Injection**: Payload including hidden backdoor `{ "isAdmin": true, "unvetted": "secret" }`.
8. **Owner ID Mutation**: Attempt to update document with `uid: "new_different_uid"`.
9. **Email Spoofing (Unverified Token)**: Updating sensitive fields when `email_verified == false`.
10. **Arbitrary Collection Scraping**: Querying entire `/users` collection without proper relational filters.
11. **Client Status Self-Elevation**: Client updating `status` from `pending` to `active` without admin role.
12. **Cross-Tenant Impersonation**: Attacker updating someone else's educator profile.
