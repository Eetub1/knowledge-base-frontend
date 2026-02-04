import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import react from "eslint-plugin-react"
import reactRefresh from "eslint-plugin-react-refresh"


//TÄÄ LINT KUSEE VITUSTI EMT SAATANA
export default [
    {
        files: ["**/*.{js,jsx}"],
        ignores: ["dist", "node_modules"],
        plugins: {
            "react": react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": "warn",

            "indent": ["error", 4],
            "semi": ["error", "never"],
            "quotes": ["error", "double"],
            "no-trailing-spaces": "error",
            "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
            "eol-last": ["error", "always"],
        },
    },
]
