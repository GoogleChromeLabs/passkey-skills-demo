---
name: simplewebauthn
description: SimpleWebAuthn is a TypeScript-based passkey library. Use this when implementing passkeys in Node.js/TypeScript using `@simplewebauthn/server` library.
---
* See @./node_modules/@simplewebauthn/server/esm/registration/generateRegistrationOptions.d.ts and @./node_modules/@simplewebauthn/server/esm/registration/verifyRegistrationResponse.d.ts, @./node_modules/@simplewebauthn/server/esm/authentication/generateAuthenticationOptions.d.ts, @./node_modules/@simplewebauthn/server/esm/authentication/verifyAuthenticationResponse.d.ts for types.
* Use binary value for `userID` when invoking `generateRegistrationOptions()`.
* Use `requireUserVerification: false` for `verifyRegistrationResponse()` unless `authenticatorSelection.residentKey: "required"` on the frontend.
* `registrationInfo.credentialID` doesn't exist in `verifyRegistrationResponse()` result. Use `registrationInfo.credential.id` instead, which represents `string`.