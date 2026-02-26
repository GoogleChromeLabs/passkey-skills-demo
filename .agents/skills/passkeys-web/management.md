# Passkey Management Implementation

It is best practice to allow users to manage their registered passkeys (list, rename, delete).

## Requirements

- Allow saving multiple passkeys
- List registered passkeys
    - Each passkey item displays:
        - Passkey manager icon (Determine based on the AAGUID)
        - Passkey name (Determine based on the AAGUID)
        - Registered date / time
        - Rename button
        - Delete button
    - Rename a registered passkey
    - Delete a registered passkey
- Create passkey button
- Send list of passkeys signal to password manager as soon as the page is loaded or a passkey is deleted
- Send passkey user details signal to password manager after renaming a passkey

## 1. Server-side Operations

Ensure your `Credentials` store and server endpoints support:
- Returns all credentials for a user.
- Updates an existing credential (for renaming).
- Deletes a credential.

## 2. Client-Side Logic

- Send list of passkeys [[references/signal-api|signal]] to password manager by calling `PublicKeyCredential.signalAllAcceptedCredentials()` as soon as the page is loaded
- Send list of passkeys [[references/signal-api|signal]] to password manager by calling `PublicKeyCredential.signalAllAcceptedCredentials()` with a list of all saved credentials when a passkey is deleted
- Send passkey user details [[references/signal-api|signal]] to password manager by calling `PublicKeyCredential.signalCurrentUserDetails()` with the updated user details after renaming a passkey

## 3. UI Best Practices

- **Empty State**: Show a helpful message if no passkeys are registered.

