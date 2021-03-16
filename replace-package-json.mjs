import * as fs from 'fs';
import assert from 'assert';

const pkgPath = 'node_modules/utils-ts/package.json';
const packageJson = JSON.parse(fs.readFileSync(pkgPath, { encoding: 'utf-8' }));

// "exports": {
//   ".": {
//     "import": "./dist/utils-ts.mjs",
//     "require": "./dist/utils-ts.cjs",
//     "default": "./dist/utils-ts.cjs"
//   }
// },

assert.deepStrictEqual(packageJson.exports['.'], {
  // 在这里，我们的 import 在最前面
  import: './dist/utils-ts.mjs',
  require: './dist/utils-ts.cjs',
  default: './dist/utils-ts.cjs',
});

const newPackageJson = {
  ...packageJson,
  exports: {
    '.': {
      require: './dist/utils-ts.cjs',
      default: './dist/utils-ts.cjs',
      // 在这里，我们把 import 放到了最后
      import: './dist/utils-ts.mjs',
    },
  },
};

// 并把修改后的 packageJson 重新写入
fs.writeFileSync(pkgPath, JSON.stringify(newPackageJson, null, 2));
