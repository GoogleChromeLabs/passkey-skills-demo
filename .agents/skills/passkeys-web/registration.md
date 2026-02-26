# Passkey Registration Implementation

Rely on a Passkey/WebAuthn/FIDO2 library that suit your server language.

## 1. Database Requirements

Your database should store:

```typescript
export interface SesamePublicKeyCredential {
  id: Base64URLString; // Credential ID
  passkeyUserId: PasskeyUserId; // User ID for passkeys
  credentialPublicKey: Base64URLString; // public key,
  credentialType: string; // type of credential,
  credentialDeviceType: 'singleDevice' | 'multiDevice';
  credentialBackedUp: boolean;
  aaguid: string; // AAGUID,
  providerIcon?: string; // Provider icon determined based on AAGUID
  name?: string; // Determined based on AAGUID
  transports: AuthenticatorTransportFuture[]; // list of transports,
  lastUsedAt?: number; // last used epoc time,
  registeredAt: number;
}
```

## 2. Server-Side

### Generate Options Endpoint

1. Create a `challenge` and store it to the session.
2. Pass existing credentials to `excludeCredentials` to prevent creating duplicates on the same password manager account.
3. Specify `authenticatorAttachement: "platform"` on passkey promotion to prioritize platform authenticators.
4. Do not specify `authenticatorAttachement` for passkey creation on passkey a management page to allow security keys.
5. Specify `requireResidentKey: true` and `residentKey: "required"` to request a discoverable credential.
6. Specify `userVerification: "preferred"` or `userVerification: "required"` to verify the user.

### Verify Response Endpoint

1. Check that the `challenge` matches the one in the session.
2. Accept a UV flag: `false` (if you used `'preferred'` and want to allow UV-less authenticators, though mostly unnecessary for resident keys).
3. [[references/determine-passkey-provider-from-aaguid|Determine the passkey provider based on the AAGUID]].
4. Respond with an HTTP error code so the frontend can identify why and act on it.

## 3. Client-Side Logic

### Fetch Options from the Server

1. Perform feature detection with `PublicKeyCredential.getClientCapabilities()` to ensure the browser and device support passkeys. Namely:
    - a platform authenticator
    - optionally conditional mediation, if authentication relies on form autofill.
    ```javascript
      // 1. Check for compatibility
      if (window.PublicKeyCredential && PublicKeyCredential.getClientCapabilities) {
        const capabilities = await PublicKeyCredential.getClientCapabilities();
        // If you aim to use conditional mediation, check `conditionalGet` as well
        if (capabilities.conditionalGet === true &&
            capabilities.passkeyPlatformAuthenticator === true) {
          // Platform authenticator is not available.
          return;
        }
      }
    ```
2. Decode fetched credential JSON object with `PublicKeyCredential.parseCreationOptionsFromJSON()`.
3. Handle `InvalidStateError`, `SecurityError`, and `NotAllowedError` errors:
    - `InvalidStateError`: The user is trying to register a passkey that already exists on the device. Use `excludeCredentials` in the registration options to prevent this error by listing existing credentials.
    - `SecurityError`: The RP ID is not valid for the current origin or the page is not loaded over HTTPS. Ensure your development environment uses HTTPS and the `rpID` matches the domain.
    - `NotAllowedError`: The user canceled the registration dialog or the operation timed out. Allow the user to retry.
    - **Other**s: Something unexpected happened. The browser shows an error dialog to the user.
4. Encode the resulting `AuthenticatorAttestationResponse` with `toJSON()` before send it to the server.
5. Call [[references/signal-api|`PublicKeyCredential.signalUnknownCredential()`]] when a server-side verification fails. This shouldn't be called on a passkey creation exception.

