console.log('bg- init ~');


class BgClass {

    constructor() {
        this.onMessage();
        this.init();
    }

    onMessage() {
        (window as any).chrome.runtime.onMessage.addListener(function (request: any, sender: any, sendResponse: any) {
            console.log(request);
            
            // 监听 content 页面打开 信息通知
            if (request.message == 'start') {
                console.log('start success ---');
                sendResponse(1111)
            }
        
        

        
        })
    }

    init() {
        console.log('bg- init success ~~~');
        (window as any).chrome.tabs.query({}, (tabs: Array<object>) => {
         console.log(tabs);
         console.log(111222);
         
        })
        
    }
}

new BgClass()