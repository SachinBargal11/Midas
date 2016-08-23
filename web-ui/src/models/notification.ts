import {Record} from 'immutable';
import Moment from 'moment';

const NotificationRecord = Record({
    // actionTakenAt: null,
    // actionTakenBy: null,
    // actedTakenUpon: null,
    // actionType: "",
    title: '',
    createdAt: Moment(),
    type: '',
    isRead: false
});

export class Notification extends NotificationRecord {

    title: string;
    createdAt: Date;
    type: string;
    isRead: boolean;

    constructor(props) {
        super(props);
    }

}