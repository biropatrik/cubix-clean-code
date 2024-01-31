import { IMessageClient } from "../abstraction/client/IMessageClient";

export class EmailClient implements IMessageClient {

    readonly EMAIL: string = 'Email: ';

    async sendNotification(message: string): Promise<void> {
        console.log(this.EMAIL.concat(message));
    }

}