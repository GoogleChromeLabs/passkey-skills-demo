# Passkey Agent Skills Alpha

*This is alpha version for evalution. Please do not share.*

This repository provides **agentic skills** and a **demo environment** designed to help AI coding agents implement passkeys on the web following [Google's passkey best practices](https://web.dev/articles/passkey-checklist).

## What are Agent Skills?

Agent skills are markdown-based guides that you can provide to an AI coding assistant (like Antigravity or Claude Code) to guide it through complex, multi-step implementation tasks. By exposing these skills in a `.agents/skills` directory, your AI agent automatically learns the correct standards, API usage, and security practices for implementing passkeys.

## Included Skills

This repository includes the following skills:

- **`passkeys-web`**: The core skill for implementing passkeys in web applications. It defines the required database schemas, API flows, and security requirements for passkey registration, authentication, management, and reauthentication.
- **`evaluate-passkey-skills`**: An auditing skill to evaluate a passkey implementation against the best practices defined in `passkeys-web` and `simplewebauthn`.

Additionally, to assist the demo code using SimpleWebAuthn, we provide:

- **`simplewebauthn`**: A specialized skill for implementing passkeys in Node.js/TypeScript using the `@simplewebauthn/server` library.

## Give Us Your Feedback

We would appreciate your feedback on:

- Your overall thoughts on the concept of passkey agent skills.
- Whether these skills actually helped you implement passkeys smoothly.
- Any areas where we can improve the existing skills.
- Any new features or missing skills you'd like to see added.

Please send your feedback to `agektmr@google.com`. 

## How to Try the Alpha

To try out these skills, you can use the provided demo project.

### 1. Set Up the Demo Environment

The repository includes a starter web application in the `demo` directory where you can test the AI agent's implementation of passkeys.

```bash
cd demo
npm install
npm run build
npm start
```

### 2. Instruct Your Agent

Once your agent is running in the repository directory, you can prompt it to implement specific features. The agent will automatically recognize the skills provided. Try the following prompts:

1. "Implement passkey registration to `/home`"
2. "Implement passkey management UI to `/home`"
3. "Implement passkey authentication to `/`"
4. "Implement passkey reauthentication to `/reauth`"

You can also prompt the agent to audit the implementation it just made:
- "Evaluate my passkey implementation using the `evaluate-passkey-skills` skill."

### 3. Try It With Your Own Code

To apply these skills to your own project, simply copy the `./skills` directory into your project's `.agents/skills` directory. Once in place, prompt your preferred coding agent to implement passkeys within your codebase. 

Afterward, you can use the `evaluate-passkey-skills` skill to verify that the generated codebase aligns with passkey best practices.

We appreciate if you could experiment with coding agents that haven't been officially tested yet!

## Features Covered by the Skills

When the AI implements these features using the provided skills, you can expect the following best practices to be incorporated out-of-the-box:

### Passkey Registration
- Proper database schema definition.
- Frontend feature detection and specific error handling.
- Appropriate Signal API integration to remove dead credentials automatically.
- Passkey provider detection and matching using AAGUIDs.

### Passkey Authentication & Reauthentication
- Frontend passkey button flows.
- Passkey form autofill (Conditional Mediation).
- Verification of signed-in sessions during reauthentication.

### Passkey Management UI
- Listing, renaming, and deleting saved passkeys.
- Displaying rich passkey provider names and icons.
- Real-time management sync with the operating system via the Signal API (`signalAllAcceptedCredentials`, `signalCurrentUserDetails`).

## What's Not Included in These Skills

The skills provided in this repository do not cover features that strongly depend on your application's specific architecture or business logic, such as:

- Identity verification before creating a passkey.
- Sending security notifications to the user when a passkey is created.
- Passkey promotion after a password login (including cross-device flows).
- Signaling username and display name changes to the password manager.

## Tested Coding Agents

These skills have been tested and verified to work well with:
- Antigravity + Gemini 3.1 Pro
- Antigravity + Opus 4.6
- Claude Code + Opus 4.6

## Disclaimer

This skill set is designed to help AI coding agents implement passkeys that align with Google's best practices, reducing your development workload. However, it does not provide an exhaustive implementation of every security guideline. When deploying passkeys in a production environment, please thoroughly review [Google's passkey best practices](https://web.dev/articles/passkey-checklist) and ensure your application meets all necessary security standards.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.