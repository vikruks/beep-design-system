# Beep! design system

Beep! is a React Native design system shown in a web Storybook through `@storybook/react-native-web-vite` and react-native-web. Stack: TypeScript, React Native, Storybook 10.

## Commands

- `npm run storybook`: start Storybook at http://localhost:6006
- `npm run typecheck`: TypeScript check
- `npm run build-storybook`: static build into `storybook-static/`
- `npm run tokens`: regenerate `src/tokens/theme.ts` and `src/tokens/components/*.ts` from `src/tokens/tokens.json`

## Rules

### Theme
- **Dark theme only.** Don't add a light theme, theme switching or `useColorScheme`.

### Primitives
- Build components from React Native primitives: `View`, `Text`, `Pressable`.
- No HTML elements (`div`, `span`, `button`) and no web-only CSS. Components have to run on iOS as well as on the web.

### Tokens
- **Every value comes from a token.** Don't hard-code colours, spacing, sizes, radii, font sizes, line heights, opacities or durations in components.
- System-wide values come from the theme in `src/tokens/`. Values specific to one component go in its `Component.tokens.ts`, and those values refer to theme tokens. They don't contain raw numbers or hex codes.
- If a value you need has no token, add the token. Don't inline the value.
- `src/tokens/tokens.json` is exported from the Figma variables, with aliases resolved and the Primitives collection skipped. `theme.ts` and `components/*.ts` are generated from it by `scripts/build-tokens.ts`. **Never edit generated files by hand:** change `tokens.json` or the script, then run `npm run tokens`.
- Use the Figma code syntax names: `theme.color.text.primary`, `theme.component.color.radio.borderSelected`, `theme.componentSize.button.Large.height`.

### States
- **Pressed:** the whole element gets opacity `theme.state.pressed.opacity`. Don't change colours per part.
- **Disabled:** the whole element gets opacity `theme.state.disabled.opacity`, and it doesn't respond to presses.
- Put the opacity on the outer element (for example, the `Pressable` style callback `({ pressed }) => ...`), not on its children.

### Accessibility
- Use the ARIA props (`role`, `aria-label`, `aria-disabled`, `aria-busy`, `aria-hidden`). They work on iOS, Android and web, but react-native-web ignores `accessibilityState.busy` and `accessibilityElementsHidden`.
- Don't pass `disabled` to `Pressable` for loading: it makes screen readers say "dimmed". Ignore the press instead and set `aria-busy`.

### iOS first
- Design and check for iOS first. The web is the preview.
- **Don't set `fontFamily` on iOS**, so the system font (SF Pro) is used.
- **`fontWeight` is a string** (`'400'`, `'600'`), never a number.

## Component structure

Each component has its own folder in `src/components/` with exactly these files:

```
src/components/Button/
├── Button.tsx          # the component
├── Button.tokens.ts    # the component's tokens (they map to theme tokens)
└── Button.stories.tsx  # Storybook stories
```

## Icons

- Icons live in `src/icons/`: `icons.ts` holds SVGs exported from the Figma icon set, and `Icon.tsx` draws them with `react-native-svg`. Components take `icon: IconName`.
- In two-tone icons, `{primary}` replaces the white parts and `{accent}` the yellow parts, so `Icon` can recolour them (`color`, `accentColor`). Brand icons (`fixed: true`) keep their colours.
- To add an icon, export its Figma component as SVG, swap white and yellow for the placeholders, and add it under its Figma name.
- `.storybook/main.ts` sets `shimMissingExports` for dependency pre-bundling, because react-native-svg's web code imports an Android-only module. Don't remove it.

## Docs pages

- Foundations pages (Colors, Typography, Spacing, Radius, Motion) live in `src/docs/foundations/*.mdx`. They're built from `theme.ts` by the blocks in `src/docs/blocks/`, so they update by themselves when tokens change.
- Layout values that only the docs pages use go in `docs` in `src/docs/blocks/shared.tsx`, never in the theme.
- Web font fallback is `-apple-system, Inter, system-ui`. Inter is loaded from Google Fonts in `.storybook/preview-head.html`.

## Stories

- Every Figma component description has a line that starts with **`Stories:`**. Write exactly the stories that line lists, with the same names and in the same order.
- Don't add stories the line doesn't list. If a component has no `Stories:` line, ask before writing stories.
