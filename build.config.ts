import path from "path"
import { Configuration } from "webpack"
import FileManagerPlugin from "filemanager-webpack-plugin"
export default ():Configuration[] => {
    return [
        {

            entry: path.resolve(__dirname, "./dist/manifest.json"),
            output: {
                path: path.resolve(__dirname, "./zip"),
                filename: "[name].js"
            },

            plugins: [
                new FileManagerPlugin(getFileManager())
            ]
        }
    ]
}

// 获取压缩配置
function getFileManager() {
    return {
        events: {
            onEnd: {
                archive: [
                    { source: "./dist",  destination: path.resolve(__dirname, "./zip/main.zip") }
                ]
            }
         
        }
        
    }
}