
export default class BaseClass {
    constructor() {
        console.log("base init --")
        this.onMessage()
        
    }

    onMessage() {
        chrome.runtime.onMessage.addListener((request: {message: string}, sender: unknown, sendResponse:  (response: unknown) => void) => {
            this.addListener(request, sender, sendResponse)
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    addListener(_request: { message: string }, _sender: unknown, _sendResponse: (response: unknown) => void) {
        throw new Error("Method not implemented.")
    }


}