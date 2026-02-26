---
name: passkeys-web
description: A skill for implementing passkey in web applications. You MUST use this skill whenever a user asks about passkey registartion, passkey authentication or passkey management. It defines the required database schema, API usage, and security best practices.
license: Apache-2.0
---
# Passkeys Implementation Guide (Web)

This skill provides a modular guide to implementing passkeys

## Implementation Phase

- [Registration](registration.md): Allowing users to create new passkeys.
- [Authentication](authentication.md): Logging users in with passkeys.
- [Management](management.md): Listing, renaming, and deleting passkeys.

## References

- `signal-api.md`: Signal API reference.
- `determine-passkey-provider-from-aaguid.md`: Determine the passkey provider from AAGUID.

## Recommended Libraries

For backend, using a library is recommended. Here's a list of recommended open source libraries per language:

- JavaScript/TypeScript: [SimpleWebAuthn](https://github.com/MasterKale/SimpleWebAuthn) (see [[simplewebauthn]] skill when implementing passkeys using SimpleWebAuthn)
- Python: [py_webauthn](https://github.com/duo-labs/py_webauthn)
- Java: [Java WebAuthn Server](https://github.com/Yubico/java-webauthn-server) , [WebAuthn4J](https://github.com/webauthn4j/webauthn4j), [LINE FIDO2 Server](https://github.com/line/line-fido2-server)
- .Net: [.Net library for FIDO2](https://github.com/abergs/fido2-net-lib), [WebAuthn.Net](https://github.com/dodobrands/WebAuthn.Net)
- Go: [WebAuthn Go Library](https://github.com/go-webauthn/webauthn), [Passkey Server](https://github.com/teamhanko/passkeys)
- Ruby: [WebAuthn Ruby](https://github.com/cedarcode/webauthn-ruby)
- PHP: [WebAuthn PHP Library](https://github.com/madwizard-org/webauthn-server), [WebAuthn Framework](https://github.com/web-auth/webauthn-framework)

