import * as moment from 'moment';
import { School } from '../../models/school';

export class SchoolAdapter {
    static parseResponse(data: any): School {

        let school = null;
        if (data) {
            school = new School({
                id: data.id,
                caseId: data.caseId,
                nameOfSchool: data.nameOfSchool,
                grade: data.grade,
                // lossOfTime: data.lossOfTime == true ? '1' : data.lossOfTime == false ? '0' : null,
                lossOfTime: data.lossOfTime,
                datesOutOfSchool: data.datesOutOfSchool,
                isDeleted: false,
                createByUserID: data.createByUserID,
                createDate: moment(data.createDate)
            });
        }
        return school;
    }
}
