module.exports = {
    parser: "@typescript-eslint/parser",
    root: true,
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended"
    ],
    plugins: ["@typescript-eslint"],
    rules: {
      "no-console": 1,
      "no-debugger": 1,
      "@typescript-eslint/indent": 0,
      "no-undef": 0, // https://github.com/eslint/typescript-eslint-parser/issues/437#issuecomment-435526531
      "import/no-named-as-default": 0, // https://github.com/benmosher/eslint-plugin-import/issues/544
      "@typescript-eslint/no-empty-interface": 0,
      "@typescript-eslint/no-explicit-any": 0,
      "@typescript-eslint/indent": 0, // confilict with prettier
      "@typescript-eslint/camelcase": 0
    }
  };
  