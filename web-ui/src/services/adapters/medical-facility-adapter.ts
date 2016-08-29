import {MedicalFacility} from '../../models/medical-facility';
import {MedicalFacilityDetail} from '../../models/medical-facility-details';
import Moment from 'moment';
import _ from 'underscore';


export class MedicalFacilityAdapter {
    // static parseMedicalFacilityResponse(medicalFacilityData: any): MedicalFacility {

    //     let medicalFacility = null;
    //     let tempMedicalFacility = _.omit(medicalFacilityData, 'defaultAttorneyUserid', 'updateDate');
    //     if (medicalFacilityData) {
    //          medicalFacility = new MedicalFacility({
    //             name: medicalFacilityData.name,
    //             prefix: medicalFacilityData.prefix,
    //             // defaultAttorneyUserid: medicalFacilityData.defaultAttorneyUserid
    //          });
    //     }
    //     return medicalFacility;
    // }

    static parseResponse(medicalFacilityData: any): MedicalFacilityDetail {

        let medicalFacility = null;
        let tempMedicalFacility = _.omit(medicalFacilityData, 'address', 'contactInfo', 'updateDate');
        if (medicalFacilityData) {
            medicalFacility = new MedicalFacilityDetail({
                medicalfacility: tempMedicalFacility,
                // medicalFacility: medicalFacilityData.medicalFacility,
                account: medicalFacilityData.account,
                user: medicalFacilityData.user,
                address: medicalFacilityData.address,
                contactInfo: medicalFacilityData.contactInfo
            });
        }
        return medicalFacility;
    }


}