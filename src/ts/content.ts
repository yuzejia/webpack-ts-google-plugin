import Message from "./message"
import $ from "jquery"
new Message().setMsg("start", { c: 111 })

class ContentClass {

    constructor() {
        this.init()
    }

    init(): void {
        console.log("jquey init success ---", $)
        $("#kw").val("1")


    }
}


// 初始化实例
new ContentClass()