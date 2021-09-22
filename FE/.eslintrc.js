module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    'plugin:vue/vue3-recommended',
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
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
  plugins: ["@typescript-eslint","vue"],
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
    "@typescript-eslint/no-inferrable-types":"off",
    "no-inferrable-types": "off",
    "no-await-in-loop": "error",
    "no-return-await": "error",
    "no-array-constructor": "error",
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
