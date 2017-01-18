import {Record} from 'immutable';
import Moment from 'moment';

const NotificationRecord = Record({
    // actionTakenAt: null,
    // actionTakenBy: null,
    // actedTakenUpon: null,
    // actionType: "",
    title: null,
    createdAt: Moment(),
    type: '',
    isRead: false,
    messages: null
});

export class Notification extends NotificationRecord {

    title: string;
    createdAt: Date;
    type: string;
    isRead: boolean;
    messages: string[];

    constructor(props) {
        super(props);
    }

}