

import path, { resolve } from "path"
import fs from "fs"

import webpack, { Configuration } from "webpack"
import CopyWebpackPlugin from "copy-webpack-plugin"
import FileManagerPlugin from "filemanager-webpack-plugin"
import MyManifestPlugin from "./plugin/my-manifest-plugin"
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
    return { ...tsListObj, ...htmlPathResolve("./src/html", "1") as webpack.EntryObject }
    
}


export default (): Configuration[] => {
    console.log(process.argv)
    
    return [
        {
            entry: {
                ...entryResolve(),
            },

            // 出口文件
            output: {
                // 
                path: path.resolve(__dirname, "./dist"),
                filename: "[name].js",
                clean: true
            },

            resolve: {
                extensions: [".ts", ".tsx", ".js"]
            },
            // devtool: "eval-source-map",
            module: {
                rules: [
                
                    {
                        test: /\.less$/i,
                        use: ["style-loader", "css-loader","postcss-loader", "less-loader"],
                        include: [path.resolve("src")],
                        exclude: /node_modules/
                    },
                    {
                        test: /\.(png|jpg|gif)$/i,
                        type: "asset/resource"
                    },
                    {
                        test: /\.tsx?$/,
                        use: ["babel-loader?cacheDirectory=true", "ts-loader"],
                        include: [path.resolve("src")],
                        exclude: /node_modules/
                    },
                ]
            },
          


            plugins: [

                // 打包时间过程-
                new webpack.ProgressPlugin(),

                // 处理manifest.json
                new MyManifestPlugin(),

                // 拷贝文件
                new CopyWebpackPlugin(
                    {
                        patterns: [
                            ...htmlPathResolve("./src/html", "2") as Pattern[]
                        ]
                    }
                ),

                // 压缩包
                new FileManagerPlugin({
                    events: {
                        onEnd: {
                            archive: [
                                { source: "./dist", destination: path.resolve(__dirname, "./dist/main-" + new Date().getTime() + ".zip") }
                            ]
                        }
                    }
                })
            ],
            mode: "development",

            // 打包缓存
            cache: {
                type: "filesystem", // 启用持久化缓存
                cacheDirectory: resolve(".temp_cache"), // 缓存文件存放的位置
                buildDependencies: { // 缓存失效的配置
                  config: [__filename]
                }
              }
            
        }

    ]
}
