module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    // "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended",
    "eslint-config-prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2021,
      project: "./tsconfig.json",
    },
    sourceType: "module",
  },
  plugins: ["prettier", "@typescript-eslint", "vue"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    indent: [
      "error",
      2,
      {
        MemberExpression: 0,
      },
    ],
    "@typescript-eslint/no-inferrable-types": "off",
    "prettier/prettier": "warn",
    "no-inferrable-types": "off",
    "no-await-in-loop": "error",
    "no-return-await": "error",
    "no-array-constructor": "error",
    failOnWarning: "off",
    eqeqeq: "error",
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
