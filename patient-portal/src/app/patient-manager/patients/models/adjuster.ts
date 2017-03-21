import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { Contact } from '../../../commons/models/contact';


const AdjusterRecord = Record({
    id: 0,
    companyId: 0,
    insuranceMasterId: 0,
    firstName: '',
    middleName: '',
    lastName: '',
    adjusterAddress: null,
    adjusterContact: null
});

export class Adjuster extends AdjusterRecord {

    id: number;
    companyId: number;
    insuranceMasterId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    adjusterAddress: Address;
    adjusterContact: Contact;


    constructor(props) {
        super(props);
    }

}







