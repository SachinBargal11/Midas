import * as moment from 'moment';
import { PushNotification } from '../../models/push-notification';

export class PushNotificationAdapter {
    static parseResponse(data: any): PushNotification {

        let notification = null;
        if (data) {
            notification = new PushNotification({
                id: data.Id,
                applicationID: data.ApplicationID,
                eventID: data.EventID,
                applicationName: data.ApplicationName,
                eventName: data.EventName,
                isRead: data.IsRead,
                message: data.Message,
                notificationTime: moment(data.NotificationTime),
                receiverUserID: data.ReceiverUserID
            });
        }
        return notification;
    }
}
