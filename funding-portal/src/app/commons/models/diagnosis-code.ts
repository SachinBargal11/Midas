import {Record} from 'immutable';
import * as moment from 'moment';
import { Company } from '../../account/models/company';
import { DiagnosisType } from './diagnosis-type';

const DiagnosisCodeRecord = Record({
    id: 0,
    diagnosisCodeId: 0,
    diagnosisTypeId: 0,
    companyId: 0,
    company: null,
    diagnosisCodeText: '',
    diagnosisCodeDesc: '',
    diagnosisType: null,
    isDeleted: false,
    createByUserId: 0,
    updateByUserId: 0,
    createDate: null, // Moment
    updateDate: null // Moment
});

export class DiagnosisCode extends DiagnosisCodeRecord {

    id: number;
    diagnosisCodeId: number;
    diagnosisTypeId: number;
    companyId: number;
    company: Company;
    diagnosisCodeText: string;
    diagnosisCodeDesc: string;
    diagnosisType: DiagnosisType;
    isDeleted: boolean;
    createByUserId: number;
    updateByUserId: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}