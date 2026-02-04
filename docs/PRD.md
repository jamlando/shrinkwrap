# Product Requirements Document: Project Shrink Wrap (v1)

**Version:** 1.0 (v1 / MVP)  
**Status:** Final draft for development

---

## 1. Product overview

**Name:** Project Shrink Wrap (ShrinkWrap for brand/domain as needed)

**One-liner:** A unified AI workspace that eliminates context switching so work moves faster and gets better.

**Description:** Shrink Wrap is a single workspace that aggregates conversations and outputs from multiple AI tools (ChatGPT, Claude, Grok) into one continuous, transferable context. Users can create files/documents that capture chat history and export them in the format that each destination AI "digests" best, so moving context between tools doesn't require manual reformatting or copy-paste chaos. The product is inspired by the simplicity of tools like JSON Formatter—fast, clear, and focused on transfer. It targets non-technical users new to AI and small businesses (e.g., service/retail) running AI adoption initiatives.

**Landing page (hero)**
- Headline: "Stop fighting with context windows."
- Subtext: "ShrinkWrap aggregates your AI chats and snippets into a single, cohesive workspace. Eliminate context switching and make your workflow flow."
- CTAs: "Start Shrinking Context" and "See How It Works."

**Landing page (features carousel)**
- **Unified Workspace:** Keep all your chat logs, snippets, and notes in one organized project view.
- **AI Shrink Wrap:** Condense and format long chat logs into compact, usable context for your next prompt.
- **Context Portability:** Move context between ChatGPT, Claude, Grok (and later more tools) in the right format, without losing meaning.
- **Coding tool (future):** Cursor and other dev tools.

**Monetization:** Subscription model (e.g., ~$15/month for core access; tiers by usage/credits if needed; optional lifetime plans). Reference: galaxy.ai-style multi-tool subscription.

---

## 2. Problem statement

AI work is fragmented across tools, which causes context loss and wasted time. For non-technical users and small businesses, this shows up as: difficulty comparing outputs and perspectives across different AIs, manual copy-paste and reformatting, and no clear separation between personal and business use. Context doesn't travel with the user when they switch tools.

---

## 3. Solution

A single web workspace that aggregates AI chats into one continuous context and makes transfer between tools trivial. Mechanics:

- User signs up and logs in.
- User views and organizes content from multiple AI tools in one interface.
- User creates files/documents from chats and exports them in the format that each destination AI works best with (Shrink Wrap performs the format transition).
- Optional comparison (e.g., side-by-side) of different AI perspectives.
- Separation of personal vs. business workspaces.

---

## 4. Desired outcome

Better work, done faster, with fewer handoffs and less friction. Users get quick comparisons, preserved context, and a low-friction path from one AI to another—especially for non-tech users and small businesses adopting AI.

---

## 5. Platform strategy

- **v1 (MVP):** Web app only. All features and flows are designed for the browser.
- **Later (post–product-market fit):** Desktop app and browser extension. No implementation in v1; decision to start these is triggered by PMF criteria (see Success metrics).

---

## 6. Core value: format translation ("secret sauce")

Shrink Wrap's differentiator is **knowing what format each AI tool works best with** and **performing the transition** when moving content from one tool to another. Users do not need to manually reformat or guess; Shrink Wrap outputs "for ChatGPT," "for Claude," "for Grok," etc.

- **v1 scope:** ChatGPT, Grok, Claude.
- **Format matrix (TBD):** Document exactly which format(s) each tool prefers (e.g., plain text for quick prompts, structured markdown/JSON for longer context) and how we convert when moving A → B. To be validated with real usage and updated in-doc.

---

## 7. Target audience and market

- **Primary:** Non-technical users new to AI; small business owners and managers (e.g., Nashville, TN; Lexington, KY; Raleigh, NC) running AI adoption.
- **Pain points:** Context loss when switching tools, need to compare AI perspectives, need to separate personal vs. business AI use.
- **Competitive note:** A different "Shrink Wrap" exists (vibecoding.builders) focused on code/docs; we differentiate by focusing on **broad AI chat aggregation and format-aware transfer** for general and business users.

---

## 8. Target scenario (v1)

1. User signs up (email or OAuth).
2. User logs in and lands on dashboard.
3. User sees a unified workspace (projects/views) that can hold content from multiple AI tools.
4. User adds content (paste/import from ChatGPT, Claude, or Grok).
5. User generates a formatted document from one chat (with optional "AI Shrink Wrap" condensing).
6. User selects "Export for [Claude | ChatGPT | Grok]" (or copy) and gets output in that tool's best format; user pastes or imports into the other AI.
7. Optional: User uses side-by-side or comparison view for different AI outputs.
8. User can separate personal vs. business workspaces.

---

## 9. Key features (v1)

- **User management:** Sign up, log in, session persistence. Auth: email + Google/Apple (e.g., via Firebase).
- **Unified interface:** Dashboard and single workspace; multiple sources/threads in one place; personal vs. business separation.
- **Context aggregation:** Compile and store chat histories; optional side-by-side or comparison view for different AIs.
- **File/document generation:** Export chats as documents that include full prompts and responses; optional metadata (model, timestamps).
- **Format translation:** When user chooses "Export for [Tool]" or "Copy for [Tool]," output is in that tool's preferred format (format matrix TBD).
- **Transfer mechanism:** One-click copy or simple export; paste/import from external tools (v1 prioritizes paste/export over direct API to reduce ToS and integration risk).
- **AI Shrink Wrap (condense):** Automatically condense and format verbose chat logs into compact context for the next prompt.
- **Search (priority):** Search across aggregated chats (detailed design TBD).

**Explicitly out of scope for v1**
- Desktop app and browser extension.
- Cursor (or other IDE) as a first-class integration (can be "export for Cursor" in a later iteration).
- Gemini as a v1 destination (add in a follow-up release).
- Full "bring your own API key" integrations optional for v1; prioritize paste/export + format translation.

**Prioritized for next (post-MVP)**
- Version history for contexts.
- Basic collaboration/teams.
- Gemini (and other tools) and format matrix updates.

---

## 10. Technical requirements

- **Stack:** Frontend: React. Backend: Node.js. Database/auth/storage: Firebase (auth, storage, optional real-time).
- **Auth:** Google, Apple, email (Firebase).
- **AI integrations (v1):** Support transfer *to* ChatGPT, Claude, Grok via optimized export formats. Input: paste/import from user (and optional export from those tools if feasible). Optional: user-provided API keys or proxy for richer flows—only if MVP timeline allows.
- **User data:** Chats and context stored server-side; encryption; compliance with target markets (see Compliance).
- **Performance:** Support long chat histories (pagination/compression); responsive web (mobile-friendly dashboard).
- **Existing assets:** Commit hash `c9fa52118d47e15c27e2a0c878a2e3b3e33fe168` (verify in repo as starting point if applicable).

---

## 11. Compliance and user data (target markets)

- Treat chat content as personal data when identifiable.
- **Tennessee (TIPA, effective 2024):** Consumer rights (access, delete, opt-out), privacy notice, data minimization.
- **Kentucky (KCDPA, effective Jan 1, 2026):** Opt-out for sales/profiling; sensitive data handling.
- **North Carolina:** No comprehensive state law as of 2025; align with general US best practices (e.g., CCPA-like).
- Implement: privacy policy, consent, minimal collection, and rights fulfillment (e.g., delete/access).

---

## 12. Business and development plan

- **Resources:** Solo developer; goal is MVP as fast as possible for marketing, feedback, and sales validation.
- **Timeline:** MVP in ~1–2 months using Cursor for rapid iteration.
- **Risks:** API rate limits (caching where relevant); legal (privacy—compliance checklist); aggregation ethics (user-owned content only).
- **Validation:** Beta with small business networks in target cities; in-app surveys and feedback loops.
- **Success metrics:** Conversions (free → paid), retention, and "transfers/comparisons per session" as leading indicators. **PMF trigger for desktop/extension:** When success metrics (e.g., retention, revenue, NPS) meet a defined bar, revisit desktop and browser extension roadmap.
- **Gaps to close:** Final branding (name/logo); marketing plan (AI adoption communities in TN/KY/NC); legal (ToS, privacy policy template).

---

## 13. Open questions / TBD

- Final "format matrix": exact best format per tool (plain text, markdown, JSON, etc.) and conversion rules.
- v1 input method: paste-only vs. support for official export/import from ChatGPT, Claude, Grok where available.
- Exact PMF criteria (e.g., 30-day retention %, MRR, NPS threshold) for triggering desktop/extension work.
- Whether "bring your own API key" is in or out of v1 scope after MVP scope review.
