import * as moment from 'moment';
import { AutoInformation } from '../../models/autoInformation';

export class AutoInformationAdapter {
    static parseResponse(data: any): AutoInformation {
        let autoInformation = null;
        if (data) {
            autoInformation = new AutoInformation({
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
                vehicleClaimNumber: data.vehicleClaimNumber,
                vehicleLocation: data.vehicleLocation,
                vehicleDamageDiscription: data.vehicleDamageDiscription,
                relativeVehicle: data.relativeVehicle,
                relativeVehicleMakeModel: data.relativeVehicleMakeModel,
                relativeVehicleMakeYear: data.relativeVehicleMakeYear,
                relativeVehicleOwnerName: data.relativeVehicleOwnerName,
                relativeVehicleInsuranceCompanyName: data.relativeVehicleInsuranceCompanyName,
                relativeVehiclePolicyNumber: data.relativeVehiclePolicyNumber,
                vehicleResolveDamage: data.vehicleResolveDamage,
                vehicleDriveable: data.vehicleDriveable,
                vehicleEstimatedDamage: data.vehicleEstimatedDamage,
                relativeVehicleLocation: data.relativeVehicleLocation,
                vehicleClientHaveTitle: data.vehicleClientHaveTitle,
                relativeVehicleOwner: data.relativeVehicleOwner,
            });
        }
        return autoInformation;
    }
}
