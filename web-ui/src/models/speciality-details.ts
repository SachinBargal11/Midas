import { Record } from 'immutable';
import { Speciality } from './speciality';
import { Company } from './company';

const SpecialityDetailRecord = Record({
    id: 0,
    ReevalDays: 0,
    reevalvisitCount: 0,
    initialDays: 0,
    initialvisitCount: 0,
    maxReval: 0,
    isnitialEvaluation: false,
    include1500: false,
    allowmultipleVisit: false,
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
    isnitialEvaluation: number;
    include1500: number;
    allowmultipleVisit: number;
    specialty: Speciality;
    company: Company;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.MomentStatic;
    updateByUserID: number;
    updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }
}