import { Record } from 'immutable';
import * as moment from 'moment';

const FamilyMemberRecord = Record({
    id: 0,
    relationToPatient: '',
    name: '',
    familyName: '',
    prefix: '',
    suffix: '',
    age: 0,
    deceasedAge: 0,
    dob: moment(),
    gender: '',
    races: '',
    ethnicities: ''
});

export class FamilyMember extends FamilyMemberRecord {

    id: number;
    relationToPatient: string;
    name: string;
    familyName: string;
    prefix: string;
    suffix: string;
    age: number;
    deceasedAge: number;
    dob: moment.Moment;
    gender: string;
    races: string;
    ethnicities: string;

    constructor(props) {
        super(props);
    }

}