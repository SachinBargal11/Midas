import {SpecialityDetail} from '../../models/speciality-details';
import Moment from 'moment';
import _ from 'underscore';


export class SpecialityDetailAdapter {
    static parseResponse(specialityDetailData: any): SpecialityDetail {
        let specialityDetail: SpecialityDetail = null;
        if (specialityDetailData) {
            specialityDetail = new SpecialityDetail({
                id: specialityDetailData.id,
                isUnitApply: specialityDetailData.isUnitApply,
                followUpDays: specialityDetailData.followUpDays,
                followupTime: specialityDetailData.followupTime,
                initialDays: specialityDetailData.initialDays,
                initialTime: specialityDetailData.initialTime,
                isInitialEvaluation: specialityDetailData.isInitialEvaluation,
                include1500: specialityDetailData.include1500,
                associatedSpeciality: specialityDetailData.associatedSpeciality,
                allowMultipleVisit: specialityDetailData.allowMultipleVisit
            });
        }
        return specialityDetail;
    }


}