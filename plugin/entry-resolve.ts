
import fs from "fs"

import webpack from "webpack"
import htmlPathResolve from "./html-dir-entry"

export default function entryResolve(): webpack.EntryObject | string[] {
    const tsPath = "./src/ts/"
    const tsList: string[] = fs.readdirSync(tsPath)
    const tsListObj: webpack.EntryObject = {}

    for (const p in tsList) {
        const s = tsList[p].replace(/([.][^.]+)$/, "")
        tsListObj[`js/${s}`] = tsPath + tsList[p]
    }
    return { ...tsListObj, ...htmlPathResolve("./src/html", "1") as webpack.EntryObject }
    
}