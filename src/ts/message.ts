export default class Message {
    constructor() {
        console.log('message new init =---');
        
    }

    setMsg(name: string, data: any) {
        console.log(name, '---', data);
        
        (window as any).chrome.runtime.sendMessage({
            message: name,
            data: data
        }, function(response: any) {
            console.log(response);
        })
    }
}