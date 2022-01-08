module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
        parser: "babel-eslint",
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "prettier/prettier": ['error', {
            singleQuote: false,
            semi: true,
            useTabs: false,
            tabWidth: 4,
            trailingComma: 'all',
            printWidth: 90,
            bracketSpacing: true,
            arrowParens: 'avoid',
            endOfLine: 'auto',
        }]
    },
    overrides: [
        {
            files: [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)",
            ],
            env: {
                jest: true,
            },
        },
    ],
};
