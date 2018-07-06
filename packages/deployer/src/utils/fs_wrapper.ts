import * as fs from 'fs'
import { promisify } from '@0xproject/utils'

export const fsWrapper = {
  readdirAsync: promisify<string[]>(fs.readdir),
  readFileAsync: promisify<string>(fs.readFile),
  writeFileAsync: promisify<undefined>(fs.writeFile),
  mkdirAsync: promisify<undefined>(fs.mkdir),
  doesPathExistSync: fs.existsSync,
  rmdirSync: fs.rmdirSync,
  removeFileAsync: promisify<undefined>(fs.unlink)
}
