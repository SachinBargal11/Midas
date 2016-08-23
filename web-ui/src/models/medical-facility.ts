import {Record} from 'immutable';
import moment from 'moment';

const MedicalFacilityRecord = Record({
    id: 0,
    name: '',
    prefix: '',
    defaultAttorneyUserid: 0,
    isDeleted: 0,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null //Moment
});

export class MedicalFacility extends MedicalFacilityRecord {

    id: number;
    name: string;
    prefix: number;
    defaultAttorneyUserid: number;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.MomentStatic;
    updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }
}