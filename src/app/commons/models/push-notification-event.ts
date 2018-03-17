import {Record} from 'immutable';
import * as moment from 'moment';

const PushNotificationEventRecord = Record({
    id: 0,
    eventGroupId: 0,
    groupId: 0,
    groupName: '',
    applicationID: 0,
    applicationName: '',
    eventName: '',
    subscriptionId: 0,
    userId: 0
});

export class PushNotificationEvent extends PushNotificationEventRecord {

    id: number;
    eventGroupId: number;
    groupId: number;
    groupName: string;
    applicationID: number;
    applicationName: string;
    eventName: string;
    subscriptionId: number;
    userId: number;

    constructor(props) {
        super(props);
    }

}