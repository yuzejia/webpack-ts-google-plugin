export default class Message {
    constructor() {
        console.log("message new init =---");
        
    }

    setMsg(name: string, data: object) {
        console.log(name, "---", data);
        
        chrome.runtime.sendMessage({
            message: name,
            data: data
        }, function(response: string | Array<[]> | object) {
            console.log(response);
        });
    }
}