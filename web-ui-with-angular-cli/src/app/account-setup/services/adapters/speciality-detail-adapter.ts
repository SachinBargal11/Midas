import { SpecialityAdapter } from './speciality-adapter';
import { SpecialityDetail } from '../../models/speciality-details';

export class SpecialityDetailAdapter {
    static parseResponse(specialityDetailData: any): SpecialityDetail {
        let specialityDetail = null;
        if (specialityDetailData) {
            specialityDetail = new SpecialityDetail({
                id: specialityDetailData.id,
                ReevalDays: specialityDetailData.reevalDays,
                reevalvisitCount: specialityDetailData.reevalvisitCount,
                initialDays: specialityDetailData.initialDays,
                initialvisitCount: specialityDetailData.initialvisitCount,
                associatedSpecialty: specialityDetailData.associatedSpecialty,
                maxReval: specialityDetailData.maxReval,
                isInitialEvaluation: specialityDetailData.isnitialEvaluation ? '1' : '0',
                include1500: specialityDetailData.include1500 ? '1' : '0',
                allowmultipleVisit: specialityDetailData.allowmultipleVisit ? '1' : '0',
                InitialCode: specialityDetailData.initialCode,
                ReEvalCode: specialityDetailData.reEvalCode,
                specialty: SpecialityAdapter.parseResponse(specialityDetailData.specialty),
                company: specialityDetailData.company,
                mandatoryProcCode: specialityDetailData.mandatoryProcCode? '1' : '0'
            });
        }
        return specialityDetail;
    }


}