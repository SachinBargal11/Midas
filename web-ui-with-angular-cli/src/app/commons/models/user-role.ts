import { Record } from 'immutable';
import * as moment from 'moment';
import { Company } from '../../account/models/company';

const UserRoleRecord = Record({
    name: null,
    roleType: null,
    company: null,
    isDeleted: 0,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null,
    updateDate: null
});

export class UserRole extends UserRoleRecord {

    id: number;
    name: string;
    roleType: string;
    company: Company;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}