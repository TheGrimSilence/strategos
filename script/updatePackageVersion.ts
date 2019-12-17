import { readFileSync, writeFileSync } from 'fs';
import { rootPath } from 'get-root-path';
import { join } from 'path';

const sourcePackageFileName = join(rootPath, 'package.json');
const destinationPackageFileName = join(rootPath, 'dist/package.json');
const sourcePackage = JSON.parse(readFileSync(sourcePackageFileName, 'utf-8'));
const destinationPackage = JSON.parse(readFileSync(destinationPackageFileName, 'utf-8'));

destinationPackage.version = sourcePackage.version;

writeFileSync(
  destinationPackageFileName,
  JSON.stringify(destinationPackage, null, '  '),
  'utf-8'
);
