

import path from "path"
import fs from "fs"

import webpack, { Configuration } from "webpack"
import CopyWebpackPlugin from "copy-webpack-plugin"
import FileManagerPlugin from "filemanager-webpack-plugin"
import Htmlwebpackplugin from "html-webpack-plugin"
import MyMainfestPlugin from "./plugin/my-manifest-plugin"
import htmlPathResolve from "./plugin/html-dir-entry"
import { Pattern } from "copy-webpack-plugin/types"

// 获取ts 文件夹下的文件自动打包输出
function entryResolve(): webpack.EntryObject | string[] {

    const tsPath = "./src/ts/"
    const tsList: string[] = fs.readdirSync(tsPath)
    const tsListObj: webpack.EntryObject = {}

    for (const p in tsList) {
        const s = tsList[p].replace(/([.][^.]+)$/, "")
        tsListObj[`js/${s}`] = tsPath + tsList[p]
    }

    console.log(tsListObj)
    
    return {...tsListObj, ...htmlPathResolve("./src/html", "1") as webpack.EntryObject}
}


export default (): Configuration[] => {
    return [
        {
            entry: {
                ...entryResolve(),
                another: "./src/another-module.js",
            },

            // 出口文件
            output: {
                // 
                path: path.resolve(__dirname, "./dist"),
                filename: "[name].js",
                clean: true
            },
            optimization: {
                runtimeChunk: "single",
              },
            resolve: {
                extensions: [".ts", ".tsx", ".js"]
            },
            // devtool: "eval-source-map",
            module: {
                rules: [
                    {
                        test: /\.less$/i,
                        use: ["style-loader", "css-loader", "less-loader"],
                    },
                    {
                        test: /\.tsx?$/,
                        loader: "ts-loader"
                    },
                ]
            },

            plugins: [

                new MyMainfestPlugin(),

                new CopyWebpackPlugin(
                    {
                        patterns: [
                            ...htmlPathResolve("./src/html", "2") as Pattern[]
                        ]
                    }
                ),

                // new Htmlwebpackplugin({
                //     template: "./src/html/index/index.html",
                //     filename: "./html/index/index.html",
                //     chunks: [""],
                //     chunksSortMode: "manual",
                //     inject: true
                // }),

                new FileManagerPlugin({
                    events: {
                        onEnd: {
                            archive: [
                                { source: "./dist", destination: path.resolve(__dirname, "./dist/main.zip") }
                            ]
                        }
                    }
                })
            ],
            mode: "development",
        }

    ]
}
