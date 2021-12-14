

const path = require('path');
const glob = require('glob');
import webpack, { Configuration } from "webpack";
import fs from "fs";
const CopyWebpackPlugin = require("copy-webpack-plugin");

// 获取ts 文件夹下的文件自动打包输出
function entryResolve(): webpack.EntryObject | string[] {

    const tsPath: string = './src/ts/';
    let tsList: string[] = fs.readdirSync(tsPath);
    let tsListObj: webpack.EntryObject = {}
    for (const p in tsList) {
        let s = tsList[p].replace(/([.][^.]+)$/, '');
        tsListObj[`js/${s}`] = tsPath + tsList[p];
    }


    return tsListObj
}


function config(args: Configuration): Configuration {
    return {
        entry: {
            ...entryResolve()
        },

        // 出口文件
        output: {
            // 
            path: path.resolve(__dirname, './dist'),
            filename: '[name].js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader"
                }
            ]
        },
        mode: 'development',
        plugins: [
            new CopyWebpackPlugin({
                patterns: [{
                    context: path.resolve(__dirname),
                    from: "./src/manifest.json",
                    to: path.resolve(__dirname, './dist/manifest.json')
                }]
            }

            )
        ]
    }
}

export default (_env: never, args: Configuration): Configuration[] => {
    const base = config(args)
    return [
        {
            ...base
        }

    ]
}


// module.exports = {
//         entry: entryResolve(),

//         // 出口文件
//         output: {
//             //
//             path: path.resolve(__dirname, './dist'),
//             filename: '[name].js'
//         },
//         resolve: {
//             extensions: ['.ts', '.tsx', '.js']
//           },
//         module: {
//             rules: [
//                 {
//                     test: /\.tsx?$/,
//                     loader: "ts-loader",
//                 }
//         ]
//         },
//         mode: 'development',
// } as webpack.Configuration