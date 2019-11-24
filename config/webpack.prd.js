const path = require('path')
const DIR = require('./path.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.base')
const merge = require('webpack-merge')
const build = require('../config')



let prdConfig = {
  mode:'production',
  entry:()=>{
    let str = DIR.PAGES.filter(item => {
      return item === build.dist.buildPage
    })[0]
    if(str){
      let obj = {};
      obj[`${str}`] = baseConfig.entry[str]
      return obj
    }else {
      return baseConfig.entry
    }

  },
  output: {
    path: path.resolve(__dirname,'../dist'),//在打包中publicPath只是会替换引用资源的路径，不会对output产生影响
    publicPath:'../',
    filename: "js/[name].bundle.js",
  },
  devtool: 'cheap-module-eval-source-map',
  plugins:[
    new CleanWebpackPlugin(),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          drop_debugger: false,
          drop_console: true
        }
      }
    })
  ]
}

console.log(process.env.npm_config_report)
if (process.env.npm_config_report) {
  // 打包后模块大小分析  npm run build --report
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  prdConfig.plugins.push(new BundleAnalyzerPlugin())
}


module.exports = merge(baseConfig,prdConfig)
