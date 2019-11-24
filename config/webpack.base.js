const path = require('path')
const glob = require('glob')
const DIR = require('./path.config.js')
const minCssExtractPlugin = require('mini-css-extract-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const purifyCssPlugin = require('purifycss-webpack')
const build = require('../config')
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({size:5})

function getEntry(){
  let entryObj = {};
  glob.sync('./src/view/*/main.js').map((file,index) => {
    let name = DIR.PAGES[index]
    entryObj[name] = file
  })
  return entryObj
}

const baseConfig = {
  entry: getEntry(),
  module: {
    rules: [
      {
        test:/\.less$/,
        include:[DIR.SRC],
        exclude:/node_modules/,
        use:process.env.NODE_ENV === 'production' ?
            [{loader:minCssExtractPlugin.loader},'css-loader', {
              loader:'postcss-loader',
              options: {
                sourceMap:true
              }
            },
              'less-loader',] :
            ['style-loader','css-loader', {
              loader:'postcss-loader',
              options: {
                sourceMap:true
              }
            },
              'less-loader',]
      },
      {
        test:/\.js$/,
        include:[DIR.SRC],
        //loader:'babel-loader',
        use:['happypack/loader?id=babel'],
        exclude:/node_modules/,
       /* options: {
          cacheDirectory:true
        }*/
      },
      {
        test: /\.(png|jpe?g|gif|svg|icon)(\?.*)?$/,
        include:[DIR.SRC],
        use: {
            loader:'url-loader',
            options: {
              limit:15000,
              fallback:'file-loader',
              publicPath:'../imgs',//这边指定publicPath,此时资源引入=此处的publicPath+文件名(我的理解此处指定完publicpath的话资源路径与下方的outpath无关了)
              outputPath:'imgs/',//这边的path是基于output中的path为基准
              //打包之后文件放置的文件，对于output的publicPath理解，在文件中的引用路径拼接规则 = output.publicPath+outputPath+文件名
              name:'[name].[hash:8].[ext]'
            }
          }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5 * 1024,
              publicPath: '../medias',
              outputPath: 'medias'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5 * 1024,
              publicPath: '../fonts',
              outputPath: 'fonts'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src', 'audio:src', 'video:src', 'source:src'],
            minimize: true
          }
        }
      }

    ]
  },
  resolve: {
    alias: {
      '@S':DIR.ROOT,
      '@V':DIR.VIEWS,
    },
    extensions: ['.js', '.css', '.scss','.less']
  },
  optimization: {
    splitChunks:{
      chunks: "initial",//可以有三个取值async:在入口中有异步动态引入的东西，并且引入的东西中也会拆分chunk，initial是直接根据入口来进行拆分异步引入不会再次拆分，all是两者都有
      maxAsyncRequests:5,//一个入口可拆分出的最大数值（不包括入口）
      cacheGroups:{
        vendors: {//此处是默认分出node_modules中为一个vendor的chunk，比如在入口中引入了像vue,react框架之类的，设为最高权重
          test: /[\\/]node_modules[\\/]/,
          name:'vendor',
          priority: -10
        },
        common: {//此处是将入口中的引入的文件大于2个时进行拆分，如果有两个规则都匹配就按权重来
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name:'common'
        }
      }
    }
  },
  plugins: [
    new purifyCssPlugin({
      paths:glob.sync(path.join(__dirname,'../src/view/*/*.html'))
    }),
    new HappyPack({
      id:'babel',
      loaders:['babel-loader?cacheDirectory=true'],
      threadPool:happyThreadPool,
    }),
    new minCssExtractPlugin({
      filename:'css/[name].[hash:8].css'   //输出的css文件名，放置在dist目录下
    })
  ]
}

function getTemplate(str){
  let config = {
    template: `./src/view/${str}/${str}.html`,
    filename: process.env.NODE_ENV === 'development' ? `${str}.html` : `html/${str}.html`,
    inject: true,
    hash: false,
    chunks: ['vendor', 'common', `${str}`],
    minify: process.env.NODE_ENV === 'development' ?
        false : {
          removeComments: true, // 移除HTML中的注释
          collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
          removeAttributeQuotes: true // 去除属性引用
        }
  }
  return config
}

let plugin = []
DIR.PAGES.forEach(name => {
  if(process.env.NODE_ENV === 'production' && build.dist.buildPage) {
    name === build.dist.buildPage ? plugin.push(new htmlWebpackPlugin(getTemplate(name)))
        : null
  }else {
    plugin.push(new htmlWebpackPlugin(getTemplate(name)))
  }
  baseConfig.plugins.push(...plugin)
})




module.exports = baseConfig