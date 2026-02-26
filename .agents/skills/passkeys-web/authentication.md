# Passkey Authentication Implementation

Rely on a Passkey/WebAuthn/FIDO2 library that suit your server language.

## 1. Server-Side

### Generate Options

1.  **Import**: `generateAuthenticationOptions` from `@simplewebauthn/server`.
2.  **Options**:
    -   `rpID`: `process.env.HOSTNAME`.
    -   `allowCredentials`: Empty array `[]` (allows any discoverable credential/passkey).
    -   `userVerification`: `'preferred'`.
3.  **Session**: Store `options.challenge` in `req.session.challenge`.

### Verify Response

1.  **Import**: `verifyAuthenticationResponse` from `@simplewebauthn/server`.
2.  **Lookup**:
    -   Find the credential in your DB using `req.body.id` (Credential ID).
    -   If not found, error out.
3.  **Verify**:
    -   `authenticator.credentialPublicKey`: From DB (convert to Buffer/Uint8Array if stored as string).
    -   `authenticator.credentialID`: From DB.
    -   `authenticator.counter`: From DB.
    -   `expectedChallenge`: From session.
    -   `expectedOrigin`: Your origin.
    -   `expectedRPID`: Your RP ID.
4.  **Update**:
    -   If `verified`, update the credential's `counter` in the DB with `authenticationInfo.newCounter`.
    -   Log the user in (set session user).

## 2. Client-Side Logic

### Authentication Function

```javascript
import { startAuthentication } from '@simplewebauthn/browser';

export async function signin() {
  // 1. Fetch options
  const resp = await fetch('/auth/signinRequest');
  const options = await resp.json();

  // 2. Browser interaction
  // Pass `true` as the second argument to enable Conditional UI (Autofill) if supported
  const authResp = await startAuthentication(options, true);

  // 3. Verify with server
  const verificationResp = await fetch('/auth/signinResponse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authResp),
  });

  const verificationJSON = await verificationResp.json();
  if (verificationJSON.verified) {
    window.location.href = '/home';
  } else {
    throw new Error('Verification failed');
  }
}
```
