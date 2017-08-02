import {Record} from 'immutable';
import * as moment from 'moment';
import { Company } from '../../account/models/company';
import { DiagnosisCode } from './diagnosis-code';

const DiagnosisTypeRecord = Record({
    id: 0,
    icdTypeCodeID: 0,
    companyId: 0,
    company: null,
    diagnosisTypeText: '',
    diagnosisCodes: null,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, // Moment
    updateDate: null // Moment
});

export class DiagnosisType extends DiagnosisTypeRecord {

    id: number;
    icdTypeCodeID: number;
    companyId: number;
    company: Company;
    diagnosisTypeText: string;
    diagnosisCodes: DiagnosisCode[];
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}