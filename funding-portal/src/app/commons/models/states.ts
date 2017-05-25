import {Record} from 'immutable';
const StatesRecord = Record({
    id: 0,
    statecode: '',
    statetext: ''

});
export class States extends StatesRecord {
    id: number;
    statecode: string;
    statetext: string;

    constructor(props) {
        super(props);
    }
} 