import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // ─────────────────────────────────────────
  // Ignored paths
  // ─────────────────────────────────────────
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "public/models/**",   // face-api.js model weights
      "*.config.js",
      "*.config.ts",
    ],
  },

  // ─────────────────────────────────────────
  // Base JS recommended rules
  // ─────────────────────────────────────────
  js.configs.recommended,

  // ─────────────────────────────────────────
  // TypeScript rules
  // ─────────────────────────────────────────
  ...tseslint.configs.recommended,

  // ─────────────────────────────────────────
  // React + Browser globals
  // ─────────────────────────────────────────
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // ── React Hooks ──────────────────────
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // ── TypeScript ───────────────────────
      "@typescript-eslint/no-explicit-any": "warn",         // Avoid `any` types
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },                        // Allow _unused args
      ],
      "@typescript-eslint/no-non-null-assertion": "warn",   // Avoid non-null `!`
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-empty-object-type": "warn",

      // ── General Code Quality ─────────────
      "no-console": ["warn", { allow: ["warn", "error"] }], // No console.log in prod
      "no-debugger": "error",                               // No debugger statements
      "no-duplicate-imports": "error",                      // No duplicate imports
      "prefer-const": "error",                              // Use const over let
      "no-var": "error",                                    // No var declarations
      "eqeqeq": ["error", "always"],                        // Always use === not ==
      "curly": ["error", "all"],                            // Always use curly braces
    },
  },

  // ─────────────────────────────────────────
  // Server-side (Node/Express) overrides
  // ─────────────────────────────────────────
  {
    files: ["server.ts", "api/**/*.ts"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "no-console": "off",   // Allow console.log in server files
    },
  }
);
