import { TestsAdapter } from '../../../medical-provider/rooms/services/adapters/tests-adapter';
import { TestSpecialityDetail } from '../../models/test-speciality-details';

export class TestSpecialityDetailAdapter {
    static parseResponse(testSpecialityDetailData: any): TestSpecialityDetail {
        let testSpecialityDetail = null;
        if (testSpecialityDetailData) {
            testSpecialityDetail = new TestSpecialityDetail({
                id: testSpecialityDetailData.id,
                associatedTestSpecialty: testSpecialityDetailData.associatedTestSpecialty,
                roomTest: TestsAdapter.parseResponse(testSpecialityDetailData.roomTest),
                company: testSpecialityDetailData.company,
                showProcCode: testSpecialityDetailData.showProcCode == true ||  testSpecialityDetailData.showProcCode == undefined ? '1' : '0'
            });
        }
        return testSpecialityDetail;
    }


}