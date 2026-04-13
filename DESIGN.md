# Design Principles
## B2B in Germany · Strategic Research

> **North star:** Every design decision serves reading comprehension and reading efficiency.
> Form does not decorate. Form guides attention.

---

## 1 · Core Philosophy

### 1.1 The Reader Contract
This is an interactive research report, not a product landing page and not a presentation deck. The reader enters with intention—they want to learn, not be impressed. Design must honour that contract by:

- Delivering one clear insight per slide, with no ambiguity about what the key message is
- Never making the reader stop to figure out how to navigate
- Never competing for attention between decoration and content

### 1.2 One Slide = One Focus Point
Each content slide carries exactly one headline focus. Everything else on the slide—body text, charts, annotations—provides evidence or context for that focus. If a slide needs two headlines, it needs to be two slides.

A "focus point" is not necessarily a conclusion. It may be a finding, a pattern, a tension, or a well-scoped question whose answer the slide then develops. The slide must be clear on which it is.

For this deck, the preferred narrative unit is: one chapter question, one or two answer slides, then one summary slide. The reader should always know which question is currently being answered.

### 1.3 Cognitive Load Targets
| Zone | Max cognitive load |
|---|---|
| Headline (s-title) | ≤ 10 words |
| Body text | ≤ 3 sentences / ~65 words |
| Supporting detail (hover/secondary) | Unconstrained—reader initiates |
| Labels on interactive elements | ≤ 4 words |

### 1.4 Audience Profile
**Primary:** German IT industry professionals (engineers, architects, PMs, CTOs at mid-to-large enterprises). Characteristics:
- High tolerance for information density, low tolerance for vagueness
- Sceptical of marketing language; respond to precision
- Expect structured, hierarchical information
- Familiar with English; German technical terms are a signal of domain credibility, not a barrier

**Secondary:** Non-local PMs and founders researching the DACH market. Less domain knowledge; more reliant on structure to build mental model.

Design must serve both without compromising either. Hierarchy and structure serve the secondary audience; density and precision serve the primary.

### 1.5 Epistemic Posture
This research report is read by professionals who will act on its content—or reject it if it does not earn their trust. The German professional audience in particular applies a high standard of source scrutiny and is sensitive to overgeneralisation. Trust is lost faster than it is built.

The report must therefore maintain a clear and honest **epistemic posture**: the reader should always know whether a given statement is established fact, a synthesis from multiple sources, the author's interpretation, or a working hypothesis. These are different things and must not be conflated.

**The three claim tiers:**

| Tier | Meaning | Required treatment |
|---|---|---|
| **Empirical finding** | Directly supported by cited data from a named source | State the finding; cite source inline or in `text-note`; qualify scope precisely |
| **Synthesis / interpretation** | Derived by the author from multiple sources or observed patterns | Signal it: "The evidence suggests…", "Taken together, these data indicate…", "This analysis interprets…" |
| **Working hypothesis** | The author's model or prediction, not yet empirically validated | Label it explicitly: "Working hypothesis:", "This research proposes…", or with an `s-eyebrow` tag "Hypothesis" |

Tier misrepresentation—presenting an interpretation as a finding, or a hypothesis as established fact—is the most damaging credibility failure in research writing.

---

## 2 · Typography

### 2.1 Typefaces

| Role | Typeface | Weights used |
|---|---|---|
| Display, body, UI | IBM Plex Sans | 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold) |
| German terms, metadata, code-like labels | IBM Plex Mono | 400 (Regular), 500 (Medium), italic variants |

**No other typefaces.** Do not introduce a third typeface for any reason.

### 2.2 Type Scale

| Token | Size (clamp) | Weight | Usage |
|---|---|---|---|
| `s-eyebrow` | 10px (fixed) | 400, Mono | Chapter/section label above headline |
| `s-title` | clamp(22px, 3.6vw, 42px) | 300 | Slide headline / core assertion |
| `s-body` | clamp(13px, 1.3vw, 15px) | 400 | Evidence and context text |
| `.de` (German term) | Inherits context size | 500, Mono, italic | Inline German terminology |
| HUD chapter | 10.5px (fixed) | 400, Mono | Chapter name in header |
| HUD counter | 10px (fixed) | 400, Mono | Slide x / total |
| Nav item | 11px (fixed) | 400, Mono | Chapter nav list |
| Metadata / footnotes | 11–12px | 400, Mono | Source citations, notes |

### 2.3 Line Height & Spacing
- **Headline line-height:** 1.12–1.20 (tighter = more authoritative)
- **Body line-height:** 1.78–1.85 (generous—long-form reading comfort)
- **Mono labels line-height:** 1.4–1.5

### 2.4 Letter Spacing
- Eyebrows, HUD labels: `letter-spacing: 0.13–0.15em` (uppercase = needs tracking)
- Headlines: `letter-spacing: -0.025em` (large type = needs negative tracking)
- Body: default (0)
- Mono metadata: `0.05–0.08em`

### 2.5 Headline Weight Rationale
Headlines use **weight 300 (Light)**—not Bold. In a dark-background, high-contrast context, Light weight at large size reads as authoritative and precise. Bold at large size reads as aggressive and promotional. German IT professionals respond to the former.

### 2.6 German Term Treatment
German terms (`.de`) receive:
- `font-family: var(--mono)`
- `font-style: italic`
- `font-weight: 500`
- `color: var(--accent)` (current chapter accent color)

This achieves three goals: visually distinct within prose, signals domain specificity, and ties the term's visual identity to its chapter context. Do not use quotation marks, bold, or asterisks for German terms.

---

## 3 · Color System

### 3.1 Background Palette

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#090B10` | Base background (slide canvas, body) |
| `--bg-s` | `#0F1219` | Raised surface (cards, nav) |
| `--bg-e` | `#171C28` | Elevated surface (hover states) |
| `--bg-ov` | `#1E2334` | Overlay surface (active states) |

Never use pure black (`#000000`). The near-black `#090B10` reads as intentional; pure black reads as a default.

### 3.2 Text Hierarchy

| Token | Hex | Usage |
|---|---|---|
| `--t1` | `#EEF0F6` | Primary text (headlines, key values) |
| `--t2` | `#9AA0B8` | Secondary text (body, descriptions) |
| `--t3` | `#545C78` | Tertiary text (labels, captions, hints) |
| `--t4` | `#2C3248` | Disabled / decorative (watermarks, placeholders) |

### 3.3 Border

| Token | Value | Usage |
|---|---|---|
| `--bd` | `rgba(255,255,255,0.07)` | Default border (cards, HUD, controls) |
| `--bd-h` | `rgba(255,255,255,0.13)` | Hover border |

### 3.4 Chapter Accent Colors
Each chapter has one accent color. This color is set as `--accent` on `:root` when entering the chapter. All accent-dependent elements (eyebrows, `.de` terms, progress bar, active nav item, borders on focus) update automatically.

| Chapter | Color | Hex |
|---|---|---|
| Foreword | Slate | `#64748B` |
| 01 Research Framework | Blue | `#4F8EF7` |
| 02 Marktlandschaft | Green | `#34D399` |
| 03 Kaufprozess | Amber | `#FBBF24` |
| 04 Markteintrittsstrategie | Purple | `#A78BFA` |
| 05 Systemarchitektur | Orange | `#FB923C` |
| 06 Benutzererlebnis | Cyan | `#22D3EE` |

**Rules:**
- Never hardcode a chapter's accent color inside slide content. Always use `var(--accent)`.
- Do not add new accent colors without adding a corresponding chapter.
- Accent colors must meet WCAG AA contrast (≥ 4.5:1) against `--bg` for text use.

### 3.5 Color Usage Rules
- **Never use color to convey meaning alone** (accessibility). Always pair color with shape, label, or position.
- Accent color is used sparingly: eyebrow labels, German terms, active states, progress bar. It is not a background fill color.
- Do not use red/green as semantic opposites (color-blind accessibility).
- Background fills on cards use `--bg-s`, not accent colors.

---

## 4 · Layout

### 4.1 Structural Zones

```
┌─────────────────────────────────┐  ← HUD: 52px fixed top
│  Chapter label          x / N  │
├─────────────────────────────────┤
│                                 │
│           SLIDE CANVAS          │  ← flex fills remaining height
│                                 │
├─────────────────────────────────┤
│  ← ─────────────────── →       │  ← Controls: 54px fixed bottom
└─────────────────────────────────┘
```

### 4.2 Slide Padding

| Breakpoint | Horizontal padding | Vertical padding |
|---|---|---|
| Desktop (> 768px) | 60px | 44–52px |
| Tablet (768px) | 24px | 36–44px |
| Mobile (< 480px) | 20px | 28px |

### 4.3 Content Max-Width
Long-form text (body, subtitle) must be constrained:
- **Body text:** max-width `600px`
- **Slide headline:** max-width `680px`
- **Cover title:** max-width `720px`
- **Two-column grids:** max-width `640px` total

These constraints exist because line lengths over ~75 characters significantly impair reading speed. On large monitors, unconstrained text creates very long lines that break reading rhythm.

### 4.4 Slide Content Layout Patterns

Each slide type uses one of these vertical compositions:

**A · Bottom-anchored (Cover)**
Meta → Title → Subtitle → Rule → Author. Content sits near the bottom, watermark fills top-right. Creates a "cover page" feel.

**B · Centered column (Foreword, Text Focus)**
Eyebrow → Title → Primary content → Secondary content. Vertically centered in the slide. Most common pattern.

**C · Centered with large decorative number (Chapter Cover)**
Ghosted chapter number fills top-right. Tag → Title → Subtitle. Announces a new major section.

**D · Header + interactive body (Flowchart, Charts)**
Eyebrow + Title at top. Interactive element fills remaining space. Detail panel at bottom. Fixed header, flexible body.

**E · Chapter question + research chain (Chapter Intro)**
Tag → Question headline → Subtitle → three-step research chain. Used at the start of each chapter to declare the investigation logic before the evidence appears.

**F · Compressed answer grid (Proof / Summary)**
Eyebrow → Headline → Intro sentence → three structured cards. Used when a question needs a precise, hierarchical answer rather than a freeform paragraph.

### 4.5 Vertical Rhythm
Spacing between zones within a slide:

| Gap | Size |
|---|---|
| Eyebrow → Headline | 8–10px |
| Headline → Primary content | 20–28px |
| Content block → Content block | 22–28px |
| Last content → Bottom of slide | ≥ 32px (breathing room) |

---

## 5 · Slide Types

### 5.1 Type Inventory

| Type | Purpose | When to use |
|---|---|---|
| `cover` | Document entry point | Once, always first |
| `framing-grid` | Structured foreword / context setting | When the content should be organised, not shown as a text wall |
| `chapter-intro` | Chapter opener with question + research chain | Once per major chapter |
| `chapter-cover` | Section transition | Legacy pattern; avoid for new work unless only a transition is needed |
| `foreword` | Narrative opening | Once, after cover |
| `text-focus` | Methodology, explanation, argument | When the insight is purely textual |
| `flowchart` | Logical relationships, frameworks | When showing how elements connect |
| `proof-cards` | One research question answered through structured arguments | When hierarchy matters more than interaction |
| `summary-grid` | Chapter close with compressed findings | End of every major chapter |
| *(planned)* `stat` | Single striking data point | When one number carries the chapter |
| *(planned)* `comparison` | Side-by-side contrast | A vs B comparisons |
| *(planned)* `quote` | Expert citation, key statement | To anchor a section in external authority |
| *(planned)* `chart` | Data visualization | Quantitative market data |
| *(planned)* `list` | Structured enumeration | Checklists, criteria, step sequences |

### 5.2 Chapter Cover Rules
- Used **only** for major chapter transitions (numbered chapters 01–06 + Foreword)
- Must show: chapter number (watermark), chapter tag, chapter title, chapter subtitle
- Title should be 1–3 words; let the subtitle carry explanation
- The bottom accent bar is the only use of full-width accent color in the entire design

### 5.3 Text-Focus Rules
- **Headline must be a specific focus, not a vague topic label.** Vague: "Market Landscape". Better: "German B2B software procurement is structurally resistant to first-mover disruption." But also acceptable, when the data only supports it: "Available data suggests that procurement cycles in the German mid-market exceed 9 months on average."
- **Scope before claim.** A headline that applies only to DAX-listed companies must say so. A headline drawn from 2023 data must not be presented as timeless. Precision of scope is not weakness—it is credibility.
- Body text provides the evidence chain behind the headline: source → finding → implication, in that order.
- The `text-note` component (`※`) is for source attribution, methodological caveats, and scope limitations. It is not a continuation of body text.

### 5.4 Interactive Slide Rules
- Interactive elements (flowchart nodes, chart data points) must have a **resting state** that is already informative—hover reveals detail, but the slide is not empty without interaction
- Detail revealed on hover must be placed in a **stable location** (the `fc-detail` panel at the bottom), never as floating tooltips that obscure content
- On mobile, hover interactions are replaced with tap-to-reveal

---

## 6 · Navigation & Interaction

### 6.1 Navigation Hierarchy
1. **Keyboard:** `→` / `Space` (next), `←` / `Shift+Space` (prev), `↑↓` also work, `Esc` closes nav
2. **Touch:** Swipe left/right (≥48px displacement, horizontal must exceed vertical)
3. **Click:** Bottom prev/next buttons
4. **Jump:** Chapter nav (hamburger menu) for non-linear navigation

### 6.2 Transition
Outgoing slide: `opacity → 0`, `translateY → -18px` (exits upward)
Incoming slide: enters from `translateY: +18px`, settles to `0` with `opacity → 1`
Duration: 380ms, `cubic-bezier(0.4, 0, 0.2, 1)`

**No slide-specific entry animations for content elements.** The slide itself fades in; individual elements do not stagger. Staggered element animations add perceived delay to information delivery, which conflicts with reading efficiency.

### 6.3 Transition Guard
A `busy` lock prevents queuing multiple transitions. During transition (~420ms), nav inputs are ignored. This prevents slide-skipping on rapid keyboard input.

### 6.4 HUD Behaviour
- HUD always visible; never hidden or auto-collapsed
- Chapter label updates to match the current slide's chapter
- `--accent` on `:root` updates when chapter changes (drives all accent-coloured elements simultaneously)
- Language toggle (`EN ↔ DE`) triggers full re-render; current slide position is preserved

### 6.5 Chapter Navigation Panel
- Opens from the right edge; overlayed by semi-transparent backdrop
- Closed by: clicking backdrop, clicking a chapter item, pressing `Esc`
- Shows only chapter-level entries (not individual slides within a chapter)
- Active chapter is highlighted with its accent color

---

## 7 · Data Visualizations (Future)

When charts and graphs are introduced, the following rules apply:

### 7.1 Principles
- **Every chart must have a scoped headline.** The chart title is not a decorative label ("Market Share by Segment") and is not a rhetorical conclusion that the data may not fully support. It is the most accurate and specific summary statement the data permits. "SAP and Microsoft hold a combined 41% of the German ERP market (Lünendonk 2023)" is correct. "Two vendors dominate the market" is not—unless the data definitively shows dominance.
- **Source every chart.** Data source and year appear either in the chart subtitle or in a `text-note` below. Unsourced quantitative charts are not acceptable.
- **Minimize chart junk.** No 3D effects, gradient fills, drop shadows, or decorative borders on data elements.
- **Grid lines:** subtle (`--bd`), horizontal only unless both axes are required.
- **Axes:** labels use `--mono` at 11px; tick marks are optional and minimal.

### 7.2 Color in Charts
- Use chapter accent color as the primary data color
- Secondary data series: `--t3` or a desaturated variant of the accent
- Never use more than 3 colors in a single chart
- Highlight (one data point) may use `--t1` (white) for contrast

### 7.3 Interactivity
- Hover on data points reveals value + label in the stable detail panel (same pattern as flowchart)
- No animated chart transitions on slide entry (reduces load time; respects users who prefer reduced motion)

---

## 8 · Accessibility

### 8.1 Minimum Requirements
- All interactive elements (nodes, buttons) have `role`, `tabindex`, and `aria-label`
- Keyboard navigation covers all interactive elements
- Color contrast: text on background ≥ 4.5:1 (WCAG AA) for body text; ≥ 3:1 for large text (≥18px)
- No information conveyed by color alone

### 8.2 Motion
- Slide transitions respect `prefers-reduced-motion` (to be implemented):
  ```css
  @media (prefers-reduced-motion: reduce) {
    .slide { transition: opacity 0.15s; transform: none; }
  }
  ```

### 8.3 Language
- `<html lang>` attribute is updated when language is toggled (`en` or `de`)
- German terms are not marked with `lang="de"` inline (screen reader impact negligible; marking every inline term creates noise)

---

## 9 · Content & Copy Rules

### 9.1 Headline Writing

**The job of a headline is clarity, not persuasion.** This is a research report, not a pitch deck. The reader's trust is built through precision and honest qualification, not through confident-sounding declarations.

**Scope before magnitude.** Every claim has a boundary. State that boundary in the headline or in the first sentence of body text. The boundaries that matter: industry segment, company size tier, time period, geographic scope, data source.

| Pattern | Wrong | Right |
|---|---|---|
| Overgeneralisation | "German companies distrust cloud" | "Among German enterprises >1,000 employees, 67% cite data residency as a primary procurement criterion (Bitkom 2023)" |
| Missing time scope | "SAP dominates the ERP market" | "As of 2023, SAP holds approximately 37% of the German ERP market by revenue (Lünendonk)" |
| Causation from correlation | "Compliance requirements stall sales cycles" | "Sales cycles are longer where compliance requirements are more complex—the causal direction warrants further study" |
| Unmarked interpretation | "German buyers are fundamentally risk-averse" | "The procurement data is consistent with high risk-aversion; cultural factors likely contribute, but are not directly measured here" |

**Question headlines are permitted** when the slide develops both sides of a genuine tension and does not force a conclusion the evidence cannot support. Prohibited: rhetorical questions where the answer is obviously implied. Permitted: genuine open questions that frame a comparative analysis.

**Numbers strengthen headlines when correctly scoped.** An unattributed percentage is worse than no number. Always: number + source + year + scope.

### 9.2 Body Text
- Maximum 3 sentences per body text block
- Sentence 1: the evidence basis (what the data shows, where it comes from)
- Sentence 2: the mechanism or context (why this pattern exists)
- Sentence 3: implication or acknowledged limitation (optional)
- Avoid parenthetical asides—move them to a `text-note` or restructure the sentence

### 9.3 German Terms
- Introduce a German term the first time it appears in a chapter with its English translation in the same sentence: "the specification document (*Lastenheft*) defines..."
- On subsequent slides within the same chapter, the German term may stand alone—it has been established
- Do not use German terms decoratively; only when the German term carries precision or connotation that the English translation loses

### 9.4 Source Citations
- Use the `text-note` component (the `※` box) for source attribution
- Format: `Bitkom Digital-Index 2024, p. 14` — institution, publication, year, page if applicable
- A citation must appear on the same slide as the claim it supports, not in a separate bibliography
- When a claim draws on multiple sources, list all of them: `Bitkom 2024; KfW Research 2023`
- When no primary source is available, the claim must be explicitly labelled: `[Author's synthesis from secondary sources]`
- When a stable public source URL exists, make the citation clickable so the reader can jump to the source directly

### 9.5 Claim Calibration

**Hedging is not weakness.** In German professional communication, appropriate qualification signals intellectual rigour. Overconfident claims trigger scepticism; calibrated claims build trust.

**Required hedges by situation:**

| Situation | Required hedge |
|---|---|
| Data from a single source | "According to [source]…" — not presented as universal |
| Data older than 3 years | "As of [year]…" with acknowledgment that the landscape may have shifted |
| Small or non-representative sample | "In a limited sample of N cases…" |
| Author's interpretive leap | "This research interprets this pattern as…" |
| Claim that has known counterexamples | Acknowledge the counterexample; explain why the general pattern holds despite it |
| Prediction or recommendation | "Based on the available evidence, this analysis suggests…" — not stated as fact |

**Counterexample acknowledgment is mandatory** when a credible counterexample exists. Ignoring known contradictions damages credibility more than any other single failure. The acknowledgment does not have to be prominent—a clause in the body text is sufficient—but it must be present.

---

## 10 · Anti-Patterns (Do Not Do)

### Visual / Layout
| Anti-pattern | Reason |
|---|---|
| Two headlines on one slide | Splits attention; split into two slides |
| Body text over 65 words | Exceeds comfortable reading zone for a single slide |
| Decorative illustrations | Compete with content without adding information |
| Tooltip popovers for interactive data | Unstable position; obscures surrounding content |
| Bold text for emphasis within body | Use sentence structure for emphasis; bold in body reads as a broken list |
| Full-page background images | Reduce legibility; conflict with dark color system |
| Third typeface | IBM Plex Sans + Mono is sufficient for all use cases |
| Hardcoded accent colors in slide content | Breaks chapter-color system; always use `var(--accent)` |
| Animated entrance per-element | Adds perceived delay; the slide-level fade is sufficient |
| Horizontal text scrolling | Never acceptable on any breakpoint |
| Centered long-form body text | Left-align only for body text over 2 lines |

### Epistemic / Copy
| Anti-pattern | Reason |
|---|---|
| Unscoped universal claim ("German companies always…") | No market is monolithic; the claim is untrue and unverifiable |
| Unattributed statistic | Unsourced numbers are indistinguishable from made-up numbers to a sceptical reader |
| Interpretation presented as empirical finding | Tier misrepresentation; destroys credibility when noticed |
| Causal claim from correlational data | "X causes Y" requires more than co-occurrence; use "X is associated with Y" or "X may contribute to Y" |
| Ignoring known counterexamples | Signals motivated reasoning; acknowledge and address them |
| Recommendation stated as fact | "You must do X" is a prescription, not a finding; signal it as such |
| "Always" / "never" without qualification | Absolute language rarely survives contact with evidence; qualify |
| Data older than 3 years presented without date | German IT market evolves; stale data without dating is misleading |
| Rhetorical question headline with obvious implied answer | Manipulative framing; state the finding directly or ask a genuine open question |
