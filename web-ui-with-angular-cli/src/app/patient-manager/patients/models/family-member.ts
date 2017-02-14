import { Record } from 'immutable';
import * as moment from 'moment';

const FamilyMemberRecord = Record({
    id: 0,
    patientId: 0,
    relationId: 0,
    isInActive: false,
    fullName: '',
    familyName: '',
    prefix: '',
    sufix: '',
    age: 0,
    genderId: 0,
    raceId: 0,
    ethnicitiesId: 0,
    cellPhone: '',
    workPhone: '',
    primaryContact: ''
});

export class FamilyMember extends FamilyMemberRecord {

    id: number;
    patientId: number;
    relationId: number;
    isInActive: boolean;
    fullName: string;
    familyName: string;
    prefix: string;
    sufix: string;
    age: number;
    genderId: number;
    raceId: number;
    ethnicitiesId: number;
    cellPhone: string;
    workPhone: string;
    primaryContact: boolean;

    constructor(props) {
        super(props);
    }

}