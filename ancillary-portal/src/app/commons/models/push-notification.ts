import {Record} from 'immutable';
import * as moment from 'moment';

const PushNotificationRecord = Record({
    id: 0,
    applicationID: 0,
    eventID: 0,
    applicationName: '',
    eventName: '',
    isRead: false,
    message: '',
    notificationTime: moment(),
    receiverUserID: 0
});

export class PushNotification extends PushNotificationRecord {

    id: number;
    applicationID: number;
    eventID: number;
    applicationName: string;
    eventName: string;
    isRead: boolean;
    message: string;
    notificationTime: moment.Moment;
    receiverUserID: number;

    constructor(props) {
        super(props);
    }

}