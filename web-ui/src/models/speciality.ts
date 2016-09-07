import {Record} from 'immutable';
import moment from 'moment';

const SpecialtyRecord = Record({
specialty: {
    id: 0,
    name: '',
    specialityCode: '',
    isDeleted: 0,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: null,
    updateDate: null
    }
});

export class Specialty extends SpecialtyRecord {
specialty: {
    id: number;
    name: string;
    specialityCode: string;
    isDeleted: boolean;
    createByUserID: number;
    updateByUserID: number;
    createDate: moment.MomentStatic;
    updateDate: moment.MomentStatic;
};

    constructor(props) {
        super(props);
    }
}