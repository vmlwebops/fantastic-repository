
import * as fs from "fs-extra"
import * as chalk from "chalk"

console.log(chalk.underline("_"), chalk.reset("_"))

// Just some test scripts
let files = fs.readdirSync(__dirname)
files.forEach(str => {
  console.log(
    fs.statSync(str).isDirectory() ? chalk.cyan(str) :
    str[0] === '.' ? chalk.grey(str) :
    chalk.red(str)
  )
})

fs.writeFileSync("files.stats.json", JSON.stringify(files), "utf8")
