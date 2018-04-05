import { PatientDocument } from './patient-document';
import * as moment from 'moment';
import * as _ from 'underscore';
import { Record } from 'immutable';
import { User } from '../../../commons/models/user';
import { Company } from '../../../account/models/company';
import { MaritalStatus } from './enums/marital-status';
import { PreferredLanguage } from './enums/preferred-language';

const PatientRecord = Record({
    id: 0,
    user: null,
    companyId: 0,
    ssn: '',
    weight: 0,
    height: 0,
    maritalStatusId: MaritalStatus.SINGLE,
    dateOfFirstTreatment: moment(),
    parentOrGuardianName: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    legallyMarried: '',
    spouseName: '',
    patientLanguagePreferenceMappings:[],
    languagePreferenceOther: '',
    patientSocialMediaMappings:[],
    companies: [],
    patientDocuments: [],
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null,
    isRefferedPatient : false,
    addedByCompanyId: 0,
});

export class Patient extends PatientRecord {

    id: number;
    user: User;
    companyId: number;
    ssn: string;
    weight: number;
    height: number;
    maritalStatusId: MaritalStatus;
    dateOfFirstTreatment: moment.Moment;
    parentOrGuardianName: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    legallyMarried: string;
    spouseName: string;
    patientLanguagePreferenceMappings:any[];
    languagePreferenceOther: '';
    patientSocialMediaMappings:any[];
    companies: Company[];
    patientDocuments: PatientDocument[];
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;
    isRefferedPatient: boolean;
    addedByCompanyId: number;

    constructor(props) {
        super(props);
    }
    get maritalStatusLabel(): string {
        return Patient.getLabel(this.maritalStatusId);
    }
    // tslint:disable-next-line:member-ordering
    static getLabel(maritalStatus: MaritalStatus): string {
        switch (maritalStatus) {
            case MaritalStatus.SINGLE:
                return 'Single';
            case MaritalStatus.MARRIED:
                return 'Married';
        }
    }
    isSessionCompany(companyId): boolean {
        let isSessionCompany: boolean = false;
        _.forEach(this.companies, (currentCompany: any) => {
            if (currentCompany.companyId === companyId) {
                isSessionCompany = true;
            }
        });
        return isSessionCompany;
    }


    get prefferedLanguage(): string {
        if(this.patientLanguagePreferenceMappings.length > 0){
        return Patient.getLanguageLabel(this.patientLanguagePreferenceMappings[0].languagePreferenceId);   
        }    
    }
    // tslint:disable-next-line:member-ordering
    static getLanguageLabel(prefferedLanguage: PreferredLanguage): string {
        switch (prefferedLanguage) {
            case PreferredLanguage.ENGLISH:
                return 'English';
            case PreferredLanguage.SPANISH:
                return 'Spanish';
            case PreferredLanguage.OTHER:
                return 'other';
        }
    }
}
