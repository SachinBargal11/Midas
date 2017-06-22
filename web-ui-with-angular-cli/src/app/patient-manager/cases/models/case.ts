import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { CaseType } from './enums/case-types';
import { CaseStatus } from './enums/case-status';
import { Company } from '../../../account/models/company';
import { Consent } from './consent';
import { Referral } from './referral';
import { PendingReferral } from '../../referals/models/pending-referral';
import { Patient } from '../../patients/models/patient';
import { CaseDocument } from './case-document';
import { CaseCompanyMapping } from './caseCompanyMapping';

const CaseRecord = Record({
    id: 0,
    patientId: 0,
    caseName: '',
    caseTypeId: CaseType.NOFAULT,
    locationId: 0,
    patientEmpInfoId: null,
    carrierCaseNo: '',
    caseStatusId: CaseStatus.OPEN,
    companyCaseConsentApproval: null,
    referral: null,
    patient: null,
    caseCompanyConsentDocument: null,
    caseSource: '',
    isDeleted: false,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: null,
    updateDate: null,
    caseCompanyMapping: null,
    // companies: null,
    attorneyId: 0,
    orignatorCompanyId: 0,
    createdByCompanyId: 0,
    orignatorCompanyName: '',
    createdByCompany: null,
    attorneyProviderId: 0,
    medicalProviderId: 0

});

export class Case extends CaseRecord {

    id: number;
    patientId: number;
    caseName: string;
    caseTypeId: CaseType;
    locationId: number;
    patientEmpInfoId: number;
    carrierCaseNo: string;
    caseStatusId: CaseStatus;
    companyCaseConsentApproval: Consent[];
    referral: PendingReferral[];
    patient: Patient;
    caseCompanyConsentDocument: CaseDocument[];
    caseSource: string;
    isDeleted: boolean;
    createByUserID: number;
    updateByUserID: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;
    caseCompanyMapping: CaseCompanyMapping[];
    // companies: Company[];
    attorneyId: number;
    orignatorCompanyId: number;
    createdByCompanyId: number;
    createdByCompany: Company;
    orignatorCompanyName: string;
    attorneyProviderId: number;
    medicalProviderId: number;
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
    isConsentReceived(companyId): boolean {
        let isConsentReceived: boolean = false;
        _.forEach(this.companyCaseConsentApproval, (currentConsent: Consent) => {
            if (currentConsent.companyId === companyId) {
                isConsentReceived = true;
            }
        });
        return isConsentReceived;
    }

    caseLabelEditable(companyId): boolean {
        let isCaseLabelEditable: boolean = false;
        _.forEach(this.caseCompanyMapping, (currentCaseCompanyMapping: CaseCompanyMapping) => {
            if (currentCaseCompanyMapping.isOriginator == true && (currentCaseCompanyMapping.company.id === companyId)) {
                isCaseLabelEditable = true;
            }
        });
        return isCaseLabelEditable;
    }

    isCreatedByCompany(companyId): boolean {
        let isCreatedByCompany: boolean = false;
        if (this.orignatorCompanyId === companyId) {
            isCreatedByCompany = true;
        }
        return isCreatedByCompany;
    }

    getInboundReferral(companyId): boolean {
        let isInboundReferral: boolean = false;
        _.forEach(this.referral, (currentReferral: PendingReferral) => {
            if (currentReferral.toCompanyId === companyId) {
                isInboundReferral = true;
            }
        });
        return isInboundReferral;
    }
    getOutboundReferral(companyId): boolean {
        let isOutboundReferral: boolean = false;
        _.forEach(this.referral, (currentReferral: PendingReferral) => {
            if (currentReferral.fromCompanyId === companyId) {
                isOutboundReferral = true;
            }
        });
        return isOutboundReferral;
    }
    isSessionCompany(companyId): boolean {
        let isSessionCompany: boolean = false;
        // _.forEach(this.companies, (currentCompany: any) => {
        if (this.orignatorCompanyId === companyId) {
            isSessionCompany = true;
        }
        // });
        return isSessionCompany;
    }
}