const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  plugins: { add: [new NodePolyfillPlugin({ excludeAliases: ['console'] })] },
  resolve: { modules: ['node_modules'] },
  node: { fs: 'empty' },
};
