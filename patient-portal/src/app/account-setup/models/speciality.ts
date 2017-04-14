import { Record } from 'immutable';
import * as moment from 'moment';

const SpecialityRecord = Record({
    id: 0,
    name: '',
    specialityCode: '',
    isunitApply: false,
    isDeleted: false,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: null,
    updateDate: null
});

export class Speciality extends SpecialityRecord {
    id: number;
    name: string;
    specialityCode: string;
    isunitApply: boolean;
    isDeleted: boolean;
    createByUserID: number;
    updateByUserID: number;
    createDate: moment.Moment;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

    get displayName(): string {
        return `${this.specialityCode} - ${this.name}`;
    }
}