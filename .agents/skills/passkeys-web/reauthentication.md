# Passkey Reauthentication Implementation

Rely on a Passkey/WebAuthn/FIDO2 library that suit your server language.

## 1. Server-Side

### Generate Options Endpoint

- Pass the list of known credentials attached to the user to the `allowCredentials`.

### Verify Response Endpoint

- Verify that the assertion belongs to the user who is signing in.

