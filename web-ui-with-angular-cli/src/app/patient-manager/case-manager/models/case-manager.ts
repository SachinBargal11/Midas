import { Record } from 'immutable';
import * as moment from 'moment';
import { CaseType } from '../../cases/models/enums/case-types';
import { CaseStatus } from '../../cases/models/enums/case-status';
import { Employer } from '../../patients/models/employer';

const CaseManagerRecord = Record({
    id: 0,
    patientId: 0,
    userId: 0,
    caseId: 0,
    userName: '',
    firstName: '',
    middleName: '',
    lastName: '',
    caseName: '',
    caseTypeId: CaseType.NOFAULT,
    locationId: 0,
    patientEmpInfoId: 0,
    carrierCaseNo: '',
    transportation: 1,
    caseStatusId: CaseStatus.OPEN,
    attorneyId: 0,
    patientEmpInfo: null,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class CaseManager extends CaseManagerRecord {

    id: number;
    patientId: number;
    userId: number;
    caseId: number;
    userName: string;
    firstName: string;
    middleName: string;
    lastName: string;
    caseName: string;
    caseTypeId: CaseType;
    locationId: number;
    patientEmpInfoId: number;
    carrierCaseNo: string;
    transportation: boolean;
    caseStatusId: CaseStatus;
    attorneyId: number;
    patientEmpInfo: Employer;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

    get caseTypeLabel(): string {
        return CaseManager.getCaseTypeLabel(this.caseTypeId);
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
        return CaseManager.getCaseStatusLabel(this.caseStatusId);
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