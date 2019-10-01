import * as path from 'path';
import { Configuration } from 'webpack';
import { appNodeModules, appSrc, outDir } from '../config/paths';

const config: Configuration = {
  entry: path.resolve(appSrc, 'houston.ts'),
  mode: 'development',
  target: 'node',
  output: {
    path: outDir,
    filename: 'houston.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    modules: ['node_modules', appNodeModules].concat(appSrc || []),
  },
  module: {
    rules: [
      {
        test: /.ts/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
    ],
  }
};

export default config;