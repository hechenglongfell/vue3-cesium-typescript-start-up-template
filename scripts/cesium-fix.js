// 新版cesium解决了这个问题
// 新版 webpack，会检查 cesium 包里面的 package.json 文件中的 exports 字段，cesium 默认不导出 widgets.css 文件，因此
// import 'cesium/Source/Widgets/widgets.css' 会报错，没有样式
// github上此问题的讨论: https://github.com/CesiumGS/cesium/issues/9212
// 解决办法：
// 1.
// 直接去 node_modules 里面的 cesium 包，修改 cesium 包的 package.json 文件，在 exports 中添加："./Source/Widgets/widgets.css": "./Source/Widgets/widgets.css"
// 2.创建本文件
// 然后在 package.json 的所有调试方法前面加上  node ./scripts/cesium-fix.js &&

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
const fileName = require.resolve('cesium/package.json')
console.log(fileName)
try {
  const jsonString = fs.readFileSync(fileName)
  const file = JSON.parse(jsonString)
  file.exports['./Source/Widgets/widgets.css'] = './Source/Widgets/widgets.css'
  fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
    if (err) return console.log(err)
    console.log('writing to ' + fileName)
  })
} catch (err) {
  console.log(err)
}

// try {
//   const globalCssPath = './src/assets/styles/index.css'
//   const baseUrl = 'https://t7.baidu.com/it/'
//   const cssStr = `
// :root {
//   --url1: url('${baseUrl}111111');
//   --url2: url('${baseUrl}22222');
//   --url3: url('${baseUrl}333');
//   --url4: url('${baseUrl}44444');
// }
// `
//   let str = fs.readFileSync(globalCssPath, 'utf8')

//   str = str.replace(
//     /\/\* start style inject \*\/[\s\S]*\/\* end style inject \*\//,
//     ''
//   )

//   const res = fs.writeFileSync(globalCssPath, str + cssStr, 'utf8')
// } catch (err) {
//   console.log(err)
// }
