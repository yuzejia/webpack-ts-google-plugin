console.log("main - init -")
import "./index.less"
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
