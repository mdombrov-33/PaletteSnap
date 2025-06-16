# PaletteSnap

![Palette Editor Screenshot](./public/palette-editor.png)

Next.js-based interactive color palette editor that extracts colors from images and helps users create accessible, harmonious palettes for web and UI design projects.

## What is this?

This tool lets you upload an image and automatically extracts prominent colors. You can tweak these colors directly through the UI to refine your palette. The system dynamically assigns semantic roles to the colors — such as **primary**, **background**, and multiple **foreground** colors — to help build balanced and accessible palettes.

## Key Features

- **Automatic Color Extraction:** Upload an image and get a set of extracted colors to work with
- **Role Assignment:** Colors are assigned meaningful roles based on luminance and contrast relationships
- **Real-time Color Editing:** Modify colors with color pickers; roles and previews update dynamically
- **Accessibility Contrast Checks:** Foreground colors are tested against the background for WCAG-compliant contrast ratios, with clear pass/fail feedback
- **Live Preview:** Instantly see how your palette looks in example UI components
- **Export Options:** Export your finalized palette in various formats

## How It Works (Simplified)

1. **Extract Colors:** Upload an image to extract a raw array of hex color codes.
2. **Assign Roles:** Colors are assigned roles based on luminance and visual prominence:
   - **Background:** Typically the lightest or most neutral color.
   - **Primary:** The most visually dominant or brand-appropriate color.
   - **Foreground:** Colors selected for text and UI elements to ensure readability.
3. **Dynamic Updates:** Tweaking any color triggers recalculation of roles to maintain harmony and accessibility.
4. **Accessibility Checks:** Contrast ratios between foreground and background colors are computed to confirm WCAG compliance.
