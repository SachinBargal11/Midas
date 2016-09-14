import {Speciality} from './speciality';
import {Record} from 'immutable';
import moment from 'moment';

const SpecialityDetailRecord = Record({
    id: 0,
    isUnitApply: 1,
    followUpDays: 0,
    followupTime: 0,
    initialDays: 0,
    initialTime: 0,
    isInitialEvaluation: 1,
    include1500: 1,
    associatedSpeciality: 0,
    allowMultipleVisit: 1,
    isDeleted: 0
});

export class SpecialityDetail extends SpecialityDetailRecord {
    id: number;
    isUnitApply: number;
    followUpDays: number;
    followupTime: number;
    initialDays: number;
    initialTime: number;
    isInitialEvaluation: number;
    include1500: number;
    associatedSpeciality: number;
    allowMultipleVisit: number;
    isDeleted: number;

    constructor(props) {
        super(props);
    }
}