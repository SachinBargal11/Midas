import { Record } from 'immutable';

const SpecialityDetailRecord = Record({
    id: 0,
    reevalDays: 0,
    reevalVisitCount: 0,
    initialDays: 0,
    initialVisitCount: 0,
    maxReval: 0,
    isInitialEvaluation: false,
    include1500: false,
    associatedSpecialty: 0,
    allowMultipleVisit: false,
    medicalFacilitiesID: 0,
    isDeleted: false,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class SpecialityDetail extends SpecialityDetailRecord {
    id: number;
    followUpDays: number;
    followupTime: number;
    initialDays: number;
    initialTime: number;
    isInitialEvaluation: number;
    include1500: number;
    associatedSpeciality: number;
    allowMultipleVisit: number;
    isDeleted: boolean;
    createByUserID: number;
    createDate: moment.MomentStatic;
    updateByUserID: number;
    updateDate: moment.MomentStatic;

    constructor(props) {
        super(props);
    }
}