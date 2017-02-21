import { Record } from 'immutable';
import * as moment from 'moment';
import { Insurance } from '../../patients/models/insurance';

const InsuranceMappingRecord = Record({
    id: 0,
    caseId: 0,
    patientInsuranceInfos: null,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class InsuranceMapping extends InsuranceMappingRecord {

    id: number;
    caseId: number;
    patientInsuranceInfos: Insurance[];
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}