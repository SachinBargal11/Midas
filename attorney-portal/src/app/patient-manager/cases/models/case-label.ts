import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';


const CaseLabelRecord = Record({
    id: 0,
    caseId: 0,
    patientId: 0,
    patient: '',
    caseTypeText: '',
    caseStatusText:'',
    locationName: '',
    carrierCaseNo: '',
    companyName: '',
    caseSource: '',
    medicalProvider:'',
    createByUserID: 0,
    updateByUserID: 0,
    createDate: null,
    updateDate: null
});

export class CaseLabel extends CaseLabelRecord {

    id: number;
    caseId: number;
    patientId: number;
    caseName: string;
    patient: string;
    caseTypeText: string;
    caseStatusText: string;
    locationName: string;
    companyName: string;
    medicalProvider:string;
    carrierCaseNo: string;
    createByUserID: number;
    updateByUserID: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}