import * as moment from 'moment';
import { Record } from 'immutable';
import { User } from '../../../commons/models/user';
import { MaritalStatus } from './enums/marital-status';
import { PreferredLanguage } from './enums/preferred-language';
import { PatientDocument } from './patient-document';

const PatientRecord = Record({
    id: 0,
    user: null,
    companyId: 0,
    ssn: '',
    weight: 0,
    height: 0,
    maritalStatusId: MaritalStatus.SINGLE,
    dateOfFirstTreatment: moment(),
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null, 
    patientDocuments: [],
    parentOrGuardianName: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    legallyMarried: '',
    spouseName: '',
    patientLanguagePreferenceMappings:[],
    languagePreferenceOther: '',
    patientSocialMediaMappings:[],
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
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;
    patientDocuments: PatientDocument[];
     parentOrGuardianName: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    legallyMarried: string;
    spouseName: string;
    patientLanguagePreferenceMappings:any[];
    languagePreferenceOther: '';
    patientSocialMediaMappings:any[];

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

    get prefferedLanguage(): string {
        return Patient.getLanguageLabel(this.patientLanguagePreferenceMappings[0].languagePreferenceId);
    }
    // tslint:disable-next-line:member-ordering
    static getLanguageLabel(prefferedLanguage: PreferredLanguage): string {
        switch (prefferedLanguage) {
            case PreferredLanguage.ENGLISH:
                return 'English';
            case PreferredLanguage.SPANISH:
                return 'Spanish';
            case PreferredLanguage.OTHER:
                return 'patientInfo.languagePreferenceOther';
        }
    }
}
