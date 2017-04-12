import { Record } from 'immutable';
import * as moment from 'moment';
import { CaseType } from './enums/case-types';
import { CaseStatus } from './enums/case-status';
import { Company } from '../../../account/models/company';
import { Consent } from './consent';
import { Referral } from './referral';
import {Patient} from '../../patients/models/patient';

const CaseRecord = Record({
    id: 0,
    patientId: 0,
    patient: null,
    caseName: '',
    caseTypeId: CaseType.NOFAULT,
    companies: null,
    companyCaseConsentApproval:null,
    referral:null,
    locationId: 0,
    patientEmpInfoId: null,
    carrierCaseNo: '',
    transportation: true,
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
    patient: Patient;
    patientId: number;
    caseName: string;
    caseTypeId: CaseType;
    companies: Company[];
    companyCaseConsentApproval: Consent[];
    referral: Referral[];
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

    get caseTypeLabel(): string {
        return Case.getCaseTypeLabel(this.caseTypeId);
    }
    // tslint:disable-next-line:member-ordering
    static getCaseTypeLabel(caseType: CaseType): string {
        switch (caseType) {
            case CaseType.NOFAULT:
                return 'No Fault';
            case CaseType.WC:
                return 'WC';
            case CaseType.PRIVATE:
                return 'Private';
            case CaseType.LIEN:
                return 'Lien';
        }
    }


    get caseStatusLabel(): string {
        return Case.getCaseStatusLabel(this.caseStatusId);
    }
    // tslint:disable-next-line:member-ordering
    static getCaseStatusLabel(caseStatus: CaseStatus): string {
        switch (caseStatus) {
            case CaseStatus.OPEN:
                return 'Open';
            case CaseStatus.CLOSE:
                return 'Close';

        }
    }

}