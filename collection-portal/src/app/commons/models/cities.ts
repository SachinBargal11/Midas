import {Record} from 'immutable';
const CitiesRecord = Record({
    id: 0,
    statecode: '',
    citytext: ''

});
export class Cities extends CitiesRecord {
    id: number;
    statecode: string;
    citytext: string;

    constructor(props) {
        super(props);
    }
} 