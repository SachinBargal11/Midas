import {Record} from 'immutable';
import * as moment from 'moment';

const NotificationRecord = Record({
    // actionTakenAt: null,
    // actionTakenBy: null,
    // actedTakenUpon: null,
    // actionType: "",
    title: null,
    createdAt: moment(),
    type: '',
    isRead: false,
    messages: null
});

export class Notification extends NotificationRecord {

    title: string;
    createdAt: moment.Moment;
    type: string;
    isRead: boolean;
    messages: string[];

    constructor(props) {
        super(props);
    }

}