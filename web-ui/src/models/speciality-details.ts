import { Record } from 'immutable';
import { Speciality } from './speciality';
import { Company } from './company';

const SpecialityDetailRecord = Record({
    id: 0,
    reevalDays: 0,
    reevalVisitCount: 0,
    initialDays: 0,
    initialVisitCount: 0,
    maxReval: 0,
    isInitialEvaluation: false,
    include1500: false,
    allowMultipleVisit: false,
    Specialty: null,
    Company: null,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class SpecialityDetail extends SpecialityDetailRecord {
    id: number;
    reevalDays: number;
    reevalVisitCount: number;
    initialDays: number;
    initialVisitCount: number;
    maxReval: number;
    isInitialEvaluation: number;
    include1500: number;
    allowMultipleVisit: number;
    Specialty: Speciality;
    Company: Company;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.MomentStatic;
    updateByUserID: number;
    updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }
}