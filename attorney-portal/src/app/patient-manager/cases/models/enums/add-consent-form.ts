import * as moment from 'moment';
import { Record } from 'immutable';

const ConsentRecord = Record({
    id: 0,   
    companyId: 0,
    doctorId:0   
  
  
});

export class Consent extends ConsentRecord {

    id: number;  
    companyId: number;
    doctorId:number

    constructor(props) {
        super(props);
    }
  
  
}
