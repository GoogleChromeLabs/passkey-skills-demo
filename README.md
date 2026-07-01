# Passkey Agent Skills Demo

This repository provides a **demo environment** designed to help developers get started with implementing passkeys on the web using AI coding agents (like Antigravity or Claude Code) guided by the **Modern Web Guidance** passkey skills.

## What is Modern Web Guidance?

[Modern Web Guidance](https://goo.gle/modern-web-guidance) is a set of evergreen, expert-vetted skills designed to guide AI coding assistants. With the new passkey skills, you can implement registration, authentication, management, and reauthentication using the latest available APIs following Google's best practices. The AI agent handles the entire implementation autonomously, spanning both front-end UI and back-end logic.

Using passkey skills significantly improves the success rate of passkey implementations. In our evaluations using Claude Code:

| Metric | Without passkey skills | With passkey skills |
| :--- | :--- | :--- |
| **PASS** | 47 | **80** |
| **FAIL** | 32 | **0** |
| **N/A** | 12 | 11 |
| **Total** | 91 | 91 |

---

## Features & Capabilities Covered

When your AI agent implements passkeys using these skills, the following best practices are incorporated out-of-the-box:

* **Passkey Registration**: Proper database schema definition, frontend feature detection, and error handling.
* **Passkey Authentication & Reauthentication**: Passkey buttons, form autofill (Conditional Mediation), and verification of signed-in sessions.
* **Passkey Management UI**: Listing, renaming, and deleting saved passkeys, including displaying rich passkey provider names and icons.
* **Modern APIs & Capabilities**:
  * **`getClientCapabilities`**: For modern feature detection.
  * **JSON Serialization**: Direct serialization of encoded payloads using standard helper APIs.
  * **Signal API**: Automatic credential synchronization between the provider and your server (`signalAllAcceptedCredentials`, `signalCurrentUserDetails`).
  * **Conditional Create**: Automatically prompting to create passkeys for users who recently signed in with a password.

---

## How to Get Started

Follow these steps to set up the demo environment and test the passkey agent skills.

### 1. Set Up the Demo Environment

First, clone this repository and install the dependencies:

```bash
git clone git@github.com:agektmr/passkey-skills-demo.git
cd passkey-skills-demo
npm install
```

Build the frontend assets and start the local server:

```bash
npm run build
npm start
```

The web application will run at `http://localhost:8080`.

### 2. Install the Passkey Skills

Run the interactive setup wizard in the project directory to install Modern Web Guidance:

```bash
npx modern-web-guidance@latest install
```

This wizard places the required skill files in the `.agents/` directory, allowing your AI agent to recognize the passkey requirements.

> [!NOTE]
> **Claude Code Users:** If you are using Claude Code, you must create a symlink from `.agents` to `.claude` due to a [known issue](https://github.com/vercel-labs/skills/issues/744):
> ```bash
> ln -s .agents .claude
> ```

### 3. Instruct Your Agent

Start your AI coding agent (e.g., Antigravity, Claude Code) in the root of this project directory. You can prompt it to implement specific passkey features.

Try the following prompts:

1. **Passkey Registration:**
   > "Implement passkey registration at `/home` page"
2. **Passkey Management:**
   > "Implement passkey management UI at `/home` page"
3. **Passkey Authentication:**
   > "Implement passkey authentication at the top page `/`"
4. **Passkey Reauthentication:**
   > "Implement passkey reauthentication at `/reauth` page"

To verify that the agent's implementation aligns with all best practices, prompt it:
> "Evaluate my passkey implementation using the `evaluate-passkey-skills` skill."

> [!TIP]
> If your AI agent doesn't seem to pick up the passkey skills, try explicitly telling it to:
> *"use modern-web-guidance"*

---

## Server-Side Libraries and Skills

This repository includes a specialized skill for **SimpleWebAuthn** (located in `.agents/skills/simplewebauthn`), the recommended library for implementing passkeys in Node.js/TypeScript. 

AI coding agents often struggle to use the latest APIs of `@simplewebauthn/server`. This skill guides the agent to use correct, modern SimpleWebAuthn library APIs.

If you are using a different server-side language, we recommend integrating a language-specific passkey/FIDO2/WebAuthn library and providing a matching skill to guide your agent. We encourage library authors to write and distribute skills for their libraries so coding agents can always use the latest APIs correctly.

## What is Not Covered by These Skills

These skills focus on standard passkey operations. They do not cover features that heavily depend on your application's specific business logic, such as:
* Identity verification prior to passkey creation.
* Sending security notifications (e.g., emails) upon passkey registration.
* Promoting passkeys after a password login (including cross-device flows).
* Signaling username and display name updates to the password manager.

## Give Us Your Feedback

Modern Web Guidance and the passkey skills are currently in preview. If you have feedback, bug reports, or feature requests, please submit them to the [modern-web-guidance-src repository issues](https://github.com/GoogleChrome/modern-web-guidance-src/issues).

## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.