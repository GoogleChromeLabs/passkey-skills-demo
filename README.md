# Passkeys Codelab

This folder contains the source code for the passkey codelab. It gives an introduction into implementing passkeys,
- [https://developers.google.com/codelabs/passkey-form-autofill/](https://developers.google.com/codelabs/passkey-form-autofill/)

## Run the demo

First, install dependencies with `npm install`.

Then, run with the following command:

```
npm run build && IS_LOCAL=1 npm run start
```

## Additional details

When `IS_LOCAL` is not set, cookies are sent with the `Secure` attribute. This means the demo will only work on the HTTPS protocol.
