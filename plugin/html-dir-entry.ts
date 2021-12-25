/**
 * 解析 html 下文件
 */
import webpack from "webpack"
import fs from "fs"
import path from "path"
import { Pattern } from "copy-webpack-plugin/types"

function htmlPathResolve(entry: string, type: string): Pattern[] | webpack.EntryObject {
    const tsListObj: webpack.EntryObject = {}
    const tsListObj2: Pattern[] = []

    const htmlPath = fs.readdirSync(entry)
    console.log("---", __dirname)
    
    for (let index = 0; index < htmlPath.length; index++) {
        const m = htmlPath[index]
        const location = path.join(entry, m)
        const info = fs.statSync(location)
        // 当前是否为文件夹
        if (info.isDirectory()) {
            const htmlTs = fs.readdirSync(location)
            const tsPath = htmlTs.find((m) => m.indexOf("ts") != -1)
            if (tsPath) {
                if (type === "1") {
                    console.log(`html/${tsPathReplace(tsPath)}/${tsPathReplace(tsPath)}`)
                    tsListObj[`html/${tsPathReplace(tsPath)}/${tsPathReplace(tsPath)}`] = entry + "/" + tsPathReplace(tsPath) + "/" + tsPath
                }

                if (type === "2") {
                    tsListObj2.push({
                        from: `./src/html/${tsPathReplace(tsPath)}/${tsPathReplace(tsPath)}.html`,
                        to: `./html/${tsPathReplace(tsPath)}`,
                    })
                }

            }
        }

    }
    return type === "1" ? tsListObj : tsListObj2

}


function tsPathReplace(tsPath: string) {
    return tsPath.replace(/([.][^.]+)$/, "")
}


export default htmlPathResolve