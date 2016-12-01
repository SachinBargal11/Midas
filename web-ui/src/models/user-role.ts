import { Record } from 'immutable';

const UserRoleRecord = Record({
    name: null,
    roleType: null,
    status: null
});

export class UserRole extends UserRoleRecord {

    id: number;
    name: string;
    roleType: string;
    status: string;

    constructor(props) {
        super(props);
    }

}