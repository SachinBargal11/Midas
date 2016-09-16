import {SpecialityDetail} from '../../models/speciality-details';

export class SpecialityDetailAdapter {
    static parseResponse(specialityDetailData: any): SpecialityDetail {
        let specialityDetail: SpecialityDetail = null;
        if (specialityDetailData) {
            specialityDetail = new SpecialityDetail({
                id: specialityDetailData.id,
                isUnitApply: specialityDetailData.isUnitApply ? 1 : 0,
                followUpDays: specialityDetailData.followUpDays,
                followupTime: specialityDetailData.followupTime,
                initialDays: specialityDetailData.initialDays,
                initialTime: specialityDetailData.initialTime,
                isInitialEvaluation: specialityDetailData.isInitialEvaluation ? 1 : 0,
                include1500: specialityDetailData.include1500 ? 1 : 0,
                associatedSpeciality: specialityDetailData.associatedSpeciality,
                allowMultipleVisit: specialityDetailData.allowMultipleVisit ? 1 : 0
            });
        }
        return specialityDetail;
    }


}