Conditional Mediation is also known as Conditional UI or Conditional Get. This allows users to sign in using their passkeys directly from the browser's autofill suggestions, providing a seamless transition from passwords to passkeys.

Passkey form autofill leverages the `mediation: 'conditional'` property in the WebAuthn `navigator.credentials.get()` call. When implemented, the browser doesn't show a modal immediately. Instead, it waits until the user focuses on an input field annotated with `autocomplete="username webauthn"`.

## Implementation Steps

### 1. Frontend: Annotate the Sign-in Form
Add `autocomplete="username webauthn"` to your username input field. You can also add `autofocus` to trigger the autofill prompt immediately on page load.

```html
<form id="signin-form">
  <input type="text" name="username" autocomplete="username webauthn" autofocus>
  <input type="password" name="password" autocomplete="current-password">
  <button type="submit">Sign in</button>
</form>
```

### 2. Frontend: Feature Detection
Check if the browser supports Conditional UI before making the call.

```javascript
if (window.PublicKeyCredential && PublicKeyCredential.getClientCapabilities) {
  const capabilities = await PublicKeyCredential.getClientCapabilities();
  if (capabilities.conditionalGet === true) {
    // The browser supports passkeys and the conditional mediation.
  }
}
```

### 3.a. Frontend: Fetch Authentication Options
Fetch `PublicKeyCredentialRequestOptions` from your backend. Ensure `allowCredentials` is an empty array to allow any passkey associated with the domain.

```javascript
const response = await fetch('/api/passkey/signin-request');
const optionsJson = await response.json();

// Parse JSON options into the format required by the API
const options = PublicKeyCredential.parseRequestOptionsFromJSON(optionsJson);
```

### 4. Frontend: Call WebAuthn with Conditional Mediation
Invoke `navigator.credentials.get()` with `mediation: 'conditional'`.

```javascript
const abortController = new AbortController();

try {
  const credential = await navigator.credentials.get({
    publicKey: options,
    signal: abortController.signal,
    mediation: 'conditional'
  });

  if (credential) {
    // Send the credential to the backend for verification
    const result = credential.toJSON();
    const response = await fetch('/api/passkey/signin-response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    });
    
    if (response.status === 200) {
      // Redirect or update UI upon successful sign-in
      window.location.href = '/dashboard';
    } else if (response.status === 404) {
      // Matching public key does not exist on the server.
      if (PublicKeyCredential.signalUnknownCredential) {
        // Remove the passkey from the password manager if possible
        await PublicKeyCredential.signalUnknownCredential({
          rpId: "example.com",
          credentialId: "*****" // base64url encoded credential ID
        });
      } else {
        // Encourage the user to delete the passkey from the password manager nevertheless.
        ...
      }
    } else {
      // Something unexpected happened
    }
  }
} catch (err) {
  console.error('Conditional UI error:', err);
}
```

## Best Practices

- Allow users to sign in with a passkey through form autofill.
- Signal when a passkey's matching credential is not found on the backend.
- **Timing**: Call `navigator.credentials.get()` as soon as the sign-in page loads.
- **AbortController**: Use an `AbortController` to cancel the conditional call if the user signs in via another method (e.g., password) or navigates away.
- Automatically create a passkey (conditional create) after the user signs in with a password (and a second factor).
- Prompt for local passkey creation if the user has signed in with a cross-device passkey.
- Signal the list of available passkeys and updated user details (username, display name) to the provider after sign-in or when changes occur.

## Troubleshooting

- **Error**: Passkey suggestions do not appear in the autofill.
    - **Cause**: The `autocomplete` attribute is missing `webauthn`, or the `navigator.credentials.get` call was not made with `mediation: 'conditional'`.
    - **Solution**: Ensure your input has `autocomplete="username webauthn"` and you are calling the WebAuthn API as soon as the page loads.
- **Error**: `NotAllowedError` or "Operation timed out".
    - **Cause**: Conditional UI requests can time out if the user doesn't interact with the suggestions for a long time.
    - **Solution**: This is generally fine; the browser handles high-level UI. Ensure you don't block other sign-in methods.
- **Error**: Form autofill works once but then stops.
    - **Cause**: If the `AbortController` signal is triggered, the discovery stops.
    - **Solution**: Only abort the signal if the user has signed in through another method.

## Examples

**User**: "How do I make passkeys show up in the browser's sign-in suggestions?"
**Agent**: [Explains Conditional UI and starts implementing the `autocomplete="username webauthn"` attribute and the `mediation: 'conditional'` logic.]

**User**: "I added the autocomplete attribute but no passkeys are showing up."
**Agent**: [Checks if `navigator.credentials.get` is being called with the correct mediation and challenge options.]

## Resources
- [Sign in with a passkey through form autofill (web.dev)](https://web.dev/articles/passkey-form-autofill)
- [WebAuthn Conditional UI (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API/Conditional_UI)
- [SimpleWebAuthn Documentation](https://simplewebauthn.dev/)
