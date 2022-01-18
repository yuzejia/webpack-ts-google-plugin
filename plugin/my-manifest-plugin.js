import fs from "fs"


class MyManifestPlugin {

  constructor(options = {}) {
    console.log("options", options)

  }
  apply(compiler) {

    // 在 compilation 完成时执行。这个钩子 不会 被复制到子编译器
    compiler.hooks.done.tap("Plugin", (compilation, compilationParams) => {


        const mainText = fs.readFileSync("./src/manifest.json", "utf-8")
        const mainTextObj = JSON.parse(mainText)

        const _backgroundScripts = mainTextObj.background.scripts

        const _backgroundScripJs = _backgroundScripts.join().replace(/ts/g, "js").split(",")

        const _contentScriptsJs = mainTextObj.content_scripts[0].js.join().replace(/ts/g, "js").split(",")

        // 回写 
        mainTextObj.background.scripts = _backgroundScripJs

        mainTextObj.content_scripts[0].js = _contentScriptsJs

        fs.writeFileSync("./dist/manifest.json", JSON.stringify(mainTextObj, "", "\t"))

        console.log("manifest.json 编译完成~~~")


    })
  }

}

export default MyManifestPlugin