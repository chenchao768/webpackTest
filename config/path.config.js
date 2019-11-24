const path = require('path')
const glob = require('glob')

//根目录
const ROOT = path.resolve(__dirname,'../');
//开发目录
const SRC = path.resolve(ROOT,'./src');
//node_modules目录
const NODEMODULES = path.resolve(ROOT, 'node_modules');
//视图目录
const VIEWS = path.resolve(SRC, 'view');
//页面目录
let PAGES = glob.sync("*", {
  cwd: VIEWS
});

module.exports = {
  ROOT,
  SRC,
  VIEWS,
  PAGES,
  NODEMODULES,
}