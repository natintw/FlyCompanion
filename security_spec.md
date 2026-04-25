# Security Specification - FlyCompanion

## Data Invariants
1. A **Trip** must have a valid `requesterId` matching the creator's UID.
2. A **Match** can only be created by a user with `kycStatus == 'verified'`.
3. A **Match** must link back to a valid `tripId`.
4. Users can only update their own profile fields, except for `kycStatus`, `ratingAvg`, and `ratingCount` which are system-managed.
5. **Caretaker** profiles can only be accessed by the user who created them (the requester).
6. **Trips** are public for searching but can only be modified by the requester.
7. **Matches** are private to the requester and the companion.

## The Dirty Dozen Payloads

1. **Identity Spoofing**: Attempt to create a trip with a `requesterId` belonging to another user.
2. **KYC Bypass**: Attempt to create a match as an `unverified` companion.
3. **Ghost Field Injection**: Attempt to update a user profile with `kycStatus: 'verified'` manually.
4. **Unauthorized Deletion**: A companion attempting to delete a trip they didn't create.
5. **Price Manipulation**: Attempt to change the `agreedFee` in a match after it's been `confirmed`.
6. **State Skip**: Attempt to set a match status to `completed` without going through `in-progress`.
7. **Resource Exhaustion**: Attempt to create a document with a 1MB string in the `notes` field.
8. **ID Poisoning**: Attempt to create a caretaker profile with a document ID containing malicious scripts.
9. **Relational Breakage**: Creating a match for a non-existent trip.
10. **Shadow Profile Read**: Attempt to read another user's caretaker profiles.
11. **Query Scraping**: Attempting a collection group query on `matches` to find all matches in the system.
12. **Timestamp Fraud**: Providing a future `createdAt` timestamp from the client.

## Test Runner (Conceptual)
The `firestore.rules.test.ts` would verify that these payloads result in `PERMISSION_DENIED`.
