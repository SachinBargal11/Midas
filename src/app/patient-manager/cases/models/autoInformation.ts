import { Record } from 'immutable';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import { Contact } from '../../../commons/models/contact';

const AutoInformationRecord = Record({
    id: 0,
    caseId: 0,
    vehicleNumberPlate: '',
    state: '',
    vehicleMakeModel: '',
    vehicleMakeYear: '',
    vehicleOwnerName: '',
    vehicleOperatorName: '',
    vehicleInsuranceCompanyName: '',
    vehiclePolicyNumber: '',
    vehicleClaimNumber: '',
    vehicleLocation: '',
    vehicleDamageDiscription: '',
    relativeVehicle: false,
    relativeVehicleMakeModel: '',
    relativeVehicleMakeYear: '',
    relativeVehicleOwnerName: '',
    relativeVehicleInsuranceCompanyName: '',
    relativeVehiclePolicyNumber: '',
    vehicleResolveDamage: false,
    vehicleDriveable: false,
    vehicleEstimatedDamage: '0.0',
    relativeVehicleLocation: '',
    vehicleClientHaveTitle: '',
    relativeVehicleOwner: '',
    createDate: moment(),
    isDeleted: false
});

export class AutoInformation extends AutoInformationRecord {

    id: 0;
    caseId: 0;
    vehicleNumberPlate: string;
    state: string;
    vehicleMakeModel: string;
    vehicleMakeYear: string;
    vehicleOwnerName: string;
    vehicleOperatorName: string;
    vehicleInsuranceCompanyName: string;
    vehiclePolicyNumber: string;
    vehicleClaimNumber: string;
    vehicleLocation: string;
    vehicleDamageDiscription: string;
    relativeVehicle: boolean;
    relativeVehicleMakeModel: string;
    relativeVehicleMakeYear: string;
    relativeVehicleOwnerName: string;
    relativeVehicleInsuranceCompanyName: string;
    relativeVehiclePolicyNumber: string;
    vehicleResolveDamage: boolean;
    vehicleDriveable: boolean;
    vehicleEstimatedDamage: string;
    relativeVehicleLocation: string;
    vehicleClientHaveTitle: boolean;
    relativeVehicleOwner: string;

    isDeleted: false

    constructor(props) {
        super(props);
    }

}