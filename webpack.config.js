const CleanWebpackPlugin = require('clean-webpack-plugin');
const BannerPlugin = require('webpack').BannerPlugin;
const getBanner = require('./build/banner');
const path = require('path');

const baseConfig = {
  entry: path.join(__dirname, 'src', 'xHouston.ts'),
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'awesome-typescript-loader', options: { useCache: false } },
        ],
        exclude:[]
      },
    ],
  },
  output: {
    filename: 'xHouston.js',
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BannerPlugin({ banner: getBanner() }),
  ],
  resolve: {
    extensions: ['.ts'],
    modules: [path.resolve('src'), path.resolve('node_modules')],
  },
};

module.exports = baseConfig;
