console.log("bg- init ~")
interface SendResponse<T> {
    (s: T): void
}

class BgClass {

    constructor() {
        this.onMessage()
        this.init()
    }

    onMessage() {
        chrome.runtime.onMessage.addListener(function (request: {message: string}, sender: unknown, sendResponse: SendResponse<number>) {
            console.log(request)
            
            // 监听 content 页面打开 信息通知
            if (request.message == "start") {
                console.log("start success ---")
                sendResponse(1111)
            }
        
        

        
        })
    }

    init() {
        console.log("bg- init success ~~~")
        chrome.tabs.query({}, (tabs: Array<object>) => {
         console.log(tabs)
         console.log(111222)
         
        })
        
    }
}

new BgClass()