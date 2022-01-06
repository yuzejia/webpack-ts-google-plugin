export default interface Baseinterface {
    onMessage(): void;
    addListener(_request: { message: string }, _sender: unknown, _sendResponse: (response: unknown) => void): void;
} 