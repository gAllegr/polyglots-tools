module.exports = {
  ...require('gts/.prettierrc.json'),
  trailingComma: 'none',
  bracketSpacing: true,
  overrides: [
    {
      files: '**/*.json',
      options: {
        singleQuote: false
      }
    }
  ]
};
