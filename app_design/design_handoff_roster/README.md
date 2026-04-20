# Handoff: Roster — Job Application Tracker (iOS)

## Overview
Roster is a mobile-first job application tracker. Users sign up, set job-search goals, then save roles from a company directory, track their pipeline, schedule interviews, rank their interest, and keep structured prep/debrief notes for each application.

The product fits into a lightweight, calm, editorial-feeling category — **not** a Notion/Airtable-style power tool and **not** a LinkedIn-style social network. Closer to Arc/Linear/Readwise in tone: earthy, warm, typographically considered.

## About the Design Files
The files bundled here are **design references created in HTML** — high-fidelity prototypes showing intended look, flow, state, and copy. **Do not ship the HTML directly.** The implementation task is to **recreate these designs in a real app environment** — most naturally **React Native** or **SwiftUI** given the iOS framing — using that environment's navigation primitives, styling system, and component library. If no environment exists yet, React Native (Expo) is the recommended starting point.

Treat the HTML as the single source of truth for visuals, copy, spacing, and interactions. Treat React specifics (inline styles, hand-rolled components) as illustrative, not prescriptive.

## Fidelity
**High-fidelity.** Final palette, typography, spacing scale, microcopy, motion, empty states, and interactions are all decided. Recreate pixel-accurately using the target platform's native components where possible (e.g. native date/time pickers, segmented controls, modal sheets). Deviate only where native platform conventions produce a better result than the HTML prototype.

## Screens / Views

The app has **13 screens** in two phases: **Onboarding (7)** and **Tracking (6)**. Screens are indexed with 2-digit labels matching the prototype (`01 Welcome`, `02 Email`, …, `13 Calendar`).

### Phase 1 — Onboarding

#### 01 Welcome
- **Purpose:** First-launch splash. Sell the product in one line. Two CTAs: Get started / I have an account.
- **Layout:** Full-bleed warm off-white. Wordmark top-center. Hero serif headline, short sans subtitle below. Primary button + secondary text button pinned to bottom with safe-area padding.
- **Copy:** Headline emphasizes *"Track every application. Never forget a follow-up."* (paraphrase from file — use exact copy from `Roster Signup Flow.html`).

#### 02 Email
- **Purpose:** Capture email to send a verification code.
- **Layout:** Back chevron + "Step 1 of 5" in top bar. Serif title "What's your email?". Single email input, large, with a soft underline. Primary button "Send code" disabled until valid email.

#### 03 Verify
- **Purpose:** Enter 6-digit code emailed to the user.
- **Layout:** 6 separate digit boxes, mono font, auto-advance on type. Resend link below. Primary button "Verify" becomes active when all 6 digits entered.

#### 04 Profile
- **Purpose:** Name + current role/title.
- **Layout:** Two stacked inputs. Freeform for both. Title field offers soft suggestions as chips (e.g. "Product designer", "Engineer", "PM").

#### 05 Goals
- **Purpose:** Multi-select goals that shape notifications + defaults.
- **Layout:** Grid of selectable pill cards (Full-time, Part-time, Remote, Contract, Exploring). Multi-select. Visual "selected" state: ink-filled card with canvas-colored text.

#### 06 Notifications
- **Purpose:** Ask for push permission with context before the OS prompt.
- **Layout:** Illustration/placeholder top, serif title, short body explaining *why* notifications matter (follow-up reminders, interview prep). Two buttons: Allow / Skip.

#### 07 Done
- **Purpose:** Celebratory hand-off to the tracker.
- **Layout:** Large serif name ("Welcome, Jamie."), short copy, primary "Add your first application".

### Phase 2 — Tracking

#### 08 Company search
- **Purpose:** Find a company by name. Live-filter a seeded list.
- **Layout:** Sticky search input at top. Results list below — each row shows company name, domain, kind descriptor ("Product design · 120 people"), and a color-tinted initial tile on the left. Empty state offers "Add a company not listed".

#### 09 Role picker
- **Purpose:** Pick an open role at the selected company.
- **Layout:** Company header (tile + name + kind). List of open roles; each row shows title, a salary line in italic terra accent (if present), a type pill ("Full-time"), location, and a "posted X ago" timestamp. Dashed-outline "+" row at bottom: "Add a role not listed".

#### 10 Details (before saving)
- **Purpose:** Configure the application before it hits the tracker.
- **Sections (top to bottom):**
  1. **Role summary card** — title, company, italic terra salary line
  2. **Status** — 2×2 grid: Saved / Applied / Screen / Onsite. Selected state = ink-filled pill with canvas text + colored dot.
  3. **My interest** — 5 star-shaped buttons in a bordered card. Filled stars use `clay`. Label on the right reflects current value ("Not rated" / "Low" / "Mild" / "Solid" / "High" / "Top pick"). Click a filled star to clear.
  4. **Interview scheduled** — card with calendar glyph, native date input, native time input, and "Clear" action when populated.
  5. **Remind me to follow up** — radio list: In 7 days / In 14 days / Custom date / No reminder.
- **Primary CTA:** "Add to tracker" → returns to `11 Tracker` with the new application animated in.

#### 11 Tracker (home)
- **Purpose:** Main surface. List of applications with quick status, prep completion, interview date, rank.
- **Layout:**
  - Greeting ("Good morning, Jamie.")
  - Small counters row: applications count, interviews this week.
  - Action row: **Add application** (primary) + **Calendar** (secondary icon button).
  - Applications list — each card shows:
    - Company tile + name
    - Role title (serif)
    - Italic terra salary line (if present)
    - Row of 5 small stars if `rank > 0`
    - Status pill (colored dot + label)
    - "Follow up in 7 days" chip (if follow-up set)
    - "Interview Mon Nov 3 · 14:30" chip in soft sand background with terra text (if `interviewAt` set)
    - Prep completion "x/8 sections" tappable chip that opens `12 Prep notes`
  - Newly-added cards animate in with a brief highlight (2.4s).

#### 12 Prep notes
- **Purpose:** Structured notes per application, split Before / After the interview.
- **Layout:**
  - Back chevron + role title in top bar.
  - **Segmented toggle:** Before / After. Each side has its own 4 sections + its own completion counter.
  - **Before sections:** Why this company · STAR stories · Questions to ask · Salary & logistics.
  - **After sections:** Debrief · Their answers · Follow-up to send · Self-reflection.
  - Each section is an accordion. Tapping expands to reveal a textarea plus a "Use template" starter button that prefills a scaffold the user can edit.
  - Autosaves on every keystroke (debounce ~400ms). No explicit Save button; "Done" in top-right dismisses.

#### 13 Calendar
- **Purpose:** See all upcoming interviews across applications.
- **Layout:**
  - Header counter: "N upcoming".
  - Month grid with prev/next chevrons. Today's cell is ink-filled. Days with interviews show up to 3 clay-colored dots under the number.
  - "Upcoming" list below grid — each row has a terra-tinted date tile (month short + day numeral in serif) on the left, role title + company + time on the right. Tapping routes to that application's prep notes.
  - Empty state: dashed-border card "No interviews scheduled".

## Interactions & Behavior

- **Navigation:** Stack-based. The prototype uses a numeric `stage` state (0–12) — in production, use the platform's navigator (React Navigation stack, SwiftUI `NavigationStack`).
- **Onboarding is linear**; tracking is a hub-and-spoke from screen 11.
- **Add application flow:** 11 → 08 → 09 → 10 → 11 (with new card highlighted for 2.4s).
- **From tracker card:** tap prep-count chip → 12; tap calendar icon → 13.
- **From calendar row:** tap row → 12 for that app.
- **Animations:**
  - New card enter: fade + slide-up 240ms ease-out, highlight background held 2.4s then fades.
  - Screen transitions: platform default (push/pop slide).
  - Button press: scale(0.98) 80ms.
  - Segmented toggle: background slides between halves 180ms ease.
  - Accordion expand: height + opacity 200ms ease.
- **Form validation:**
  - Email: standard regex, validate on blur.
  - Verify: enable Verify button only when 6 digits are entered.
  - Profile name: min 1 char.
- **Empty states:**
  - Tracker with zero apps → large serif "No applications yet" + inline CTA.
  - Calendar with zero scheduled → dashed-border card.
  - Prep section empty → "Use template" starter is the primary affordance.
- **Autosave:** Prep notes, rank, interview datetime, status, follow-up all persist immediately.
- **Haptics (native only):** Light impact on status/rank selection and on card-added success.

## State Management

Needed state (per-user, persisted server-side):

```
User
  id, email, name, title, goals: string[]
  notificationsEnabled: bool

Application
  id
  company: { id, name, domain, kind, color }
  role:    { id, title, loc, type, posted, salary? }
  status:  'saved' | 'applied' | 'screen' | 'onsite'
  followUp: '7d' | '14d' | 'custom' | 'none'  (+ customDate?)
  rank: 0 | 1 | 2 | 3 | 4 | 5
  interviewAt: { date: 'YYYY-MM-DD', time: 'HH:mm' } | null
  notes: {
    before: { why, star, questions, salary }      // strings
    after:  { debrief, answers, followup, reflection }
  }
  createdAt, updatedAt
```

Derived:
- `prepCompletion` = count of non-empty strings across both `notes.before` and `notes.after` (0–8).
- Calendar upcoming = `applications.filter(a => a.interviewAt?.date >= today).sort(byDatetime)`.

Transitions:
- `commitApp()` — creates Application, resets wizard state, routes to tracker, flags `isNew: true` for 2.4s.
- `openPrep(appId)` — sets `activeAppId`, routes to 12.
- `openCalendar()` — routes to 13.

Data fetching:
- Company + role directory: paginated GET, server-side search by query prefix.
- Applications: GET on load, mutations via PATCH.
- Push notifications: scheduled server-side from `followUp` + `interviewAt`.

## Design Tokens

### Colors (OKLCH; hex approximations for platforms without OKLCH support)

| Token     | OKLCH                         | Hex ~     | Use                                    |
|-----------|-------------------------------|-----------|----------------------------------------|
| `canvas`  | `oklch(0.97 0.01 75)`         | `#F6F2EA` | App background                         |
| `paper`   | `oklch(0.99 0.005 80)`        | `#FBF8F2` | Card / surface                         |
| `ink`     | `oklch(0.22 0.015 60)`        | `#2A1F16` | Primary text                           |
| `ink2`    | `oklch(0.45 0.015 60)`        | `#655A4E` | Secondary text                         |
| `ink3`    | `oklch(0.62 0.01 60)`         | `#948A7F` | Tertiary / meta                        |
| `sand`    | `oklch(0.92 0.018 75)`        | `#E9E0D0` | Chip bg, date tile                     |
| `sand2`   | `oklch(0.88 0.022 75)`        | `#DDD2BE` | Card borders (warm)                    |
| `clay`    | `oklch(0.58 0.095 45)`        | `#B4643E` | Primary accent (buttons, rank stars)   |
| `clayDk`  | `oklch(0.48 0.09 45)`         | `#904E2E` | Pressed primary                        |
| `moss`    | `oklch(0.52 0.055 140)`       | `#5E7A58` | "Screen" status dot                    |
| `terra`   | `oklch(0.48 0.085 35)`        | `#8F4A2E` | Salary text, interview chip text       |
| `line`    | `oklch(0.86 0.015 75)`        | `#D8D0C0` | Borders, dividers                      |

### Typography

- **Serif (display):** `Newsreader`, fallback Georgia.
  - Use for screen titles, role titles, card headings, greeting, salary line.
  - Sizes: 32 (hero), 22 (screen title), 17–19 (card title), 15–16 (secondary).
  - Letter-spacing: `-0.3` to `-0.7` at larger sizes.
- **Sans (body + UI):** `Inter`, weights 400/500/600.
  - Sizes: 11.5 (meta), 12–13 (secondary body), 14–15 (body), 14.5 (button).
- **Mono (labels):** `JetBrains Mono`, weight 400–500.
  - Use for section eyebrow labels. ALL CAPS, 10.5px, letter-spacing 1.2.

### Spacing scale

4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 36, 44.

### Radius

- Small chip: 8
- Card / button: 10–14
- Full pill: 999

### Shadows

Prototype keeps shadows minimal — borders do most of the work. For native:
- Card: `0 1px 2px rgba(42,31,22,0.04)` on paper surfaces.
- Modal/sheet: platform default.

### Motion

- Fast: 80–160ms (button press, hover)
- Standard: 200ms (accordion, toggle)
- Entrance: 240ms (new card)
- Highlight hold: 2400ms (new application pulse)

## Assets

- **Fonts:** Google Fonts — Newsreader (ital 0;1, opsz 6..72, wght 400/500/600), Inter (400/500/600), JetBrains Mono (400/500). Swap to platform equivalents on iOS (SF Pro for sans; Newsreader ships in Google Fonts — bundle in-app).
- **Icons:** All icons are inline SVG strokes (1.3–1.8 stroke width), matching the sparse editorial vocabulary. Recreate with SF Symbols on iOS or any stroke-icon library (Phosphor, Lucide) — keep weight light.
- **Illustrations:** None. Placeholder tiles use initials on a tinted background derived from `company.color`.
- **No Anthropic brand assets used.** This is a standalone consumer product identity.

## Files included in this bundle

- `Roster Signup Flow.html` — main prototype, design-canvas with every screen + interactive iOS phone at 402×874.
- `components/roster-screens.jsx` — all 13 screens as React components; source of truth for layout, copy, and styling.
- `components/ios-frame.jsx` — iOS device bezel + status bar used in the canvas.
- `components/design-canvas.jsx` — the presentation canvas (scaffolding only — **not** part of the product).

To run the prototype locally: open `Roster Signup Flow.html` in a browser.

## Out of scope for this handoff

- Backend API contract — define alongside implementation.
- Auth provider (Magic link, OAuth) — product choice, not designed.
- Company/role data source — prototype uses seeded fixtures.
- Android visual parity — design is iOS-first; adapt spacing/typography to Material where needed.
