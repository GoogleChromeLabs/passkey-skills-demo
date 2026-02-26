---
name: simplewebauthn
description: SimpleWebAuthn is a TypeScript-based passkey library. Use this when implementing passkeys in Node.js/TypeScript using `@simplewebauthn/server` library.
---
- Read `@simplewebauthn/server/esm/authentication/*.d.ts` and `@simplewebauthn/server/esm/registration/*.d.ts` to understand what types are expected to pass.
* Use binary for `userID` for `generateRegistrationOptions()`.
* Use `requireUserVerification: false` for `verifyRegistrationResponse()` unless `authenticatorSelection.residentKey: "required"` on the frontend.
* `registrationInfo.credentialID` doesn't exist in `verifyRegistrationResponse()` result. Use `registrationInfo.credential.id` instead, which represents `string`.
