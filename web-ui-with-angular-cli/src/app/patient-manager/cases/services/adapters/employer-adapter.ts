import * as moment from 'moment';
import { Employer } from '../../models/employer';
import { AddressAdapter } from '../../../../commons/services/adapters/address-adapter';
import { ContactAdapter } from '../../../../commons/services/adapters/contact-adapter';

export class EmployerAdapter {
    static parseResponse(data: any): Employer {

        let employer = null;
        if (data) {
            employer = new Employer({
                id: data.id,
                caseId: data.caseId,
                jobTitle: data.jobTitle,
                empName: data.empName,
                isCurrentEmp: data.isCurrentEmp == true ? '1' : data.transportation == false ? '0' : null,
                createByUserID: data.createByUserID,
                createDate: moment(data.createDate),
                contact: ContactAdapter.parseResponse(data.contactInfo),
                address: AddressAdapter.parseResponse(data.addressInfo),
                salary: data.salary,
                hourOrYearly: data.hourOrYearly == true ? '1' : data.hourOrYearly == false ? '0' : null,
                lossOfEarnings: data.lossOfEarnings == true ? '1' : data.lossOfEarnings == false ? '0' : null,
                datesOutOfWork: data.datesOutOfWork,
                hoursPerWeek: data.hoursPerWeek,
                accidentAtEmployment: data.accidentAtEmployment == true ? '1' : data.accidentAtEmployment == false ? '0' : null
            });
        }
        return employer;
    }
}
