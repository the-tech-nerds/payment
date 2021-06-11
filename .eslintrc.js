module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    '@the-tech-nerds/eslint-config'
  ],
  rules: {
    "nest/max-attributes-per-line": "off"
  },
};
