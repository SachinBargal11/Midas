import { Record } from 'immutable';
import * as moment from 'moment';
import {CaseType} from './enums/case-types';
import {CaseStatus} from './enums/case-status';

const CaseRecord = Record({
    id: 0,
    patientId: 0,
    caseName: '',
    caseTypeId: CaseType.NOFAULT,
    locationId: 0,
    patientEmpInfoId: 0,
    carrierCaseNo: '',
    transportation: 1,
    caseStatusId: CaseStatus.OPEN,
    attorneyId: 0,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class Case extends CaseRecord {

    id: number;
    patientId: number;
    caseName: string;
    caseTypeId: CaseType;
    locationId: number;
    patientEmpInfoId: number;
    carrierCaseNo: string;
    transportation: boolean;
    caseStatusId: CaseStatus;
    attorneyId: number;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}