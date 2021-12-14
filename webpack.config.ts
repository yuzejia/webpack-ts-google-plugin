

import path from "path"
import webpack, { Configuration } from "webpack"
import fs from "fs"
import CopyWebpackPlugin from "copy-webpack-plugin"

// 获取ts 文件夹下的文件自动打包输出
function entryResolve(): webpack.EntryObject | string[] {

    const tsPath = "./src/ts/"
    const tsList: string[] = fs.readdirSync(tsPath)
    const tsListObj: webpack.EntryObject = {}
    for (const p in tsList) {
        const s = tsList[p].replace(/([.][^.]+)$/, "")
        tsListObj[`js/${s}`] = tsPath + tsList[p]
    }

    return tsListObj
}


export default (): Configuration[] => {
    return [
        {
            entry: {
                ...entryResolve()
            },

            // 出口文件
            output: {
                // 
                path: path.resolve(__dirname, "./dist"),
                filename: "[name].js"
            },
            resolve: {
                extensions: [".ts", ".tsx", ".js"]
            },
            module: {
                rules: [
                    {
                        test: /\.less$/i,
                        use: [ "style-loader", "css-loader", "less-loader"],
                    },
                    {
                        test: /\.tsx?$/,
                        loader: "ts-loader"
                    },
                   
                
            

                ]
            },

            plugins: [
                new CopyWebpackPlugin({
                    patterns: [
                        {
                            context: path.resolve(__dirname),
                            from: "./src/manifest.json",
                            to: path.resolve(__dirname, "./dist/manifest.json")
                        },
                        {
                            from: "./src/html",
                            to: path.resolve(__dirname, "./dist/html")
                        }
                    ]
                }

                )
            ],
            mode: "development",
        }

    ]
}
