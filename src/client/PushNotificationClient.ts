import { IMessageClient } from "../abstraction/client/IMessageClient";

export class PushNotificationClient implements IMessageClient {

    readonly PUSH: string = 'Push: ';

    sendNotification(message: string): void {
        console.log(this.PUSH.concat(message));
    }

}