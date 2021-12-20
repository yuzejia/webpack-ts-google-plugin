import path from "path"
import fs from "fs"


class MyMainfestPlugin {

  constructor(options = {}) {
    console.log(options)

  }
  apply(compiler) {

    // 在 compilation 完成时执行。这个钩子 不会 被复制到子编译器
    compiler.hooks.done.tap("Plugin", (compilation, compilationParams) => {


        const mainText = fs.readFileSync("./src/manifest.json", "utf-8")
        const mainTextObj = JSON.parse(mainText)

        const _backgroundScripts = mainTextObj.background.scripts

        const _backgroundScripJs = _backgroundScripts.join().replace(/ts/g, "js").split(",")
        console.log("mainTextObj.background.scripts 替换成功 ~~", _backgroundScripJs)

        const _contentScriptsJs = mainTextObj.content_scripts[0].js.join().replace(/ts/g, "js").split(",")
        console.log("mainTextObj.content_scripts[0].js 替换成功 ~~", _contentScriptsJs)

        // 回写 
        mainTextObj.background.scripts = _backgroundScripJs

        mainTextObj.content_scripts[0].js = _contentScriptsJs

        console.log("manifest.json ==", mainTextObj)
        console.log("开始写入manifest.json~~~")

        fs.writeFileSync("./dist/manifest.json", JSON.stringify(mainTextObj))

        console.log("manifest.json写入完成~~~")

        console.log("manifest.json 编译完成~~~")


    })
  }

}

export default MyMainfestPlugin