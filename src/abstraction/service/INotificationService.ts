export interface INotificationService {
    sendNotifications(message: string): Promise<void>;
}