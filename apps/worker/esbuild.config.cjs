const { esbuildDecorators } = require('esbuild-decorators');
const { join } = require('path');

module.exports = {
  plugins: [
    esbuildDecorators({
      tsconfig: join(__dirname, 'tsconfig.app.json'),
      cwd: __dirname,
    }),
  ],
};
