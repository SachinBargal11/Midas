import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';


const ConsentForm = Record({
    id: 0,
    patientId: 0,

    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null
});

export class AddConsent extends ConsentForm {

    id: number;
    patientId: number;

    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;

    constructor(props) {
        super(props);
    }

}