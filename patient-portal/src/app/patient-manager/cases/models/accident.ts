import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { PatientType } from './enums/patient-type';
import { AccidentWitness } from './accident-witness';
import { AccidentTreatment } from './accident-treatment';

const AccidentRecord = Record({
    id: 0,
    caseId: 0,
    accidentAddress: null,
    hospitalAddress: null,
    accidentDate: moment(),
    plateNumber: '',
    reportNumber: '',
    hospitalName: '',
    describeInjury: '',
    dateOfAdmission: moment(),
    patientTypeId: PatientType.BICYCLIST,
    additionalPatients: '',
    isCurrentAccident: true,
    createByUserID: 0,
    createDate: null,
    updateByUserID: 0,
    updateDate: null,
    medicalReportNumber: '',

    weather: '',
    policeAtScene: false,
    precinct: '',
    wearingSeatBelts: false,
    airBagsDeploy: false,
    photosTaken: false,
    accidentDescription: '',
    witness: false,
    ambulance: false,
    treatedAndReleased: false,
    admitted: false,
    xraysTaken: false,
    durationAtHospital: '',
    accidentWitnesses: [],
    accidentTreatments: []
});

export class Accident extends AccidentRecord {

    id: number;
    caseId: number;
    accidentAddress: Address;
    hospitalAddress: Address;
    accidentDate: moment.Moment;
    plateNumber: string;
    reportNumber: string;
    hospitalName: string;
    describeInjury: string;
    dateOfAdmission: moment.Moment;
    patientTypeId: PatientType;
    additionalPatients: string;
    isCurrentAccident: boolean;
    createByUserID: number;
    createDate: moment.Moment;
    updateByUserID: number;
    updateDate: moment.Moment;
    medicalReportNumber: string;

    weather: string;
    policeAtScene: boolean;
    precinct: string;
    wearingSeatBelts: boolean;
    airBagsDeploy: boolean;
    photosTaken: boolean;
    accidentDescription: string;
    witness: boolean;
    ambulance: boolean;
    treatedAndReleased: boolean;
    admitted: boolean;
    xraysTaken: boolean;
    durationAtHospital: string;
    accidentWitnesses: AccidentWitness[];
    accidentTreatments: AccidentTreatment[];

    constructor(props) {
        super(props);
    }

    get patientTypeLabel(): string {
        return Accident.getPatientTypeLabel(this.patientTypeId);
    }
   
    static getPatientTypeLabel(patientType:PatientType): string {
        switch (patientType) {
            case PatientType.BICYCLIST:
                return 'Bicyclist';
            case PatientType.DRIVER:
                return 'Driver';
            case PatientType.PASSENGER:
                return 'Passenger';
            case PatientType.PEDESTRAIN:
                return 'Pedestrain';
            case PatientType.OD:
                return 'OD';
        }
    }

}
