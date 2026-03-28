# DESIGN.md — ArdenNest

> **Agent instruction:** Read this file in full before generating any visual output. Every color, font, spacing value, and tone guideline is a constraint, not a suggestion. When in doubt, choose the quieter, warmer, more restrained option.

---

## 1. Project Overview

**ArdenNest** (ardennest.be) is a luxury group vacation rental in the Belgian Ardennes for up to 26 guests. The brand follows "quiet luxury" — authentic, understated quality focused on togetherness rather than flashy amenities. The design must feel warm and inviting like a well-kept farmhouse, never cold or corporate. Every visual choice serves one idea: the best moments happen when a group truly comes together.

**Business entity:** Festina Lente bv ("hasten slowly")
**Live site:** www.ardennest.be
**Tech stack:** React (Vite) + TypeScript + Tailwind CSS + shadcn/ui

---

## 2. Design Personality

**Three words:** Warm · Authentic · Calm

| Trait | What it means in practice |
|-------|--------------------------|
| **Warm** | Earthy greens and browns, soft cream backgrounds, Playfair Display serif headings. Never clinical white, never cold blue. |
| **Authentic** | Real photography over stock, imperfect over styled, lived-in over showroom. A dent in the sofa signals real families had real moments here. |
| **Calm** | Generous breathing room, no animation clutter, no visual noise. The design should feel like a slow exhale — unhurried, confident, quiet. |

**In one sentence:** ArdenNest looks like a beautifully maintained 1849 farmhouse feels — solid, warm, unpretentious, and quietly impressive.

---

## 3. Colors

All colors are defined as HSL values in `src/index.css` and consumed via Tailwind tokens in `tailwind.config.ts`. Never use raw hex in components — always use semantic tokens.

### Primary Palette

| Token (CSS var) | HSL | Approx. Hex | Tailwind class | Usage |
|-----------------|-----|-------------|----------------|-------|
| `--primary` | 150 25% 30% | `#395F4C` | `primary` | Headings, buttons, accents, links. Deep forest-teal green. |
| `--primary-foreground` | 40 33% 98% | `#FBFAF8` | `primary-foreground` | Text on primary-colored backgrounds. |
| `--secondary` | 30 25% 35% | `#6F5942` | `secondary` | Labels, subtle text, secondary buttons. Warm oak brown. |
| `--secondary-foreground` | 40 33% 98% | `#FBFAF8` | `secondary-foreground` | Text on secondary backgrounds. |
| `--accent` | 38 45% 55% | `#BF9A58` | `accent` | Muted gold/brass. Rebranding banner, special accents. |
| `--accent-foreground` | 30 10% 15% | `#2A2622` | `accent-foreground` | Text on accent backgrounds. |
| `--background` | 40 33% 98% | `#FBFAF8` | `background` | Page background. Warm near-white. |
| `--foreground` | 30 10% 15% | `#2A2622` | `foreground` | Body text. Dark charcoal, never pure black. |
| `--card` | 40 30% 97% | `#F9F8F5` | `card` | Card/elevated surface backgrounds. |
| `--card-foreground` | 30 10% 15% | `#2A2622` | `card-foreground` | Text on cards. |
| `--muted` | 30 15% 90% | `#E9E5E1` | `muted` | Soft warm gray backgrounds. |
| `--muted-foreground` | 30 10% 40% | `#70665B` | `muted-foreground` | Muted text, captions, timestamps. |
| `--border` | 30 20% 85% | `#E0D8D1` | `border` | Dividers, card borders, subtle separators. |
| `--input` | 30 20% 85% | `#E0D8D1` | `input` | Input field borders. |
| `--ring` | 150 25% 30% | `#395F4C` | `ring` | Focus rings. Same as primary. |
| `--destructive` | 0 84.2% 60.2% | `#EE4444` | `destructive` | Errors, validation failures. |

### Custom Brand Tokens

| Token (CSS var) | HSL | Approx. Hex | Tailwind class | Usage |
|-----------------|-----|-------------|----------------|-------|
| `--forest` | 150 25% 30% | `#395F4C` | `forest` | Alias for primary green. |
| `--forest-light` | 150 20% 45% | `#5B8972` | `forest-light` | Hover states on primary elements. |
| `--oak` | 30 25% 35% | `#6F5942` | `oak` | Alias for secondary brown. |
| `--oak-light` | 30 20% 50% | `#997F66` | `oak-light` | Hover on secondary elements. |
| `--gold` | 38 45% 55% | `#BF9A58` | `gold` | Alias for accent gold. |
| `--gold-light` | 38 40% 70% | `#D1BA93` | `gold-light` | Lighter gold for subtle accents. |
| `--cream` | 40 33% 98% | `#FBFAF8` | `cream` | Alias for background. |
| `--cream-dark` | 40 25% 92% | `#EFECE5` | `cream-dark` | Slightly darker cream for section backgrounds. |
| `--charcoal` | 30 10% 15% | `#2A2622` | `charcoal` | Alias for foreground/text. |

### Color Rules

- **No pure black** — always charcoal (`#2A2622`) for text.
- **No pure white backgrounds on cards** — use `card` token (warm cream).
- **No blue anywhere** — blue is not in this palette. Not for links, not for info states.
- **No gradients** — flat colors only. Depth comes from shadows and layering, not gradients.
- **Dark mode exists in CSS** but is not the primary experience. Light mode is the default and only actively designed mode.

---

## 4. Typography

### Font Families

| Role | Font | Fallback Stack | Weight Range |
|------|------|---------------|-------------|
| **Headings / Display** | Playfair Display | Georgia, serif | 400 (regular), 500 (medium), 700 (bold) |
| **Body / UI** | Inter | system-ui, sans-serif | 400 (regular), 500 (medium), 600 (semi-bold) |
| **Print / Documents** | Georgia (headings), Calibri (body) | Serif / Sans-serif system fonts | — |

Fonts are loaded via `@fontsource` packages in `main.tsx`.

### Type Scale (CSS utility classes in index.css)

| Class | Size | Weight | Font | Usage |
|-------|------|--------|------|-------|
| `.heading-display` | 4xl → 5xl → 6xl | medium | Playfair Display | Hero headlines only |
| `.heading-1` | 3xl → 4xl → 5xl | medium | Playfair Display | Page titles |
| `.heading-2` | 2xl → 3xl → 4xl | medium | Playfair Display | Section headings |
| `.heading-3` | xl → 2xl → 3xl | medium | Playfair Display | Subsection headings |
| `.body-large` | lg → xl | regular | Inter | Lead paragraphs, intros |
| `.body-base` | base | regular | Inter | Body text |
| `.body-small` | sm | regular | Inter | Captions, metadata |

Sizes shown as: mobile → tablet → desktop (responsive via Tailwind breakpoints).

### Line Height & Letter Spacing

| Element | Line Height | Letter Spacing |
|---------|------------|---------------|
| Display/H1 | tight (tracking-tight) | -0.02em |
| H2/H3 | tight to normal | -0.01em |
| Body | relaxed (leading-relaxed) | 0 |

### Typography Rules

- **Headings are always Playfair Display** — applied globally via `h1-h6` selector in index.css.
- **Body is always Inter** — set on `body` element.
- **Never use all-caps** for headings. Sentence case throughout.
- **Bold sparingly** — use weight 500 (medium) for headings, 600 (semi-bold) for emphasis in body text.
- **Italic** — reserved for the tagline "Quiet luxury for moments together" and occasional emphasis.

---

## 5. Spacing

### Base Unit

**8px** — all spacing values are multiples of 8.

### Layout Spacing (CSS utility classes)

| Class | Value | Usage |
|-------|-------|-------|
| `.container-luxury` | max-w-7xl (1280px), px-4/sm:px-6/lg:px-8 | Page content container |
| `.section-padding` | py-16/md:py-20/lg:py-24 | Vertical section spacing |

### Layout Values

| Context | Value |
|---------|-------|
| Page max-width | 1280px (max-w-7xl) |
| Page horizontal padding | 16px (mobile), 24px (sm), 32px (lg) |
| Section vertical padding | 64px (mobile), 80px (md), 96px (lg) |
| `--radius` | 0.5rem (8px) — used for buttons, cards, inputs, images |

### Spacing Philosophy

**Balanced.** Not so airy it feels empty, not so dense it feels cluttered. Enough room to breathe, tight enough to feel cohesive. When in doubt, add 8px more rather than less.

---

## 6. Components

### Buttons

| Property | Primary | Secondary | Ghost |
|----------|---------|-----------|-------|
| Background | `primary` | `transparent` | `transparent` |
| Text color | `primary-foreground` | `primary` | `secondary` |
| Border | none | 1.5px solid `primary` | none |
| Border radius | `--radius` (8px) | `--radius` (8px) | `--radius` (8px) |
| Font | Inter 500 | Inter 500 | Inter 500 |
| Hover | `forest-light` bg | `cream-dark` bg | `cream-dark` bg |
| Transition | 150ms ease | 150ms ease | 150ms ease |

**Button rules:**
- Never use all-caps on buttons.
- CTAs are action-oriented but not pushy: "Bekijk beschikbaarheid" not "Boek nu!"
- Maximum two buttons side by side. Primary left, secondary right.

### Cards

| Property | Value |
|----------|-------|
| Background | `card` token |
| Border | 1px solid `border` token |
| Border radius | `--radius` (8px) |
| Padding | 24px |

**Card rules:**
- No text overlays on images inside cards.
- No zoom effects on card images on hover.
- Images inside cards: 8px border radius (top corners if full-bleed).

### Inputs / Forms

| Property | Value |
|----------|-------|
| Border | 1px solid `input` token |
| Border focus | 2px solid `primary` token |
| Border radius | `--radius` (8px) |
| Background | white |
| Label | Inter 500, above input |
| Placeholder | Inter 400, `muted-foreground` |
| Error text | Inter 400, `destructive` |

### Navigation

| Property | Value |
|----------|-------|
| Style | Clean horizontal nav, font weight change for active state |
| Font | Inter 500, 14px |
| Color | `foreground` default, `primary` active/hover |
| Mobile | Hamburger menu, overlay with cream background |
| Language switcher | Text-based (NL / FR / EN / DE), no flag icons |

### Photo Gallery

| Property | Value |
|----------|-------|
| Layout | 5-photo grid: 1 large hero + 4 small stacked |
| Border radius | 8px on all images |
| Hover effect | **None** — no zoom, no overlay, no animation |
| Lightbox | Fullscreen with navigation arrows |
| Alt text | Specific descriptions (e.g., "Lacanche fornuis"), never generic |

---

## 7. Imagery & Assets

### Photography Style

| Do | Don't |
|----|-------|
| Natural light, warm tones | Flash photography, cold/blue tones |
| Candid, in-use moments | Staged, stock-photo perfection |
| Signs of life (a book on the table, shoes by the door) | Sterile emptiness |
| Seasonal variety (autumn leaves, winter fire) | Only summer/perfect weather |
| Real rooms, real food, real people | AI-generated or heavily retouched images |

### Image Formats

| Context | Format | Max width |
|---------|--------|-----------|
| Web photos | WebP (with JPG fallback) | 1920px |
| Thumbnails | WebP | 640px |
| OG image | JPG | 1200×630px |
| Documents | JPG/PNG | As needed |

### Icons

| Property | Value |
|----------|-------|
| Library | Lucide React |
| Style | Outline (stroke), not filled |
| Stroke width | 1.5px (default) |
| Size | 20px (inline), 24px (standalone), 32px (feature icons) |
| Color | Inherits text color (usually `foreground` or `secondary`) |

### Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | calc(--radius - 4px) = 4px | Badges, small pills |
| `md` | calc(--radius - 2px) = 6px | Smaller elements |
| `lg` | `--radius` = 8px | Buttons, cards, inputs, images — **default** |
| `full` | 9999px | Avatars, circular elements |

### Animations (defined in tailwind.config.ts)

| Animation | Duration | Usage |
|-----------|----------|-------|
| `fade-in` | 0.5s ease-out | Subtle page element entrance |
| `fade-in-up` | 0.6s ease-out | Content sliding up into view |
| `scale-in` | 0.3s ease-out | Elements scaling in |
| `accordion-down/up` | 0.2s ease-out | Accordion open/close |

---

## 8. Tone of Voice (Content Constraints)

### Language

- **Primary:** Dutch (NL) — source language for all content
- **Translations:** French (FR), English (EN), German (DE — formal "Sie")
- **Address:** Warm "jullie" in Dutch, never "u"

### Do

- Concrete and specific: "7m20 eiken tafel" not "lange tafel"
- Warm and personal: write like a Belgian host speaks
- Honest about limitations: "Geen zwembad — bewust"
- Recognizable scenarios: "Als de kinderen slapen..."
- Belgian, not Dutch: local idiom, not Randstad

### Never

- Superlatives: not "uniek", "ongeëvenaard", "ultiem"
- Vacation clichés: not "genesteld", "oase", "ontsnappen"
- The word "luxe" — too loaded, meaningless
- Pushy CTAs: not "Boek nu!", "Mis deze kans niet!"
- Excuses for deliberate choices: not "helaas geen huisdieren"

### Copy Structure

- **Headlines:** Clear, specific, benefit-oriented
- **Body:** Short paragraphs (2–4 sentences max)
- **Lists:** Use for specifications, not for everything
- **CTAs:** Action-oriented but calm: "Bekijk" not "Koop nu!"

---

## 9. Anti-Patterns

These are **hard constraints**. AI agents must never do the following:

1. **No gradients** — flat colors only, everywhere.
2. **No hover animations on images** — no zoom, scale, overlay, or parallax on photos.
3. **No stock photography aesthetic** — never generate or suggest overly styled, perfect imagery.
4. **No pure black (#000000)** — always use charcoal (`foreground` token) for text.
5. **No blue** — blue does not exist in this palette. Not for links, not for anything.
6. **No all-caps text** — not in headings, not on buttons, nowhere.
7. **No flag icons** for language switching — text only (NL / FR / EN / DE).
8. **No social share buttons** on content — quiet luxury means no social noise.
9. **No popups, lightboxes, or modals for newsletter signup** — a small footer field only.
10. **No cookie banners** — GA4 runs cookieless (`client_storage: 'none'`).
11. **No dark mode as default** — light mode is the only actively designed experience.
12. **No emoji in UI** — icons (Lucide) yes, emoji no.
13. **No autoplay video** — always require user interaction to play.
14. **No carousel/slider** — use static grids instead.

---

## 10. Remotion / Video Constraints

When generating video content (MP4 via Remotion):

| Property | Value |
|----------|-------|
| Resolution | 1080×1080 (Instagram square) or 1080×1920 (Stories/Reels) |
| Frame rate | 30fps |
| Background | `cream` token or full-bleed photography |
| Text overlay font | Playfair Display (titles), Inter (body/captions) |
| Text color | `charcoal` on light backgrounds, white on dark/photo backgrounds |
| Text shadow on photos | `0 2px 8px rgba(0,0,0,0.4)` — subtle, not heavy |
| Transitions | Simple fade (300ms) or cut. No wipes, no zooms, no 3D transitions. |
| Lower third | If used: `primary` background strip, white Inter text |
| Logo/wordmark | "ArdenNest" in Playfair Display, top-left or bottom-center |
| End card | Cream background, "ArdenNest" centered, URL below in Inter |
| Music mood | Acoustic, ambient, calm — never electronic or upbeat |

---

## 11. Document Styling (Word / PDF)

When generating .docx or .pdf documents:

| Property | Value |
|----------|-------|
| Page size | A4 |
| Margins | ~1.27cm all sides |
| Heading font | Georgia, `primary` color |
| Body font | Calibri, `charcoal` color |
| Accent background | `cream-dark` |
| Border color | `border` token |
| Table header bg | `primary`, text white |
| Table alt row bg | `cream-dark` |

---

## 12. Agent Instructions

**Read this section if you are an AI agent (Claude Code, Lovable, Remotion, Cursor, Stitch, Gemini CLI, or any other tool).**

1. **Read this entire file before generating any output.** Every section is a constraint. Do not skip sections that seem irrelevant — the anti-patterns section alone prevents the most common mistakes.

2. **When this file conflicts with a generic default, this file wins.** If your framework defaults to blue links, override to `primary`. If your template uses gradients, remove them. If your component library uses pure black text, change to `foreground`.

3. **When something isn't covered, choose the quieter option.** This brand prefers restraint over expressiveness, warmth over coolness, authenticity over polish. If you're unsure whether to add an animation — don't.

4. **Never invent new colors.** Stick to the palette defined in section 3. If you need a shade not listed, derive it from an existing color (lighter or darker) and note what you did.

5. **Tone of voice applies to all generated text.** Whether it's a button label, an error message, an alt text, or a video caption — apply the rules from section 8. Concrete, warm, no superlatives, no clichés.

6. **Test against the personality check:** Before delivering output, ask yourself: "Does this feel warm, authentic, and calm?" If it feels cold, corporate, flashy, or generic — revise.

7. **Use semantic Tailwind tokens.** Never write raw color values in components. Use `text-primary`, `bg-card`, `border-border`, `text-forest`, `bg-cream-dark`, etc.

---

*Last updated: March 2026 · Validated against codebase: March 28, 2026*
*Maintained by Christophe (Festina Lente bv)*
*Questions about this design system: bieke@ardennest.be*
