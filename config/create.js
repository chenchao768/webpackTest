const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const DIR = require('./path.config')

const arg = process.argv.slice(2).join('')

if(!arg){
  console.log(chalk.red('请输入目录名称'))
  return
}

if(fs.existsSync(path.join(DIR.VIEWS,arg))){
  console.log(chalk.red('该目录已存在'))
  return
}

try{
  fs.mkdirSync(path.join(DIR.VIEWS,arg));
  console.log(chalk.green(`${arg}目录创建成功`))
}catch (e) {
  console.log(chalk.red(`${arg}目录创建失败`))
}

try{
  console.log(path.join(DIR.VIEWS,arg)+'/index.html')
  fs.writeFileSync(path.join(DIR.VIEWS,arg)+`/${arg}.html`,
      `<!DOCTYPE html>
        <html>
        <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title></title>
  </head>
  <body>
  </body>
  </html>`
  )
  console.log(chalk.green('html创建成功!  (＾－＾)V'))
}catch (e) {
  console.log(chalk.red('创建html失败!  (┬＿┬)'))
}

try {
  fs.writeFileSync(path.join(DIR.VIEWS,arg)+'/main.js','import {setRem} from "../../utils/setRem";')
  console.log(chalk.green('入口js创建成功!'))

}catch (e) {
  console.log(chalk.red('创建入口js失败！'))
}

