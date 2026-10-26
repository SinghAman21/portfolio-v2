# Workspace desktop

Run `pnpm dev`, then open `/` or `/workspace`. The original portfolio remains at `/portfolio`. The desktop is the entry screen; the laptop, dock, and `design-inspo` shortcut open the same application.

## Modules

- `WorkspaceOS.tsx`: persistent host, camera transition, app switching, and keyboard shortcuts.
- `WorkspaceDesktop.tsx`: illustrated desktop, laptop screen, live charging cables and switch, notes, and shortcuts.
- `SystemChrome.tsx`: clock, network/power status, system menu, and application dock.
- `ApplicationShell.tsx`: compact application frame and return-home controls.
- `DesignInspo.tsx`: full-viewport illustration library, compact gallery, search, filters, comparison, and focus mode.
- `Terminal.tsx`: persistent resizable command window, input history, completion, and output.
- `commandRegistry.ts`: typed command definitions and parser. Add commands here to extend execution, help, and completion together.
- `appRegistry.ts`: application navigation entries, tools, and notes.
- `useWorkspaceState.ts`: validated session state, URL serialization, and browser history synchronization.
- `UtilityApps.tsx`: Files, Notes, Tools, and Settings.
- `workspace-os.css`: viewport layout, camera animations, neutral application theme, mobile dock, and responsive illustration framing.
- `../illustration/renderers/`: existing 27 independent artwork implementations. They remain separate from the operating environment.

The root layout uses `components/PortfolioChrome.tsx` to preserve the existing footer, keyboard navigation, and mascot on conventional portfolio pages while excluding them from `/` and `/workspace`.

## State and navigation

The active application, style selection, search, category, and comparison are reflected in query parameters. Examples:

```
/workspace?app=design-inspo&style=3
/?app=design-inspo&style=27&compare=1&with=vintage-engraving
/workspace?app=files
```

Gallery, power, appearance, file location, note, and terminal visibility persist in session storage. Terminal history and output use separate capped session stores. Storage failures fall back to memory. Returning to the desktop preserves application state. Browser Back cancels an in-progress transition before restoring URL state.

Opening the laptop measures the actual screen rectangle and expands the app from that position over 720 ms while zooming the room behind it. Returning home reverses the transition in 680 ms. Reduced-motion preferences bypass the camera animation.

The terminal remains mounted independently of the active application. Its top border can be dragged to resize; keyboard users can focus the separator and use Up/Down. Ctrl + backquote toggles it, including when no desktop object has focus. Escape closes the terminal, note, or app in that order. Focused artwork uses a native dialog with its own Escape and focus behavior.

## Commands

```
help
home
open design-inspo
open files
apps
styles
style 3
style "Technical Ink Illustration"
search blueprint
tools
power off
history
clear
exit
```

Aliases, quoted arguments, unknown commands, and invalid values are supported. Tab completes command and application names; Up/Down recall history; Ctrl + L clears output. This is a client-side application command hub and does not provide arbitrary shell or filesystem access.

## Artwork

`public/illustration/workspace-desktop.webp` is purpose-created technical ink artwork generated with the built-in image tool. The laptop display, device charging states, plugged cables, switch, and interactive targets are live HTML/SVG overlays. They share the same 8:5 framing as the artwork. On narrow screens, the scene crops around the laptop and provides separate entry, power, and note controls.

Generation brief: A meticulous architectural technical ink illustration of a creative developer’s room, wide 16:10 front three-quarter view; fine black contours, dense cross-hatching and stippling on warm ivory paper; wooden desk, chair offset left, central dark laptop screen, a large left window casting geometric shadows, pinned notes, books, notebooks, pens, upright phone, and an empty socket plate at the right. No people, characters, mascots, interface chrome, text, or cables; cables and power controls are drawn as live vectors. The full prompt specified the screen and socket placement to support the overlay coordinates.

The three existing complex style assets and the 24 SVG renderers are documented in `../illustration/README.md`. Photobashing is generated art depicting a photographic composite; clay and cinematic are fixed artwork rather than interactive 3D models.

## Verification

```
npm run test:workspace
./node_modules/.bin/tsc --noEmit --incremental false
```

Tests cover command selection for all 27 styles, navigation/state isolation, search, power, parser errors, history/aliases, URL roundtrips, invalid persisted state, desktop rendering, comparison rendering, and utility application states. No browser or build verification was run, following the user's instruction. Camera timing, touch interaction, and pixel-level responsive layout still need a browser pass.
