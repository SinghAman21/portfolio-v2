# Illustration Style Explorer

The renderer collection powers the `design-inspo` application inside the workspace desktop. Run `pnpm dev`, visit `/workspace`, and click the laptop, or open `/workspace?app=design-inspo&style=3` directly. See `../workspace-os/README.md` for the operating environment. The standalone `IllustrationExplorer.tsx` remains available as a reusable reference-library shell.

## Structure

- `types.ts`: stable renderer contract and metadata schema.
- `styleRegistry.ts`: 27 stable IDs, original numbering, group membership, searchable metadata, and explicit lazy imports.
- `IllustrationExplorer.tsx`: selection, search/filter state, theme, navigation, comparison, reset, and native focus dialog.
- `IllustrationStage.tsx`: isolated loading/error boundaries and viewport-triggered previews.
- `StyleGallery.tsx`, `StyleSearch.tsx`, `StyleInfoPanel.tsx`, `StyleComparison.tsx`: shared presentation.
- `renderers/`: one independent implementation for each style. Primitives share only framing and small drawing utilities, not a generic scene renderer.
- `/public/illustration/`: replaceable optimized artwork for clay, cinematic, and photobashing.

All renderers accept `RendererProps`: `subject`, `variant`, optional dimensions, and `reducedMotion`. SVG IDs are scoped with `useId`, allowing the same artwork in the stage, gallery, comparison, and focus dialog simultaneously. Stippling lowers its dot count in gallery previews. Asset renderers use native lazy image loading for previews.

To add a style, create its renderer and add a lazy import plus metadata in the registry. Navigation, totals, category filtering, search, gallery, and comparison derive from that registry.

The native dialog supports Escape, focus containment, close controls, and focus restoration. The preview supports Left/Right, Home, and End. Search matches all entered terms across names, descriptions, characteristics, use cases, and rationale. Motion respects the system preference.

## Artwork provenance

Three independent artworks were created using the built-in image-generation tool, then encoded as WebP with the existing local image encoder. No external runtime image service is required. The photobashing artwork is a generated interpretation of photographic compositing, rather than a source-photograph project with editable layers. Clay is a raster miniature, not a live 3D scene. Technical dimensions and exposed components are illustrative, not fabrication data.

Final assets:

- `/public/illustration/clay.webp`
- `/public/illustration/cinematic.webp`
- `/public/illustration/photobashing.webp`

### Generation prompt set

Shared subject: “A creative developer workspace: sturdy wooden desk, ergonomic chair, central open laptop, large window at left, sticky notes on wall, stacked books, notebook and pens, upright mobile phone on a stand to the right, two charging cables running from a wall socket. No people. Full room vignette, front three-quarter view, wide landscape 3:2 composition, every object inside frame, no text or watermarks.”

Clay direction: “Exquisite handmade 3D CLAY miniature, rounded sculpted shapes, tactile matte clay, tiny fingerprints, sage green laptop, apricot wall, dusty blue chair, soft ivory ground, convincing ambient occlusion, soft studio lighting. Clearly a sculpted material world, premium editorial render.”

Cinematic direction: “CINEMATIC TECHNICAL illustration, painstaking industrial details, wide moody composition, deep navy shadows, dramatic amber sunlight beams through blinds, laptop cool light, subtle airborne dust, precision render with edge tracing and faint drafting lines, premium cinematic concept art. Strong focus at desk.”

Photobashing direction: “PHOTOBASHING mixed photographic concept composition. Real photographed wood grain, worn fabric ergonomic chair, photographic laptop hardware, architectural photography window, warm natural light, subtly visible torn photographic layers and taped film edges around the perimeter; convincingly integrated camera perspective and unified exposure. Analog contact-sheet cues, polished atmospheric art direction.”

The remaining 24 illustrations are independently authored vector compositions. They do not use recoloring or filtering of a shared image.
