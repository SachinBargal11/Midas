import { Record } from 'immutable';
import * as moment from 'moment';

const AccidentWitnessRecord = Record({
    id: 0,
    patientAccidentInfoId: 0,
    witnessName: '',
    witnessContactNumber: '',
    isDeleted: false
});

export class AccidentWitness extends AccidentWitnessRecord {

    id: number;
    patientAccidentInfoId: number;
    witnessName: string;
    witnessContactNumber: string;
    isDeleted: boolean;

    constructor(props) {
        super(props);
    }

}

