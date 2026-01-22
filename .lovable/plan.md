
# ArdenNest Website MVP - Implementation Plan

## Project Overview

Building a multi-language vacation rental website for ArdenNest, a quiet luxury property in the Belgian Ardennes accommodating 26 guests. The primary goal is converting OTA (Booking.com) discoverers to direct bookings by building trust and showcasing unique differentiators.

**Target: Increase direct booking percentage from 40% to 55%+ within 6 months.**

---

## Phase 1: Project Foundation and Core Structure

### 1.1 Project Setup
- Configure Tailwind CSS theme with the brand's design system:
  - Natural color palette (earthy greens, warm browns, soft grays)
  - Typography: Serif headings (Playfair Display), Sans-serif body (Inter)
  - Warm off-white backgrounds, dark charcoal text
- Set up react-router-dom routes for all pages
- Create base layout components (Header, Footer, Page wrapper)

### 1.2 Internationalization (i18n) Architecture
- Implement language switching with react-i18next or a custom context
- Create translation file structure:
  - `/src/locales/nl/` (Dutch - primary)
  - `/src/locales/fr/` (French - legal requirement)
  - `/src/locales/en/` (English - international)
- Build language switcher component with flag icons (NL | FR | EN)
- Configure language detection and routing (e.g., `/nl/`, `/fr/`, `/en/`)

---

## Phase 2: Core Pages Development

### 2.1 Homepage
**Hero Section:**
- Full-width hero image (placeholder until real photos provided)
- Headline: "Quiet luxury voor momenten samen"
- Subheadline: "17 jaar ervaring in het verwelkomen van families in de Ardennen"
- Primary CTAs: "Bekijk beschikbaarheid" + "Neem contact op"

**Trust Signals Section:**
- Google Reviews badge (4.8/5 sterren - 50 reviews)
- Years of experience: "17 jaar"
- Key USP teaser: "26 personen, ensuite badkamers, professionele keuken"

**Key Differentiators Preview (3-column cards):**
1. Quiet Luxury - Ensuite bathrooms, solid quality
2. Professional Kitchen - 2x Miele dishwashers, Lacanche stove
3. Kids Paradise Garden - 200m x 100m

**Direct Booking Value Proposition:**
- "Waarom direct boeken?" section explaining price advantage

### 2.2 Property Details ("Het Huis")
- Property overview: 26 persons, bedroom count, key features
- Photo gallery component with lightbox functionality
- Detailed room information with bed configurations
- Kitchen section highlighting professional equipment
- Oak table feature (dimensions, capacity, significance)
- Garden overview with link to full experiences page
- Practical info: check-in/out times, parking, house rules summary
- CTAs for booking and contact

### 2.3 What Makes Us Different ("Wat Ons Onderscheidt")
**Modular differentiator blocks:**
1. **Quiet Luxury** - What we don't have vs what we do have
2. **Professional Kitchen** - Equipment list, why it matters
3. **Kids Paradise Garden** - 200m x 100m, features, treasure hunt
4. **The Oak Table** - Dimensions, capacity, emotional significance

Each block includes image, headline, descriptive content, and optional customer quote.

### 2.4 About Us ("Over Ons")
- Owners photo placeholder (Christophe and wife)
- The story and Festina Lente philosophy
- Personal welcome tradition (17 years of greeting every group)
- Team descriptions
- Why relationship matters vs OTA safety
- Contact CTA

### 2.5 Practical Info / Contact
**Contact options (prominent, side-by-side):**
1. Phone - click-to-call on mobile
2. Email - with optional contact form
3. WhatsApp - pre-filled message opener

**Contact Form:**
- Fields: Name, Email, Phone, Preferred dates, Group size, Message
- Validation with react-hook-form + zod

**Practical Information:**
- Check-in/Check-out times
- Location with map integration placeholder
- Travel distances from major cities
- Parking information
- FAQ section addressing common concerns

### 2.6 Booking / Availability
- Introduction with direct booking value proposition
- Beds24 integration section:
  - Option A: Embedded iframe (if styling works)
  - Option B: Prominent CTA button linking to Beds24 (recommended for MVP)
- "Why Book Direct" benefits list
- "Prefer to Talk First?" alternative for conversation-first bookers
- Payment security note (Mollie via Beds24)
- After-booking expectations

---

## Phase 3: Reusable Components

### UI Components to Build:
1. **Navigation Header**
   - Logo/brand name
   - Main nav links (responsive hamburger on mobile)
   - Language switcher (NL | FR | EN)
   - "Boek Direct" CTA button

2. **Footer**
   - Contact information
   - Quick links (house rules, cancellation policy)
   - Google Reviews badge
   - Legal links

3. **CTA Buttons**
   - Primary (filled, accent color)
   - Secondary (outline)
   - Contact variants (phone, email, WhatsApp icons)

4. **Feature Cards**
   - Image + headline + description + CTA pattern
   - Used for differentiators, room listings

5. **Image Gallery**
   - Grid layout with lightbox on click
   - Lazy loading for performance

6. **Review/Testimonial Display**
   - Quote + reviewer name + date
   - Star rating visual
   - Link to Google Reviews

7. **FAQ Accordion**
   - Using existing accordion component
   - Expandable question/answer pairs

---

## Phase 4: Design System Implementation

### Color Palette (CSS Variables):
```text
Primary: Earthy greens (forest tones)
Secondary: Warm browns (oak/wood)
Accent: Muted gold/brass
Neutrals: Off-white, warm grays
Text: Dark charcoal (#1a1a1a)
```

### Typography:
- Headings: Playfair Display (serif)
- Body: Inter (sans-serif)
- Base size: 16-18px

### Responsive Breakpoints:
- Mobile: < 640px (single column, hamburger nav)
- Tablet: 640-1024px (2-column where appropriate)
- Desktop: > 1024px (full multi-column layouts)

---

## Phase 5: Performance and Accessibility

### Performance Targets:
- Page load < 2 seconds on 4G
- Image optimization (WebP with fallbacks, lazy loading)
- Code splitting by route

### Accessibility (WCAG 2.1 AA):
- Semantic HTML structure
- Keyboard navigation support
- Alt text for all images
- Sufficient color contrast ratios
- Touch-friendly CTAs (minimum 44x44px)

---

## Content and Assets Needed

### Images Required (placeholders will be used initially):
- Hero image (multi-generational moment at oak table or garden)
- Property photos (rooms, kitchen, bathrooms, living areas)
- Garden photos (showing scale, kids playing)
- Oak table photos (multiple angles)
- Kitchen equipment detail shots
- Team photo (Christophe and wife)

### Copy to Finalize:
- Exact property specifications (room count, bed configs)
- Oak table dimensions
- Check-in/out times
- House rules summary
- FAQ answers
- Cancellation policy link

### Technical Setup Required:
- Beds24 property ID for integration
- Google Analytics 4 tracking ID (future)
- Contact form email destination

---

## Technical Considerations

### File Structure:
```text
src/
  components/
    layout/
      Header.tsx
      Footer.tsx
      PageWrapper.tsx
    ui/ (existing shadcn components)
    home/
      HeroSection.tsx
      TrustSignals.tsx
      DifferentiatorsPreview.tsx
    property/
      PropertyOverview.tsx
      PhotoGallery.tsx
      RoomList.tsx
    shared/
      FeatureCard.tsx
      CTAButton.tsx
      ReviewDisplay.tsx
  pages/
    Index.tsx (Homepage)
    Property.tsx
    Differentiators.tsx
    About.tsx
    Contact.tsx
    Booking.tsx
  locales/
    nl/
      common.json
      homepage.json
      property.json
      ...
    fr/
    en/
  hooks/
    useLanguage.ts
```

### External Dependencies to Add:
- react-i18next (internationalization)
- @fontsource/playfair-display (serif heading font)
- @fontsource/inter (sans-serif body font)

---

## Implementation Order

**Week 1:**
1. Set up design system (colors, typography, theme)
2. Build layout components (Header, Footer, navigation)
3. Implement i18n architecture with language switching
4. Build Homepage with all sections
5. Create core UI components (cards, buttons, CTAs)

**Week 2:**
1. Build Property Details page
2. Build What Makes Us Different page
3. Build About Us page
4. Build Contact/Practical Info page with form
5. Build Booking/Availability page with Beds24 integration

**Week 3:**
1. Add French and English translations
2. Mobile responsiveness polish
3. Image gallery and lightbox functionality
4. Performance optimization
5. Cross-browser testing

---

## Notes

- The PRD mentions Next.js, but since Lovable uses Vite + React, the implementation will use react-router-dom for routing and a simpler i18n approach
- Beds24 iframe integration will be tested; if problematic, a direct link approach is acceptable for MVP
- Real photos should be provided to replace placeholders; the site can launch with high-quality placeholder images initially
- German language support is planned for 6 months post-launch, so the i18n architecture should easily accommodate a 4th language
