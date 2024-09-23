import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        process: 'readonly',
      },
    },
    rules: {
      "react/prop-types": "off",
      "semi": ["error", "always"],
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];