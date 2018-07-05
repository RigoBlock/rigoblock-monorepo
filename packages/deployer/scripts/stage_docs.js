'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
let monorepo_scripts_1 = require('@0xproject/monorepo-scripts')
let packageJSON = require('../package.json')
let tsConfigJSON = require('../tsconfig.json')

let cwd = __dirname + '/..'
// tslint:disable-next-line:no-floating-promises
monorepo_scripts_1.postpublishUtils.publishDocsToStagingAsync(
  packageJSON,
  tsConfigJSON,
  cwd
)
//# sourceMappingURL=stage_docs.js.map
