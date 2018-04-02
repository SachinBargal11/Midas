import * as moment from 'moment';
import { DefendantAutoInformation } from '../../models/defendantAutoInformation';

export class DefendantAutoInformationAdapter {
    static parseResponse(data: any): DefendantAutoInformation {
        let defendantAutoInformation = null;
        if (data) {
            defendantAutoInformation = new DefendantAutoInformation({
                id: data.id,
                caseId: data.caseId,
                vehicleNumberPlate: data.vehicleNumberPlate,
                state: data.state,
                vehicleMakeModel: data.vehicleMakeModel,
                vehicleMakeYear: data.vehicleMakeYear,
                vehicleOwnerName: data.vehicleOwnerName,
                vehicleOperatorName: data.vehicleOperatorName,
                vehicleInsuranceCompanyName: data.vehicleInsuranceCompanyName,
                vehiclePolicyNumber: data.vehiclePolicyNumber,
                vehicleClaimNumber: data.vehicleClaimNumber
            });
        }
        return defendantAutoInformation;
    }
}
