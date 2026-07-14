---
name: KN Store Design System
colors:
  surface: '#fcf9f5'
  surface-dim: '#dcdad6'
  surface-bright: '#fcf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ef'
  surface-container: '#f0ede9'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e5e2de'
  on-surface: '#1c1c1a'
  on-surface-variant: '#4f4445'
  inverse-surface: '#31302e'
  inverse-on-surface: '#f3f0ec'
  outline: '#817475'
  outline-variant: '#d3c3c4'
  surface-tint: '#73575b'
  primary: '#73575b'
  on-primary: '#ffffff'
  primary-container: '#e8c4c8'
  on-primary-container: '#6b5053'
  inverse-primary: '#e1bec2'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#79582a'
  on-tertiary: '#ffffff'
  tertiary-container: '#f1c58c'
  on-tertiary-container: '#705023'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9dd'
  primary-fixed-dim: '#e1bec2'
  on-primary-fixed: '#2a1619'
  on-primary-fixed-variant: '#5a4044'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffddb4'
  tertiary-fixed-dim: '#eabf87'
  on-tertiary-fixed: '#291800'
  on-tertiary-fixed-variant: '#5e4114'
  background: '#fcf9f5'
  on-background: '#1c1c1a'
  surface-variant: '#e5e2de'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 72px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
  headline-xl:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.1em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  max-width: 1400px
  margin-desktop: 80px
  margin-mobile: 24px
  gutter: 32px
  section-gap: 120px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system is anchored in a high-end editorial aesthetic, positioning the product as a premium authority in luxury cosmetics. It avoids the cluttered look of traditional e-commerce in favor of a magazine-style storytelling approach. The brand personality is elegant, feminine, and sophisticated, evoking the feeling of browsing a physical high-fashion publication.

The style is **Minimalist with Editorial flair**, emphasizing:
- **Breathable Whitespace:** Generous negative space to allow high-end product photography to dominate the visual hierarchy.
- **Typographic Authority:** A stark contrast between timeless serifs and functional sans-serifs.
- **Refined Tactility:** Subtle transitions and soft, warm tones that feel approachable yet exclusive.
- **Story-Driven UI:** Components are designed to frame content, not compete with it.

## Colors
The palette is rooted in warmth and "skin-like" tones to reflect the cosmetic industry while maintaining luxury standards.

- **Primary (Soft Blush Pink):** Used sparingly for key calls to action, active states, and soft backgrounds to inject femininity.
- **Secondary (Deep Charcoal):** Provides grounding and structural contrast. Used for borders, icons, and primary buttons.
- **Accent (Champagne Gold):** Reserved for "premium" indicators, limited editions, or subtle decorative elements.
- **Background (Warm Ivory):** The canvas for the entire experience. It is softer and more premium than pure white (#FFFFFF).
- **Text (Rich Dark Brown):** Used for body copy to provide high legibility without the harshness of pure black, maintaining the warm, sophisticated tone.

## Typography
The typography strategy relies on the interplay between the graceful, historical weight of **EB Garamond** (the closest high-quality match to Cormorant Garamond for editorial presence) and the modern utility of **Inter**.

- **Headlines:** Set in EB Garamond with tight letter-spacing for large displays. Use `display-lg` for hero sections and product titles to create an "editorial masthead" feel.
- **Body:** Inter is used for all functional text. Line heights are intentionally generous (1.6x+) to ensure a relaxed, premium reading experience.
- **Labels:** Small caps with tracking (letter-spacing) are used for categories and metadata to distinguish them from narrative text.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy centered in a 1400px container. Unlike standard dense e-commerce grids, this design system treats the screen like a magazine spread.

- **Grid System:** A 12-column grid is used for desktop, but elements frequently span 4, 6, or 8 columns to create intentional asymmetrical "white space" pockets.
- **Section Gaps:** Large vertical gaps (120px+) separate different product stories to prevent visual fatigue.
- **Product Storytelling:** On product pages, photography alternates between full-bleed imagery and inset cards to create a rhythmic, non-linear flow.
- **Mobile Adaptivity:** On mobile, margins reduce to 24px, and typography scales significantly to maintain the "display" impact without breaking the container.

## Elevation & Depth
This design system avoids heavy shadows and traditional skeuomorphism. Depth is achieved through **Tonal Layering** and **Subtle Outlines**.

- **Surfaces:** Depth is created by placing `Supporting Beige` containers on top of `Warm Ivory` backgrounds. This creates a soft, "stacked paper" effect.
- **Outlines:** Instead of shadows, use 1px solid borders in `Soft Blush Pink` or a very light `Deep Charcoal` (at 10% opacity) to define cards.
- **Backdrop Blurs:** For navigation overlays and search modals, use a light frosted glass effect (blur: 20px) over the background to maintain context while focusing the user.

## Shapes
The shape language is refined and organic. While the layout is structured, the elements themselves have softened corners to feel more approachable and skin-friendly.

- **Corners:** A standard 16px radius (`rounded-lg`) is used for product cards and primary containers.
- **Interactive Elements:** Buttons and input fields use a 8px radius to feel slightly more precise than the larger containers.
- **Imagery:** Product photography should either be sharp-edged for full-bleed sections or follow the `rounded-xl` (24px) rule when used as floating assets.

## Components
Consistent component styling ensures the interface feels like a singular brand experience.

- **Buttons:** Primary buttons are `Deep Charcoal` with `Warm Ivory` text, using the `button` typography style. Secondary buttons are `Soft Blush Pink` with no border. Tertiary buttons are text-only with a 1px underline.
- **Product Cards:** Minimalist approach. No heavy borders. The image takes up 100% of the card width, with the product name in `EB Garamond` and the price in `Inter` centered or left-aligned underneath. No "Add to Cart" button visible until hover.
- **Input Fields:** Clean 1px bottom border only (Material-style) or a fully enclosed box with a 1px border in `Soft Beige`. Focus states use `Primary Blush`.
- **Chips/Filters:** Pill-shaped with a `Soft Beige` background and `Rich Dark Brown` text. 
- **Lists:** High-density lists are avoided. Use generous vertical padding and dividers in 5% `Deep Charcoal`.
- **Editorial Callouts:** Special components for quotes or ingredient highlights using `display-lg` typography and `Champagne Gold` accents.