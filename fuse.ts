import { FuseBox, Sparky } from 'fuse-box';

Sparky.task('default', () => {
  const fuse = FuseBox.init({
    homeDir: 'src',
    output: 'lib/$name.js',
    target: 'npm@es6',
    cache: false,
  });

  fuse.bundle('xhouston').instructions('> command.ts');
  fuse.run();
});
