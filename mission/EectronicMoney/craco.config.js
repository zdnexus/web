/**
 * Created by zhongdong on 2023/2/25
 * Url :
 */

const sassResourcesLoader = require('craco-sass-resources-loader')
const path = require('path')
const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
    alias: {
      '@': pathResolve('src'),
    },
  },
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: './src/css/index.scss',
      },
    },
  ],
  style: {
    postcss: {
      mode: 'extends',
      loaderOptions: {
        postcssOptions: {
          ident: 'postcss',
          plugins: [
            require('postcss-px-to-viewport')({
              unitToConvert: 'px',    // 需要转换的单位，默认为"px"
              viewportWidth: 1440,    // 设计稿的视窗宽度
              unitPrecision: 3,       // 单位转换后保留的精度
              propList: ['*'],        // 能转化为 vw 的属性列表
              viewportUnit: 'vw',     // 希望使用的视窗单位
              fontViewportUnit: 'vw', // 字体使用的视窗单位
              selectorBlackList: [],  // 需要忽略的 CSS 选择器，不会转为视窗单位，使用原有的 px 等单位
              minPixelValue: 1,       // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
              mediaQuery: false,      // 媒体查询里的单位是否需要转换单位
              replace: true,          // 是否直接更换属性值，而不添加备用属性
              exclude: undefined,     // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
              include: /\/src\//,     // 如果设置了include，那将只有匹配到的文件才会被转换
              landscape: false,        // 是否添加根据 landscapeWidth 生成的媒体查询条件
              landscapeUnit: 'vw',    // 横屏时使用的单位
              landscapeWidth: 750,    // 横屏时使用的视窗宽度
            })
          ]
        }
      }
    }
  }
}
