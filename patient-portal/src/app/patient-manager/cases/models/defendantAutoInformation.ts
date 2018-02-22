import { Record } from 'immutable';
import * as moment from 'moment';

const DefendantAutoInformationRecord = Record({
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
    isDeleted: false
});

export class DefendantAutoInformation extends DefendantAutoInformationRecord {

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
    isDeleted: false

    constructor(props) {
        super(props);
    }

}