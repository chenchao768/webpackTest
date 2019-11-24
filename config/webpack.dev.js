const path  = require('path')
const webpack = require('webpack')
const ip = require('ip')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const baseServer = {
  port:8888,
}

const devConfig = {
  mode:'development',
  output: {
    path: path.resolve(__dirname,'../dist'),//在打包中publicPath只是会替换引用资源的路径，不会对output产生影响
    filename: "js/[name].bundle.js",
  },
  plugins:[
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo:{
        notes:['编译编译编译成功！！！！','fuck webpack!'],
        messages:[
          '启动应用:',
          `- Local: http://localhost:${baseServer.port}`,
          `- Local: http://${ip.address()}:${baseServer.port}`
        ]
      }
    })
  ],
  devtool: '#eval-source-map',
  devServer:Object.assign(baseServer,{
    contentBase: path.join(__dirname,'../src/view/index'),
    publicPath: '/',
    //hot:true,
    compress: true,
    historyApiFallback: true,
    overlay:{
      error:true,
      warnings:true
    },
    host: ip.address(),
    open: false,
    noInfo: true, // 隐藏输出
    quiet: true, // 清空控制台输出
    inline: true, // 浏览器刷新
    proxy: {
      '/proxy': {
        target: 'http://your_api_server.com',
        changeOrigin: true,
        pathRewrite: {
          '^/proxy': ''
        }
      }
    }, //假设你主机名为 localhost:8080 , 请求 API 的 url 是 http：//your_api_server.com/user/list
      //'/proxy'：如果点击某个按钮，触发请求 API 事件，这时请求 url 是http：//localhost:8080/proxy/user/list 。
      //changeOrigin：如果 true ，那么 http：//localhost:8080/proxy/user/list 变为 http：//your_api_server.com/proxy/user/list 。但还不是我们要的 url 。
      //pathRewrite：重写路径。匹配 /proxy ，然后变为'' ，那么 url 最终为 http：//your_api_server.com/user/list 。
    //这里理解成用‘/proxy’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/list/user/add’即
  })
}

module.exports = merge(baseConfig,devConfig)

