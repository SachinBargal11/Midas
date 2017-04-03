import { Patient } from '../../models/patient';
import { Company } from '../../../../account/models/company';
import { CompanyAdapter } from '../../../../account/services/adapters/company-adapter';
import { UserAdapter } from '../../../../medical-provider/users/services/adapters/user-adapter';
import * as moment from 'moment';

export class PatientAdapter {
    static parseResponse(data: any): Patient {

        let patient: Patient = null;
        let companies: Company[] = [];
        if (data) {
            if (data.user.userCompanies) {
                for (let company of data.user.userCompanies) {
                    companies.push(CompanyAdapter.parseResponse(company.company));
                }
            }
            patient = new Patient({
                id: data.id,
                ssn: data.ssn,
                weight: data.weight,
                height: data.height,
                maritalStatusId: data.maritalStatusId,
                dateOfFirstTreatment: data.dateOfFirstTreatment ? moment(data.dateOfFirstTreatment) : null,
                user: UserAdapter.parseResponse(data.user),
                companyId: data.companyId,
                companies: companies,
                isDeleted: data.isDeleted ? true : false,
                createByUserID: data.createbyuserID,
                createDate: data.createDate ? moment.utc(data.createDate) : null,
                updateByUserID: data.updateByUserID,
                updateDate: data.updateDate ? moment.utc(data.updateDate) : null
            });
        }
        return patient;
    }
}
