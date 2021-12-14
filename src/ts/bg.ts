import Baseinterface from "@/enum/base-interface"
import BaseClass from "./base"
import bgExtCLass from "./bg-ext"

class BgClass extends BaseClass implements  Baseinterface {

    constructor() {
        super()
        this.init()
    }



    init() {
        console.log("bg- init success ~~~")
        bgExtCLass.getInstance().init()
        chrome.tabs.query({}, (result: chrome.tabs.Tab[]): void => {
         console.log(result[0].id)
        })
        
    }

    addListener(request: {message: string}, sender: unknown, sendResponse:  (response: unknown) => void) {
        if(request.message === "start") {
            console.log("111111111")
            sendResponse(111)
            
        }
        
    }

    a() {
        console.log(1)
        
     }

}

// 初始化执行
new BgClass()