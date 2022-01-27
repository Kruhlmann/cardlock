module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "./node_modules/gts/",
        "plugin:@typescript-eslint/recommended",
        "plugin:unicorn/recommended",
    ],
    env: {
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    plugins: ["eslint-plugin-tsdoc", "unicorn", "simple-import-sort", "import"],
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        quotes: ["warn", "double"],
        "node/no-unpublished-import": 0,
        "tsdoc/syntax": "error",
        "no-process-exit": 0,
        "unicorn/filename-case": "off",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        "max-len": ["error", { code: 120 }],
    },
};
