

# Complete Image Implementation Plan

## Overview

Replace all stock Unsplash images across the ArdenNest website with real property photos. This includes copying 20 selected images to `src/assets/property/`, creating a centralized export file, and updating 6 component files.

---

## Final Photo Selection (20 images)

Based on all 12 batches of uploaded photos, here is the curated selection:

### Hero & Exterior Images

| Photo | Purpose | Why Selected |
|-------|---------|--------------|
| ferme-190.jpg | Homepage Hero | Stunning drone shot - building + terrace + lawn |
| ferme-109.jpg | Property Page Hero | Beautiful exterior with green shutters |
| ferme-191.jpg | Garden Aerial | Shows petanque, trampoline, football, greenhouse |
| ferme-194.jpg | About Page Hero | Drone view with terrace and vegetable garden |

### Dining & Kitchen

| Photo | Purpose | Why Selected |
|-------|---------|--------------|
| ferme-175.jpg | Dining Room Overview | Full room with oak table and guests |
| ferme-178.jpg | Oak Table Detail | Wine glass, flowers, elegant atmosphere |
| ferme-010.jpg | Kitchen/Lacanche | Professional stove prominently featured |

### Living Spaces

| Photo | Purpose | Why Selected |
|-------|---------|--------------|
| ferme-022.jpg | Living Room/Fireplace | Cozy atmosphere with fireplace |
| ferme-179.jpg | Aperitif Scene | Champagne glasses, leather sofa |

### Bedrooms

| Photo | Purpose | Why Selected |
|-------|---------|--------------|
| ferme-139.jpg | Primary Bedroom | Ensuite visible, garden view, architectural details |
| ferme-141.jpg | Secondary Bedroom | Atmospheric with countryside views |
| ferme-148.jpg | Mezzanine/Loft | Family-friendly upper level |
| ferme-064.jpg | Quiet Luxury | Green accent wall, elegant design |

### Outdoor & Garden

| Photo | Purpose | Why Selected |
|-------|---------|--------------|
| ferme-116.jpg | Terrace Dining | Lifestyle shot with gingham tablecloths |
| ferme-089.jpg | Sports Facilities | Volleyball net, football goal |
| ferme-102.jpg | Landscape/Meadow | Shows 2-hectare scale with wildflowers |

### Family Entertainment (NEW SECTIONS)

| Photo | Purpose | Why Selected |
|-------|---------|--------------|
| ferme-123.jpg | Game Room - Pool Table | Primary game room shot |
| ferme-126.jpg | Game Room - Foosball | Secondary game room shot |
| ferme-158.jpg | Play Barn | Go-karts and pedal toys |

---

## Files to Create

### 1. Asset Directory Structure

```text
src/assets/
  property/
    index.ts              (central export file)
    ferme-010.jpg         (Kitchen/Lacanche)
    ferme-022.jpg         (Living/Fireplace)
    ferme-064.jpg         (Bedroom - Quiet Luxury)
    ferme-089.jpg         (Garden - Sports)
    ferme-102.jpg         (Garden - Landscape)
    ferme-109.jpg         (Property Hero)
    ferme-116.jpg         (Terrace Dining)
    ferme-123.jpg         (Game Room - Pool)
    ferme-126.jpg         (Game Room - Foosball)
    ferme-139.jpg         (Bedroom - Primary)
    ferme-141.jpg         (Bedroom - Atmospheric)
    ferme-148.jpg         (Bedroom - Mezzanine)
    ferme-158.jpg         (Play Barn)
    ferme-175.jpg         (Dining Room)
    ferme-178.jpg         (Oak Table Detail)
    ferme-179.jpg         (Living - Aperitif)
    ferme-190.jpg         (Homepage Hero)
    ferme-191.jpg         (Garden Aerial)
    ferme-194.jpg         (About Hero)
```

### 2. Central Export File (src/assets/property/index.ts)

Creates named exports for all property images, enabling type-safe imports throughout the application:

```typescript
// Hero & Exterior
export { default as heroMain } from './ferme-190.jpg';
export { default as propertyHero } from './ferme-109.jpg';
export { default as gardenAerial } from './ferme-191.jpg';
export { default as aboutHero } from './ferme-194.jpg';

// Dining & Kitchen
export { default as diningRoom } from './ferme-175.jpg';
export { default as oakTableDetail } from './ferme-178.jpg';
export { default as kitchen } from './ferme-010.jpg';

// Living
export { default as livingFireplace } from './ferme-022.jpg';
export { default as livingAperitif } from './ferme-179.jpg';

// Bedrooms
export { default as bedroomPrimary } from './ferme-139.jpg';
export { default as bedroomAtmospheric } from './ferme-141.jpg';
export { default as bedroomMezzanine } from './ferme-148.jpg';
export { default as bedroomQuietLuxury } from './ferme-064.jpg';

// Outdoor
export { default as terraceDining } from './ferme-116.jpg';
export { default as gardenSports } from './ferme-089.jpg';
export { default as gardenLandscape } from './ferme-102.jpg';

// Entertainment
export { default as gameRoomPool } from './ferme-123.jpg';
export { default as gameRoomFoosball } from './ferme-126.jpg';
export { default as playBarn } from './ferme-158.jpg';
```

---

## Files to Modify

### 1. Homepage Hero (src/components/home/HeroSection.tsx)

**Current**: Unsplash stock exterior image
**New**: ferme-190.jpg (drone shot of building with terrace and lawn)

Changes:
- Import `heroMain` from `@/assets/property`
- Replace Unsplash URL with imported image

### 2. Differentiators Preview (src/components/home/DifferentiatorsPreview.tsx)

**Current**: 3 Unsplash stock images for cards
**New**: Real property photos

| Card | New Image |
|------|-----------|
| Quiet Luxury | ferme-064.jpg (bedroom with green accent) |
| Kitchen | ferme-010.jpg (Lacanche stove) |
| Garden | ferme-191.jpg (aerial showing all activities) |

Changes:
- Import images from `@/assets/property`
- Replace `differentiatorImages` array with imported images

### 3. Why Book Direct (src/components/home/WhyBookDirect.tsx)

**Current**: Unsplash stock image
**New**: ferme-116.jpg (terrace outdoor dining)

Changes:
- Import `terraceDining` from `@/assets/property`
- Replace Unsplash URL in img src

### 4. Property Page (src/pages/Property.tsx)

**Current**: 4 Unsplash stock images
**New**: Real property photos

| Section | New Image |
|---------|-----------|
| Hero Background | ferme-109.jpg (exterior with shutters) |
| Kitchen | ferme-010.jpg (Lacanche stove) |
| Oak Table | ferme-178.jpg (table detail with wine glass) |
| Garden | Uses icon cards (no image changes needed) |

Changes:
- Import images from `@/assets/property`
- Replace `propertyImages` array with imported images

### 5. Differentiators Page (src/pages/Differentiators.tsx)

**Current**: 4 Unsplash stock images + 4 hardcoded sections
**New**: 6 real property photos + 2 NEW sections (Game Room, Play Barn)

| Section | New Image |
|---------|-----------|
| Quiet Luxury | ferme-064.jpg |
| Kitchen | ferme-010.jpg |
| Garden | ferme-191.jpg (aerial) |
| Oak Table | ferme-178.jpg |
| Game Room (NEW) | ferme-123.jpg |
| Play Barn (NEW) | ferme-158.jpg |

New sections to add:

**Game Room Section**:
- Icon: `Gamepad2` from lucide-react
- Title: "De Speelkamer" 
- Description: Pool table, foosball, and board games for rainy days
- Features: Pool table, foosball, board games, retro gaming

**Play Barn Section**:
- Icon: `Car` from lucide-react  
- Title: "De Speelschuur"
- Description: Go-karts and pedal toys for the little ones
- Features: Go-karts, pedal tractors, tricycles, covered play area

### 6. About Page (src/pages/About.tsx)

**Current**: Unsplash stock image for hero
**New**: ferme-194.jpg (drone with terrace and garden)

Changes:
- Import `aboutHero` from `@/assets/property`
- Replace Unsplash URL in hero section

---

## Implementation Order

1. Copy all 20 photos from user-uploads to `src/assets/property/`
2. Create `src/assets/property/index.ts` with named exports
3. Update `HeroSection.tsx` - Homepage hero
4. Update `DifferentiatorsPreview.tsx` - Homepage cards
5. Update `WhyBookDirect.tsx` - Homepage section
6. Update `Property.tsx` - Property page
7. Update `Differentiators.tsx` - Add Game Room + Play Barn sections
8. Update `About.tsx` - About page hero

---

## Technical Notes

### Import Pattern

All components will import images like this:

```typescript
import { 
  heroMain, 
  kitchen, 
  gardenAerial 
} from '@/assets/property';
```

Then use in JSX:

```tsx
// For background images
<div style={{ backgroundImage: `url('${heroMain}')` }} />

// For img elements
<img src={kitchen} alt="Professional kitchen" />
```

### Benefits

- **Vite optimization**: Images are bundled and hashed for cache busting
- **Type safety**: TypeScript ensures image paths are valid at build time
- **Centralized management**: Easy to update/swap images from one location
- **Better performance**: Smaller initial bundle than public folder hosting

### New Differentiator Sections

The Game Room and Play Barn sections will be added after the existing Oak Table section, following the same alternating layout pattern. This expands the differentiators from 4 to 6 sections, showcasing more family-friendly amenities.

---

## Summary of Changes

| Component | Stock Images Removed | Real Images Added |
|-----------|---------------------|-------------------|
| HeroSection.tsx | 1 | 1 |
| DifferentiatorsPreview.tsx | 3 | 3 |
| WhyBookDirect.tsx | 1 | 1 |
| Property.tsx | 4 | 3 |
| Differentiators.tsx | 4 | 6 (+2 new sections) |
| About.tsx | 1 | 1 |
| **Total** | **14** | **15** |

