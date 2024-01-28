import { IMessageClient } from "../abstraction/client/IMessageClient";
import { INotificationService } from "../abstraction/service/INotificationService";

export class NotificationService implements INotificationService {

    constructor(private messages: IMessageClient[]) { }

    sendNotifications(message: string): void {
        this.messages.forEach(client => { client.sendNotification(message); })
    }
}