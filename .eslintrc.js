module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["tsconfig.json"],
    sourceType: "module"
  },
  ignorePatterns: [
    "/dist/**/*" // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "quote-props": [0, "as-needed"],
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
    "require-jsdoc": "off",
    "comma-dangle": "off",
    "object-curly-spacing": [0, "always"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "new-cap": 0,
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "valid-jsdoc": "off",
    "padded-blocks": "off",
    "no-trailing-spaces": "off",
    "operator-linebreak": "off",
    "guard-for-in": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
};
