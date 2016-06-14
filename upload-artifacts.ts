
import * as fs from "fs-extra"
import * as chalk from "chalk"

// Just some test scripts
let files = fs.readdirSync(__dirname)
files.forEach(str => {
  console.log(
    fs.statSync(str).isDirectory() ? chalk.cyan(str) :
    str[0] === '.' ? chalk.grey(str) :
    chalk.red(str)
  )
})
