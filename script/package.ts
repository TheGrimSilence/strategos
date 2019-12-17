import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import { rootPath } from 'get-root-path';
import { join } from 'path';

copyFileSync(
  join(rootPath, 'package.json'),
  join(rootPath, 'dist/package.json')
);

copyFileSync(
  join(rootPath, 'README.md'),
  join(rootPath, 'dist/README.md'),
);

const pkg = JSON.parse(readFileSync('dist/package.json', 'utf-8'));

delete pkg.private;
delete pkg.scripts;
delete pkg.devDependencies;

writeFileSync(
  join(rootPath, 'dist/package.json'),
  JSON.stringify(pkg, null, '  '),
  'utf-8'
);
