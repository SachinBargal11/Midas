import * as moment from 'moment';
import { Accident } from '../../models/accident';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';
import { AccidentTreatment } from '../../models/accident-treatment';
import { AccidentWitness } from '../../models/accident-witness';
import { AccidentTreatmentAdapter } from './accident-treatment-adapter';
import { AccidentWitnessAdapter } from './accident-witness-adapter';

export class AccidentAdapter {
    static parseResponse(data: any): Accident {

        let accident = null;
        let accidentWitnesses: AccidentWitness[] = [];
        let accidentTreatments: AccidentTreatment[] = [];
        if (data) {
            if (data.accidentWitnesses) {
                for (let element of data.accidentWitnesses) {
                    accidentWitnesses.push( AccidentWitnessAdapter.parseResponse(element));
                }
            }
            if (data.accidentTreatments) {
                for (let element of data.accidentTreatments) {
                    accidentTreatments.push(AccidentTreatmentAdapter.parseResponse(element));
                }
            }
            accident = new Accident({
                id: data.id,
                caseId: data.caseId,
                accidentAddress: AddressAdapter.parseResponse(data.accidentAddressInfo),
                hospitalAddress: AddressAdapter.parseResponse(data.hospitalAddressInfo),
                accidentDate: data.accidentDate ? moment(data.accidentDate) : null,
                plateNumber: data.plateNumber,
                reportNumber: data.reportNumber,
                hospitalName: data.hospitalName,
                describeInjury: data.describeInjury,
                dateOfAdmission: data.dateOfAdmission ? moment(data.dateOfAdmission) : null,
                isCurrentAccident: data.isCurrentAccident ? 1 : 0,
                additionalPatients: data.additionalPatients,
                patientTypeId: data.patientTypeId,
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null,
                medicalReportNumber: data.medicalReportNumber,
                
                weather: data.weather,
                policeAtScene: data.policeAtScene ? '1' : '0',
                precinct: data.precinct,
                wearingSeatBelts: data.wearingSeatBelts ? '1' : '0',
                airBagsDeploy: data.airBagsDeploy ? '1' : '0',
                photosTaken: data.photosTaken ? '1' : '0',
                accidentDescription: data.accidentDescription,
                witness: data.witness ? '1' : '0',
                ambulance: data.ambulance ? '1' : '0',
                treatedAndReleased: data.treatedAndReleased ? '1' : '0',
                admitted: data.admitted ? '1' : '0',
                xraysTaken: data.xraysTaken ? '1' : '0',
                durationAtHospital: data.durationAtHospital,
                accidentWitnesses: accidentWitnesses,
                accidentTreatments: accidentTreatments
            });
        }
        return accident;
    }
}
