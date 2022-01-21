import { messageEnumType } from "../enum/message-enum"

interface messageFace {
    sendMessage: (name: messageEnumType , data: object)=> void
}

export default class Message implements messageFace {
    constructor() {
        console.log("message new init =---")
        
    }

    // 发送消息数据 ---
    sendMessage(name: messageEnumType, data: object): void {
        chrome.runtime.sendMessage({
            message: name,
            data: data
        }, function(response: string | Array<[]> | object) {
            console.log(response)
        })
    }
}