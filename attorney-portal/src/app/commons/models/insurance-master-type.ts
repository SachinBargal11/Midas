import {Record} from 'immutable';
const InsuranceMasterTypeRecord = Record({
    id: 0,
    insuranceMasterTypeText: ''
});
export class InsuranceMasterType extends InsuranceMasterTypeRecord {
    id: number;
    insuranceMasterTypeText: string;
    constructor(props) {
        super(props);
    }
} 