import {MedicalFacility} from '../../models/medical-facility';
import {MedicalFacilityDetail} from '../../models/medical-facility-details';
import Moment from 'moment';
import _ from 'underscore';


export class MedicalFacilityAdapter {
    static parseResponse(medicalFacilityData: any): MedicalFacilityDetail {

        let medicalFacility = null;
        let tempMedicalFacility = _.omit(medicalFacilityData, 'updateDate');
        if (medicalFacilityData) {
            medicalFacility = new MedicalFacilityDetail({
                medicalfacility: tempMedicalFacility,
                account: medicalFacilityData.account,
                user: medicalFacilityData.user,
                address: medicalFacilityData.address,
                contactInfo: medicalFacilityData.contactInfo
            });
        }
        return medicalFacility;
    }


}