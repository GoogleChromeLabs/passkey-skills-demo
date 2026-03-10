This is a demo project to test `passkey-web` agent skills.

With `passkey-web` agent skills, you can implement passkeys that meets [Google's passkey best practices](https://web.dev/articles/passkey-checklist) in your web application with relatively low effort.

## Features

The features you can expect with this skill includes:

### Passkey registration

- Database schema definition
- Frontend
    - Feature detection
    - Error handling
    - Signal API to remove the created passkey when server-side verification fails
- Server side
    - Credential registration
    - Passkey provider detection based on AAGUID
### Passkey management UI

- List of saved passkeys
- Show passkey details
    - Passkey provider name
    - Passkey provider icon
    - Registered date and time
    - Last used date and time
- Delete passkeys
- Rename passkeys
- Create a new passkey
- Signal API to inform the list of passkeys to the passkey provider
- Signal API to inform the passkey details update to the passkey provider
### Passkey authentication

- Frontend
    - Feature detection
    - Passkey button flow
    - Optional passkey form autofill (conditional mediation)
    - Error handling
- Server side
    - Verification
- Signal API to remove the saved passkey when server-side credential is missing
### Passkey reauthentication

- Frontend
    - Feature detection
    - Authentication with a list of credentials specified
    - Passkey form autofill (conditional mediation)
    - Passkey button flow
- Server side
    - Verification matching the claimed user

### References

- Signal API
- Conditional Mediation
- Passkey provider detection using AAGUID

## Tested coding agents

- Antigravity + Gemini 3.1 Pro
- Antigravity + Opus 4.6
- Claude Code + Opus 4.6

## Skills usage

Try the following prompts to test the skills:

1. "Implement passkey registration to `/home`"
2. "Implement passkey management UI to `/home`"
3. "Implement passkey authentication to `/`"
4. "Implement passkey reauthentication to `/reauth`"

You may also try variations of above prompts.

## Running the server

Install dependencies

```bash
# Install dependencies
npm install
```

Build

```bash
# Install dependencies
npm run build
```

Start the server

```bash
# Start the server
npm run start
```

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.