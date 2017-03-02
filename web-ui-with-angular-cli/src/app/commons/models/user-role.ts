import { Record } from 'immutable';
import * as moment from 'moment';

const UserRoleRecord = Record({
    roleType: null,
});

export class UserRole extends UserRoleRecord {

    roleType: string;

    constructor(props) {
        super(props);
    }

}