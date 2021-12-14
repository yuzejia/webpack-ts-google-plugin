import Message from "./message"
import $ from "jquery"
new Message().setMsg("start", { c: 111 })

class ContentClass {

    constructor() {
        this.init()
    }

    init(): void {
        console.log("jquey init success ---", $)
        console.log($("#kw"))


    }
}


new ContentClass()