const pkg = require('../package.json');

const currentYear = new Date().getFullYear();

function getBanner() {
  return `xHouston v${pkg.version} (${pkg.repository})
Copyright ${currentYear} ${pkg.author}
Licensed under MIT (${pkg.repository}/blob/master/LICENSE)`;
}

module.exports = getBanner;
