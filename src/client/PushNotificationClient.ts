import { IMessageClient } from "../abstraction/client/IMessageClient";

export class PushNotificationClient implements IMessageClient {

    readonly PUSH: string = 'Push: ';

    async sendNotification(message: string): Promise<void> {
        console.log(this.PUSH.concat(message));
    }

}