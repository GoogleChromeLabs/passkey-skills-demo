---
name: simplewebauthn
description: SimpleWebAuthn is a TypeScript-based passkey library. Use this when implementing passkeys in Node.js/TypeScript using `@simplewebauthn/server` library.
---
* Look up on `generateRegistrationOptions.d.ts`, `verifyRegistrationResponse.d.ts`, `generateAuthenticationOptions.d.ts` and `verifyAuthenticationResponse.d.ts` for types.
* Use binary value for `userID` when invoking `generateRegistrationOptions()`.
* Use `requireUserVerification: false` for `verifyRegistrationResponse()` unless `authenticatorSelection.residentKey: "required"` on the frontend.
* `registrationInfo.credentialID` doesn't exist in `verifyRegistrationResponse()` result. Use `registrationInfo.credential.id` instead, which represents `string`.
- `credentialDeviceType` and `credentialBackUp` are `VerifiedRegistrationResponse.registrationInfo` properties.
- Use `isoBase64URL.fromBuffer` and `isoBase64URL.toBuffer` to convert between base64url `string` and `Buffer`.
- Append `verifyBrowserAutofillInput: false` to `startAuthentcation()` when the form is consisted of web components.
