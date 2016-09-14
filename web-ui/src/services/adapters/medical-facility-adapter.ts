import Moment from 'moment';
import _ from 'underscore';
import {Record, List} from 'immutable';
import {MedicalFacility} from '../../models/medical-facility';
import {MedicalFacilityDetail} from '../../models/medical-facility-details';
import {SpecialityDetail} from '../../models/speciality-details';



export class MedicalFacilityAdapter {
    static parseResponse(medicalFacilityData: any): MedicalFacilityDetail {
        let medicalFacility = null;
        if (medicalFacilityData) {
            let tempMedicalFacility = _.omit(medicalFacilityData, 'updateDate');
            let specialityDetails: List<SpecialityDetail> = List(_.chain(medicalFacilityData.specialityDetails)
                .filter(function(currentSpecialityDetailData: any){
                    return !(currentSpecialityDetailData.isDeleted);
                })
                .map(function (currentSpecialityDetailData: any) {
                    return new SpecialityDetail({
                        id: currentSpecialityDetailData.id,
                        isUnitApply: currentSpecialityDetailData.isUnitApply,
                        followUpDays: currentSpecialityDetailData.followUpDays,
                        followupTime: currentSpecialityDetailData.followupTime,
                        initialDays: currentSpecialityDetailData.initialDays,
                        initialTime: currentSpecialityDetailData.initialTime,
                        isInitialEvaluation: currentSpecialityDetailData.isInitialEvaluation,
                        include1500: currentSpecialityDetailData.include1500,
                        associatedSpeciality: currentSpecialityDetailData.associatedSpeciality,
                        allowMultipleVisit: currentSpecialityDetailData.allowMultipleVisit
                    });
                }).value()
            );
            medicalFacility = new MedicalFacilityDetail({
                medicalfacility: tempMedicalFacility,
                account: medicalFacilityData.account,
                user: medicalFacilityData.user,
                address: medicalFacilityData.address,
                contactInfo: medicalFacilityData.contactInfo
            });
            medicalFacility.specialityDetails.next(specialityDetails);
        }
        return medicalFacility;
    }


}