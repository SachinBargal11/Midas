import * as moment from 'moment';
import { AccidentWitness } from '../../models/accident-witness';

export class AccidentWitnessAdapter {
    static parseResponse(data: any): AccidentWitness {

        let accidentWitness = null;
        if (data) {
            accidentWitness = new AccidentWitness({
                id: data.id,
                patientAccidentInfoId: data.patientAccidentInfoId,
                witnessName: data.witnessName,
                witnessContactNumber: data.witnessContactNumber,
                isDeleted: data.isDeleted ? '1' : '0'
            });
        }
        return accidentWitness;
    }
}
