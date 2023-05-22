/**
 * @type {import('prettier').Config}
 */
const prettierConfig = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: "as-needed",
  trailingComma: "none",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  htmlWhitespaceSensitivity: "ignore",
  endOfLine: "auto"
}

module.exports = prettierConfig
