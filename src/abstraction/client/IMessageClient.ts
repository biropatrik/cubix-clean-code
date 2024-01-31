export interface IMessageClient {
    sendNotification(message: string): Promise<void>;
}