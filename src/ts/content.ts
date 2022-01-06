import Message from "../code/base/message"
import $ from "jquery"
import { messageEnum } from "../code/enum/message-enum"

class ContentClass {

    constructor() {
        this.init()
        new Message().sendMessage(messageEnum.start, {})

    }

    init(): void {
        console.log("jquery init success ---", $)
        $("#kw").val("欢迎使用百度~")
    }
}


// 初始化实例
new ContentClass()