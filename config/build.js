const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.prd')

const spinner = ora('loading')
spinner.start()

webpack(webpackConfig,(err,stats) => {
  //
  if(err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
  if (stats.hasErrors()) {
    console.log(chalk.red('打包失败(┬＿┬).\n'))
    process.exit(1)
  }

  console.log(chalk.green('打包成功╰(￣▽￣)╮.\n'))
  spinner.stop();

})