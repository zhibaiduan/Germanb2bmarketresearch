# B2B in Germany · Research Slide System (V2)

---

## 1. System Philosophy（系统哲学）

This is not a slide template system.  
This is a **cognitive communication system**.

The goal is not consistency of layout.  
The goal is **clarity of thinking**.

---

### Core Principle

> Every slide exists to move the reader's understanding forward.

If a slide does not change the reader's understanding, it should not exist.

---

## 2. Three-Layer Architecture（三层结构）

All content must be understood as three distinct layers:

```text
Research → Narrative → Slides
```

---

### 2.1 Research（研究层）

- Raw data, sources, observations
- Not directly exposed to the reader
- Must be:
  - Scoped (who / where / when)
  - Verifiable

---

### 2.2 Narrative（叙事层）

- Defines:
  - What question is being asked
  - Why it matters
  - How answers connect

Narrative is the **backbone of the report**.

---

### 2.3 Slides（表达层）

- Slides are **rendering units**
- They do NOT define logic
- They express pre-defined narrative steps

---

## 3. Slide as Cognitive Unit（核心定义）

Each slide is a **cognitive unit**, not a layout block.

---

### Required Definition (before creating any slide)

```js
{
  intent: "raise | answer | synthesize",
  question: "...",
  answer: "...",        // optional if intent = raise
  evidence: "...",      // optional
  structure: "comparison | causation | system | sequence | narrative"
}
```

---

### Intent Types

| Intent | Function |
|--------|----------|
| raise | Introduce a question, tension, or investigation path |
| answer | Resolve a specific question or sub-question |
| synthesize | Compress multiple insights into a clear takeaway |

---

## 4. Chapter Structure（章节结构）

Each chapter must follow a **logical arc**, not a fixed template.

---

### Required Flow

1. **Chapter Entry (raise)**
   - Defines the core question
   - Shows the investigation path

2. **Investigation (answer)**
   - 1–N slides
   - Each slide answers one question or one tightly linked sub-question

3. **Synthesis (synthesize)**
   - Compresses:
     - 2–4 findings
     - 1 takeaway

---

### Key Rule

> The number of slides is determined by the logic, not by a template.

---

## 5. Content Rules（内容规则）

---

### 5.1 One Slide = One Cognitive Step

Each slide must do one of the following:

- Raise a question
- Answer a question
- Synthesize insights

If it tries to do more than one major cognitive job, split the slide.

---

### 5.2 Headline Rules

- Prefer 10 words or fewer
- Must be either:
  - a real question, or
  - a precise answer
- Avoid vague topic labels
- Avoid inflated conclusions

---

### 5.3 Body Structure (when applicable)

Use this order when presenting reasoning:

```text
Evidence → Mechanism → Implication
```

This is a guideline, not a mandatory template.

Use it when it improves clarity. Do not force it onto framing or transition slides.

---

## 6. Evidence & Claims（论证规则）

---

### 6.1 Three Claim Types (must distinguish)

| Type | Requirement |
|------|-------------|
| Empirical | Must include source, year, and scope |
| Synthesis | Must be signaled as interpretation |
| Hypothesis | Must be explicitly labeled as a working hypothesis |

---

### 6.2 Source Usage Rule

Sources are **semantic**, not structural.

A slide does **not** need a source block just because it is a slide.

---

### Include source only if:

- A factual claim is made
- Data, statistics, rankings, or market observations are used
- A conclusion depends on a specific external source

---

### Do not include source if:

- The slide is framing a question
- The slide is a transition
- The content is purely structural
- The slide only explains the narrative path

---

### 6.3 Claim Integrity Checklist

Before writing any claim, check:

- What is the scope?  
  (segment, company size, geography, time period)
- What is the source?
- Is this empirical, synthesis, or hypothesis?
- Are there known counterexamples worth acknowledging?
- Is the correct relationship "causes" or only "is associated with"?

Default to the weaker claim unless causation is clearly established.

---

## 7. Takeaway Usage（Takeaway 规则）

Takeaway is not mandatory.

It is a compression tool, not a required module.

---

### Use takeaway only when:

- The reasoning is complex
- Several points need to be compressed
- The reader benefits from a clear landing point

---

### Do not use takeaway when:

- The slide is exploratory
- The slide only introduces a question
- The slide is already simple and self-evident

---

## 8. Visualization Principle（可视化原则）

---

### Core Rule

> Form follows cognitive structure.

Choose visual form only after identifying the internal logic of the content.

---

### Mapping Guide

| Content Logic | Suitable Form |
|---------------|---------------|
| comparison | Side-by-side layout |
| causation | Arrows / flow |
| system | Network / map / layered structure |
| sequence | Steps / staged progression |
| tension | Opposing blocks / contrasted positions |
| hierarchy | Nested grouping / ranked cards |

---

### Failure Condition

If a visual requires explanation before it can be read, it has failed.

If simple text communicates the idea more clearly, use text.

---

## 9. Slide Types（实现层）

Slide types are **rendering tools**, not thinking tools.

They should serve the narrative, not define it.

---

### Never choose a slide type first. Always define the slide's intent first.

---

### Types currently implemented in the codebase

```
index.html          Shell (HUD, deck, controls)
css/style.css       Design system — all visual rules
js/content.js       Slide data: CHAPTERS, SLIDES, CONTENT (en + de)
js/app.js           Slide engine: rendering, navigation, interactivity
```

Available types (add to `SLIDES` in `content.js`, render via `app.js`):

- `cover` — document cover (use only once)
- `minimal-arrow` — section opener with large label + thin arrow note
- `observation-wall` — scattered field-note cards for raw observations
- `turning-point` — large statement + evidence strip (rhetorical pivot)
- `constraint-clusters` — asymmetric grid, one featured item + stacked secondary
- `logic-shift` — source label → large target (mechanism / causation)
- `transition-chain` — linear chain or cascade (1→N) for synthesis
- `framing-grid` — structured foreword without stacked paragraphs
- `chapter-intro` — section opener with question + research chain
- `foreword` — narrative opening
- `text-focus` — text-only insight slide
- `flowchart` — logical relationship diagram
- `proof-cards` — one question answered through 3 structured arguments
- `summary-grid` — chapter close with compressed findings
- `demand-orbit` — radial demand map
- `metric-strip` — data / metric display
- `equation-break` — before/after structural break
- `assembly-stack` — layered assembly diagram
- `converging-arrows` — multiple inputs converging to one output
- `bridge-diagram` — gap / bridge between two states
- `filter-funnel` — staged narrowing
- `vertical-contrast` — two-panel vertical opposition
- `logic-chain` — horizontal causal chain
- `reading-path` — stepped progression
- `thesis-opener` — thesis + supporting pillars
- `closing-statement` — statement + structured principles

To add a new type: add `htmlXxx(d)` in `app.js` and a CSS block in `style.css`.

---

## 10. Readability Standard（阅读标准）

Reading comfort is the execution standard.

---

### Core Constraints

- Body width: 600px max
- Prefer no more than 3 sentences in a body block
- Avoid dense stacked paragraphs
- Left-align body text
- Use visual hierarchy to reduce reading burden

---

### Absolute Rule

> If a slide looks more impressive but becomes harder to read, reject the change.

---

## 11. Integrity Rules（可信度）

---

### Never

- Use "always" / "never" without qualification
- Make unscoped claims
- Use causal language without evidence
- Present interpretation as fact
- Use unattributed numbers
- Generalize from isolated examples

---

### Always

- Define scope
- Signal uncertainty where needed
- Distinguish clearly between finding, interpretation, and hypothesis
- Acknowledge exceptions when they materially affect the claim
- Preserve trust over rhetorical force

---

## 12. Quality Check（最终检查）

Before accepting any slide, run these checks.

---

### Q1. Necessity

If this slide is removed, does the logical chain break?

- No → Remove or merge it
- Yes → Keep it

---

### Q2. Cognitive Value

Does this slide change the reader's understanding?

- No → Rewrite or delete it
- Yes → It is serving a purpose

---

### Q3. Structural Clarity

Is the reader forced to figure out the structure on their own?

- Yes → Simplify the slide
- No → The structure is clear enough

---

### Q4. Claim Discipline

Are all factual claims properly scoped and supported?

- No → Revise before shipping
- Yes → Proceed

---

## 13. Practical Authoring Workflow（实际写作流程）

When building a slide, work in this order:

1. Define the chapter question
2. Define the sub-question this slide handles
3. Decide the slide intent:
   - raise
   - answer
   - synthesize
4. Define the content structure:
   - comparison
   - causation
   - system
   - sequence
   - hierarchy
   - tension
5. Write the headline
6. Add body content only if needed
7. Add evidence only if the slide makes factual claims
8. Choose the rendering type
9. Check readability
10. Check logical necessity

---

## 14. Technical Constraints（技术约束）

These constraints are non-negotiable regardless of content decisions.

### Typography

- **Two typefaces only:** `IBM Plex Sans` (body/display) and `IBM Plex Mono` (German terms, metadata, labels)
- **Headline weight: 300 (Light).** Never bold headlines.
- **German terms** always use the `.de` class: `<span class="de">Investitionssicherheit</span>`
- **Body text** max-width: 600px. Never unconstrained full-width body text.
- No inline bold within body text. Structure sentences instead.

### Color

- Never hardcode a chapter's accent color. Always use `var(--accent)`.
- Background fills on cards: `var(--bg-s)` only.
- Text colors: use `--t1` / `--t2` / `--t3` / `--t4` tokens only.
- Chapter accent colors are defined in the `CHAPTERS` array. Do not add ad-hoc colors.

### Layout

- Do not change the HUD height (52px) or controls height (54px)
- Do not add per-element entrance animations (only the slide-level fade/translate is allowed)
- Do not add floating tooltips
- Do not introduce a third typeface
- Do not add horizontal scrolling at any breakpoint
- Do not center-align body text blocks (left-align only)
- Do not use red/green as a semantic pair (color-blind accessibility)

### Language / i18n

- All content lives in `CONTENT.en` and `CONTENT.de`
- DE content is a stub — do not remove it, but do not ship incomplete DE slides as production-ready
- The language toggle re-renders all slides from content data; no DOM patching

### Responsive

- Desktop padding: 60px horizontal
- Tablet (≤768px): 24px horizontal, flowchart switches to vertical stack
- Mobile (≤480px): 20px horizontal, reduced vertical padding
- Never hide the HUD or controls on any breakpoint

---

## 15. Final Note（总结）

This system shifts the focus from:

**Wrong question:**  
"What should a slide look like?"

**Right question:**  
"What cognitive role does this slide play?"

A strong research slide system is not built on uniform page templates.  
It is built on clear narrative logic, disciplined claims, and readable expression.

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
