import { FlatCompat } from "@eslint/eslintrc"
import js from "@eslint/js"
import path from "node:path"
import { fileURLToPath } from "node:url"

import eslintConfigPrettier from "eslint-config-prettier"
import jm from "@josephmark/eslint-config"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const airbnbConfig = compat.extends("airbnb")
const noImportConfig = airbnbConfig.filter(({ plugins }) => !plugins?.import)

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...noImportConfig,
  ...compat.extends("airbnb/hooks"),
  eslintConfigPrettier,
  ...jm,
  {
    name: "@josephmark/eslint-config-react:rules",
    rules: {
      "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
      // https://github.com/yannickcr/eslint-plugin-react/issues/1009
      "react/require-default-props": [
        "error",
        {
          ignoreFunctionalComponents: true,
        },
      ],
      "react/prop-types": "off", // Since we're using Typescript
      "react/react-in-jsx-scope": "off", // https://github.com/vercel/next.js/blob/canary/docs/upgrading.md#react-16-to-17
      "react/jsx-props-no-spreading": "off",
      "react/function-component-definition": "off",
      "react/display-name": ["off"],
      "jsx-a11y/label-has-associated-control": ["error", { assert: "either" }],
    },
  },
  {
    name: "@josephmark/eslint-config-react:global",
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
]
