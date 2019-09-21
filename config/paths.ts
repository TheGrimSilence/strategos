import Chalk from 'chalk';
import { realpathSync } from 'fs';
import * as path from 'path';
import { compilerOptions } from '../tsconfig.json';

export const outDir = path.resolve(__dirname, '..', compilerOptions.outDir);
const appDirectory = realpathSync(process.cwd());
const resolveApp = relativePath => {
  console.log(
    Chalk`{green Using} {blue ${relativePath}} in {blue ${path.resolve(
      appDirectory,
      relativePath
    )}}`
  );

  return path.resolve(appDirectory, relativePath);
};

export const appPath = resolveApp('.');
export const appLib = resolveApp('lib');
export const appTsConfig = resolveApp('tsconfig.json');
export const appPackageJson = resolveApp('package.json');
export const appSrc = resolveApp('src');
export const appNodeModules = resolveApp('node_modules');
