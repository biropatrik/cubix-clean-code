import { NotificationService } from "../src/service/NotificationService";
import { EmailClient } from "../src/client/EmailClient";
import { PushNotificationClient } from "../src/client/PushNotificationClient";

describe('NotificationService tests', () => {
    let notificationService: NotificationService;
    let emailClient: EmailClient;
    let pushNotificationClient: PushNotificationClient;

    beforeEach(() => {
        emailClient = new EmailClient();
        pushNotificationClient = new PushNotificationClient();
        notificationService = new NotificationService([emailClient, pushNotificationClient]);
    })

    it('should send notifications in all clients', () => {
        // Arrange
        const email = 'Email: ';
        const push = 'Push: ';
        const message = 'Test message';
        const expectedEmailMessage = email.concat(message);
        const expectedPushMessage = push.concat(message);
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

        // Act
        notificationService.sendNotifications(message);

        // Assert
        expect(consoleLogSpy.mock.calls[0][0]).toBe(expectedEmailMessage);
        expect(consoleLogSpy.mock.calls[1][0]).toBe(expectedPushMessage);
    })
})