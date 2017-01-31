import { Record } from 'immutable';
import { User } from '../../../commons/models/user';

export interface IPatient {
    user: User;
}

const PatientRecord = Record({
    user: null
});

export class Patient extends PatientRecord {

    user: User;

    constructor(props: IPatient) {
        super(props);
    }

    get id(): number {
        return this.user.id;
    }

}