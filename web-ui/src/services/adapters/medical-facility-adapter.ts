import { MedicalFacility } from '../../models/medical-facility';
// import {SpecialityDetailAdapter} from './speciality-detail-adapter';
// import {SpecialityDetail} from '../../models/speciality-details';



export class MedicalFacilityAdapter {

    static parseResponse(medicalFacilityData: any): MedicalFacility {
        let medicalFacility = null;
        if (medicalFacilityData) {
            medicalFacility = new MedicalFacility({
                id: medicalFacilityData.id,
                name: medicalFacilityData.name,
                npi: medicalFacilityData.npi
            });
        }
        return medicalFacility;
    }

    // static parseResponse(medicalFacilityData: any): MedicalFacilityDetail {
    //     let medicalFacility = null;
    //     if (medicalFacilityData) {
    //         let tempMedicalFacility = _.omit(medicalFacilityData, 'updateDate');
    //         let specialityDetails: List<SpecialityDetail> = List(_.chain(medicalFacilityData.specialityDetails)
    //             .filter(function (currentSpecialityDetailData: any) {
    //                 return !(currentSpecialityDetailData.isDeleted);
    //             })
    //             .map(function (currentSpecialityDetailData: any) {
    //                 return SpecialityDetailAdapter.parseResponse(currentSpecialityDetailData);
    //             }).value()
    //         );
    //         medicalFacility = new MedicalFacilityDetail({
    //             medicalfacility: tempMedicalFacility,
    //             account: medicalFacilityData.account,
    //             user: medicalFacilityData.user,
    //             address: medicalFacilityData.address,
    //             contactInfo: medicalFacilityData.contactInfo
    //         });
    //         medicalFacility.specialityDetails.next(specialityDetails);
    //     }
    //     return medicalFacility;
    // }


}