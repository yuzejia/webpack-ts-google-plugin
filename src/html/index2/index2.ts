console.log("main - init -")
import "./index2.less"

class Index {
    constructor() {
        this.init()

    }
    init() {
        const box = document.getElementById("index")
        // (box as HTMLElement).innerHTML = "google dom";
        console.log(box)
    }

}

new Index()
