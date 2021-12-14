import Info from "@/enum/en"
import Message from "./message"

new Message().setMsg("start", {c:111})


function name(params:Info): void {
    console.log(params)
    
}

name({name: "yuzejia11"})