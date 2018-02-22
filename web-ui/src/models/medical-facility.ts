import {Record} from 'immutable';
import moment from 'moment';

const MedicalFacilityRecord = Record({
    id: 0,
    name: '',
    npi: '',
    isDeleted: 0,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, //Moment
    updateDate: null //Moment
});

export class MedicalFacility extends MedicalFacilityRecord {

    id: number;
    name: string;
    npi: string;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}