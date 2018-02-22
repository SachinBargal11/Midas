import * as moment from 'moment';
import { PushNotification } from '../../models/push-notification';
import { PushNotificationEvent } from '../../models/push-notification-event';

export class PushNotificationAdapter {
    static parseResponse(data: any): PushNotification {

        let notification: PushNotification = null;
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

    static parseEventResponse(data: any): PushNotificationEvent {

        let notification: PushNotificationEvent = null;
        if (data) {
            notification = new PushNotificationEvent({
                id: data.EventID,
                eventGroupId: data.EventGroupID,
                groupId: data.GroupID,
                groupName: data.GroupName,
                applicationID: data.ApplicationID,
                applicationName: data.ApplicationName,
                eventName: data.EventName,
                subscriptionId: data.SubscriptionID,
                userId: data.UserID
            });
        }
        return notification;
    }
}
