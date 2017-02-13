import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';

const ReferringOfficeRecord = Record({
    id: 0,
    patientId: 0,
    refferingOfficeId: 0,
    refferingDoctorId: 0,
    npi: '',
    isCurrentReffOffice: 1,
    addressInfo: null,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class ReferringOffice extends ReferringOfficeRecord {

    id: number;
    patientId: number;
    refferingOfficeId: number;
    refferingDoctorId: number;
    npi: string;
    isCurrentReffOffice: boolean;
    addressInfo: Address;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}