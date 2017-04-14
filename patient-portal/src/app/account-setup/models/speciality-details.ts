import { Record } from 'immutable';
import { Speciality } from './speciality';
import { Company } from '../../account/models/company';
import * as moment from 'moment';

const SpecialityDetailRecord = Record({
    id: 0,
    ReevalDays: 0,
    reevalvisitCount: 0,
    initialDays: 0,
    initialvisitCount: 0,
    maxReval: 0,
    isInitialEvaluation: false,
    associatedSpecialty: 0,
    include1500: false,
    allowmultipleVisit: false,
    InitialCode: '',
    ReEvalCode: '',
    specialty: new Speciality({}),
    company: null,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class SpecialityDetail extends SpecialityDetailRecord {
    id: number;
    ReevalDays: number;
    reevalvisitCount: number;
    initialDays: number;
    initialvisitCount: number;
    maxReval: number;
    isInitialEvaluation: boolean;
    associatedSpecialty: number;
    include1500: boolean;
    allowmultipleVisit: boolean;
    InitialCode: string;
    ReEvalCode: string;
    specialty: Speciality;
    company: Company;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }
}