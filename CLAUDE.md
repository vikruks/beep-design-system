# Beep! design system

Beep! is a React Native design system shown in a web Storybook through `@storybook/react-native-web-vite` and react-native-web. Stack: TypeScript, React Native, Storybook 10.

## Commands

- `npm run storybook`: start Storybook at http://localhost:6006
- `npm run typecheck`: TypeScript check
- `npm run build-storybook`: static build into `storybook-static/`

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

### States
- **Pressed:** the whole element gets opacity `theme.state.pressed.opacity`. Don't change colours per part.
- **Disabled:** the whole element gets opacity `theme.state.disabled.opacity`, and it doesn't respond to presses.
- Put the opacity on the outer element (for example, the `Pressable` style callback `({ pressed }) => ...`), not on its children.

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

## Stories

- Every Figma component description has a line that starts with **`Stories:`**. Write exactly the stories that line lists, with the same names and in the same order.
- Don't add stories the line doesn't list. If a component has no `Stories:` line, ask before writing stories.
