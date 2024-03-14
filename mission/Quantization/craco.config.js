/**
 * Created by zhongdong on 2024/3/11
 * Url :
 */

const path = require('path')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.output.publicPath = './'
      return webpackConfig
    },
    alias: {
      '@': pathResolve('src'),
    },
  }
}