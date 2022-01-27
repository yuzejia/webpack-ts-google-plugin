import { defineConfig } from "vite"
import fs from "fs"
function entryResolve() {
    const tsPath = "./src/ts/"
    const tsList: string[] = fs.readdirSync(tsPath)
    const tsListObj = {}

    for (const p in tsList) {
        const s = tsList[p].replace(/([.][^.]+)$/, "")
        tsListObj[`js/${s}`] = tsPath + tsList[p]
    }
    return { ...tsListObj}
    
}


export default defineConfig({
    // 配置选项
    build:{
        rollupOptions: {
            input:entryResolve(),
            output:{
                
            }
        }
      
    }
  })



