import { IMessageClient } from "../abstraction/client/IMessageClient";

export class EmailClient implements IMessageClient {

    readonly EMAIL: string = 'Email: ';

    sendNotification(message: string): void {
        console.log(this.EMAIL.concat(message));
    }

}