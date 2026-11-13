---
name: Ethereal Archive
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#cac4d4'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#948e9d'
  outline-variant: '#494552'
  surface-tint: '#cebdff'
  primary: '#cebdff'
  on-primary: '#381385'
  primary-container: '#a78bfa'
  on-primary-container: '#3c1989'
  inverse-primary: '#674bb5'
  secondary: '#62dcad'
  on-secondary: '#003827'
  secondary-container: '#18a479'
  on-secondary-container: '#003121'
  tertiary: '#ffafd3'
  on-tertiary: '#620040'
  tertiary-container: '#f170b4'
  on-tertiary-container: '#6a0045'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e8ddff'
  primary-fixed-dim: '#cebdff'
  on-primary-fixed: '#21005e'
  on-primary-fixed-variant: '#4f319c'
  secondary-fixed: '#80f9c8'
  secondary-fixed-dim: '#62dcad'
  on-secondary-fixed: '#002115'
  on-secondary-fixed-variant: '#00513a'
  tertiary-fixed: '#ffd8e7'
  tertiary-fixed-dim: '#ffafd3'
  on-tertiary-fixed: '#3d0026'
  on-tertiary-fixed-variant: '#85145a'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 5rem
    fontWeight: '700'
    lineHeight: 5.25rem
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 2.75rem
    fontWeight: '700'
    lineHeight: 3rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 3rem
    fontWeight: '600'
    lineHeight: 3.5rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: 2rem
  title-editorial:
    fontFamily: Playfair Display
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.875rem
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  meta-code:
    fontFamily: Space Mono
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0.02em
  meta-badge:
    fontFamily: Space Mono
    fontSize: 0.6875rem
    fontWeight: '700'
    lineHeight: 1rem
    letterSpacing: 0.08em
  meta-timestamp:
    fontFamily: Space Mono
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: 1rem
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 3rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a neo-editorial brutalist architecture wrapped in an atmospheric, hazy envelope. Built for an encyclopedic music archive and critical webzine focused on shoegaze, dream pop, and ambient alternative rock, the system balances two opposing forces: rigid, utilitarian catalog clarity (the "archival ledger") and diffused, psychedelic ephemerality (the "wall of sound").

The UI evokes the tactile reality of physical record sleeves, bootleg fanzines, and technical pedalboard schematics, elevated through precision digital typography and deep nocturnal surfaces. Interfaces maintain high contrast for prolonged deep-dive reading sessions while employing muted iridescent accents, hairline structures, and subtle radial light leaks to evoke the reverb-drenched atmosphere of the genre.

## Colors

The palette operates in a default dark color space anchored by obsidian and charcoal baselines, eliminating stark pitch-black in favor of nuanced, deep mineral tones.

- **Background & Surfaces:** `#0E0E11` forms the base void canvas. Elevated surfaces sit at `#17171C`, stepping to `#1F1F26` on interactive states. Structural divides rely on `#27272F` for hairline borders.
- **Typography & Neutrals:** Primary legibility is guaranteed via `#F4F4F6` (WCAG AAA contrast against dark surfaces). Archival metadata and secondary annotations use `#9A9AA6`, while inactive controls, subtle borders, and structural captions fall back to `#6E6E7C`.
- **Primary Accent (Reverb Violet):** `#A78BFA` serves as the primary interactive and focal point color, brightening to `#C4B5FD` upon hover and blooming into `#7C3AED22` under glow states.
- **Secondary Accents (Spectral Tone & Gear):** Ethereal mint (`#6EE7B7`) drives live indicators, master release statuses, and verified records. Dusty rose (`#F472B6`) is reserved for hardware tags, effect pedal schematics, and sound characteristics.

## Typography

The typographic hierarchy is structured as a deliberate tri-font dialect:

1. **The Literary Voice (Headlines):** `Playfair Display` provides sharp high-contrast transitions, lending gravitas, classic music criticism authority, and poetic elegance to editorial longforms and artist monographs.
2. **The Documentarian Voice (Body):** `Plus Jakarta Sans` delivers clean, modern geometric clarity with open counters, guaranteeing reading ease across dense biographies and reviews without interfering with the display serif.
3. **The Archival Index (Metadata):** `Space Mono` injects technical, ledger-grade utility. Used exclusively for catalog numbers (e.g., `CAD 1012`), release years, audio stems, equipment chains, alt-tunings (e.g., `D-A-D-F#-A-D`), and revision hashes.

Always set metadata labels in full uppercase with tracking (`letter-spacing: 0.08em`) to enforce tabular catalog aesthetics.

## Layout & Spacing

The layout is anchored on an asymmetrical 12-column Swiss grid system intersected by razor-sharp 1px border lines. 

- **Grid Discipline:** Content spans strict column modules: 8 columns for narrative essays, 4 columns for sticky archival technical sidebars, and 3-column matrices for album discographies.
- **Edge-to-Edge Architectural Hairlines:** Grid containers use interior 1px rules (`#27272F`) rather than floating cards with gaps, creating continuous connected cells reminiscent of index registries.
- **Breakpoints & Reflow:**
  - **Desktop (1024px+):** Full 12-column layout with split-screen hero sections, double-bordered metadata headers, and sticky cross-reference tables. Outer margins: `margin` (`3rem`).
  - **Tablet (768px - 1023px):** 8-column layout. Sidebars collapse underneath primary criticism pieces; modular grids drop to 2 columns.
  - **Mobile (<768px):** 4-column layout. Structural borders collapse to horizontal separators; metadata stacks into key-value pairs; margins step down to `margin-mobile` (`1rem`).

## Elevation & Depth

In keeping with neo-editorial brutalism, this design system avoids standard drop shadows and floating rounded surfaces in favor of structural hairline boundaries and atmospheric light diffusion.

- **Level 0 (Deep Ground):** Canvas background `#0E0E11`.
- **Level 1 (Archival Ledger / Default Surface):** `#17171C` framed by a 1px solid border in `#27272F`. No shadow.
- **Level 2 (Active Inspection / Hovered Card):** Surface color shifts to `#1F1F26`. The 1px border transitions to `#A78BFA`.
- **The "Shoegaze Aura" (Radial Haze):** Depth is communicated through atmospheric backdrop glows rather than drop shadows. Modals and featured hero records project an underlying soft radial gradient: `radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.14) 0%, rgba(14, 14, 17, 0) 70%)`.
- **Grain Overlay:** Atmospheric hero treatments incorporate a fine 3% monochromatic SVG noise overlay to evoke physical print grain and magnetic tape hiss.

## Shapes

The primary shape vocabulary is unapologetically sharp (`0px` border radius), reflecting brutalist editorial discipline, index cards, and hardware rack units.

- **Cards, Panels, Inputs, and Modals:** Strict 90-degree corners (`0px`).
- **Tags, System Badges, and Status Chips:** Sharp rectangles (`0px`) with 1px inset or bounding borders.
- **Pill Exception (Waveforms & Sliders):** Circular elements are reserved strictly for actual circular objects: vinyl centers, audio playheads, and rotary knob indicators. All UI containers remain rectangular.

## Components

### Buttons & Interactive Triggers
- **Primary Action (Archive/Play):** Background `#A78BFA`, foreground `#0E0E11`, `0px` radius, font `Space Mono` bold. Hover shifts to `#C4B5FD` with an immediate 2px offset solid outline in `#A78BFA`.
- **Secondary (Catalog / Cite):** Background transparent, 1px border in `#27272F`, text `#F4F4F6`. Hover triggers background `#1F1F26` and border `#9A9AA6`.
- **Destructive / Flag Edit:** Transparent background, 1px border `#F472B6`, text `#F472B6`.

### Chips & Archival Badges
- **Gear / Pedal Tag:** Hairline border `#F472B633`, background `#F472B60D`, text `#F472B6`, `meta-badge` typography.
- **Status / Catalog Code:** Sharp rectangular capsule, background `#1F1F26`, border 1px `#27272F`, text `#9A9AA6`, prefix icon or circle in `#6EE7B7`.

### Input Fields & Search Bars
- **Registry Search:** Flat input container with 1px border `#27272F`, background `#17171C`, text `#F4F4F6`. Placeholder in `#6E6E7C`. On focus, the border turns `#A78BFA` with a subtle interior violet ambient glow (`box-shadow: inset 0 0 12px rgba(167, 139, 250, 0.15)`).

### Cards & Encyclopedic Modules
- **Album / Artist Entry:** Interlocking grid card, 1px right and bottom border `#27272F`. No outer radius or elevation drop-shadow. Cover art is presented raw with sharp edges; hover triggers a 1px border highlight and title transition to `#A78BFA`.
- **Sidebar Data Table:** Key-value pairs arranged with `meta-code` font. Keys rendered in `#6E6E7C`, values in `#F4F4F6`, separated by a dotted 1px rule.

### Checkboxes & Toggle Switches
- **Checkboxes:** 14px by 14px sharp square (`0px` radius). Inactive: 1px border `#6E6E7C`. Active: Solid `#A78BFA` fill with `#0E0E11` square dot centered inside.
- **Wiki Diff / Revision Indicators:** Added content highlighted with low-opacity mint wash (`#6EE7B715`) and mint border-left; deleted content with dusty rose wash (`#F472B615`).

### Audio Player Bar (Persistent Dock)
- Full-bleed bottom dock, 1px top border `#27272F`, background `#0E0E11/95` with 16px backdrop blur. Monospaced track timing, track gain metering in `#6EE7B7`, and scrub bar rendered as a 2px flat track with an electric violet playhead.