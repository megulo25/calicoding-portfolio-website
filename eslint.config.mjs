// =============================================================================
// Foundry Tech — ESLint Configuration
// =============================================================================
//
// Guardrails:
//  - `@typescript-eslint/no-explicit-any`  → Banned. Use `unknown` + narrowing.
//  - `@typescript-eslint/no-unused-vars`   → Error, except args prefixed with `_`.
//  - `@typescript-eslint/consistent-type-imports` → Enforce `import type { … }`.
//  - `react-hooks/exhaustive-deps`         → Error (not warn).
//
// Run `bun run check` (typecheck + lint) before every phase sign-off.
// =============================================================================

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // Foundry Tech — strict overrides
  {
    rules: {
      // Ban `any` — forces proper typing throughout the codebase
      "@typescript-eslint/no-explicit-any": "error",

      // Flag unused variables/imports — allow `_` prefix for intentionally unused args
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      // Enforce `import type { … }` for type-only imports (reduces bundle size)
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // Catch missing hook dependencies as errors, not warnings
      "react-hooks/exhaustive-deps": "error",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
