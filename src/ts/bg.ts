import Baseinterface from "@/enum/base-interface"
import BaseClass from "./base"
import bgExtCLass from "./bg-ext"

class BgClass extends BaseClass implements Baseinterface {

    constructor() {
        super()
        this.init()
        this.onBeforeRequest()
    }



    init() {
        console.log("bg- init success ~~~")
        bgExtCLass.getInstance().init()

        // 获取 窗口 tabs --
        chrome.tabs.query({}, (result: chrome.tabs.Tab[]): void => {
            console.log(result[0].id)
        })



    }

    addListener(request: { message: string }, sender: unknown, sendResponse: (response: unknown) => void) {
        if (request.message === "start") {
            this.checkNotification()
            sendResponse("start success ~")

        }

    }

    // 桌面通知 测试 请访问 www.baidu.com
    checkNotification() {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification")
        }
        // check whether notification permissions have alredy been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            new Notification("", {
                body: "欢迎使用百度~",
                data: "这里会显示什么---"
            })
        }
        // Otherwise, ask the user for permission
        else if (Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    new Notification("Request granted!")
                }
            })
        }
    }


    // --- http 请求 监听
    onBeforeRequest() {
        console.log("执行--- onBeforeRequest")
        chrome.webRequest.onBeforeRequest.addListener(details => {
            console.log(details)

        },
            { urls: ["<all_urls>"] },
            ["blocking"]

        )
    }



}

// 初始化执行
new BgClass()