import { Patient } from '../../models/patient';
import { UserAdapter } from '../../../../medical-provider/users/services/adapters/user-adapter';
import { EmployerAdapter } from '../../services/adapters/employer-adapter';
import { InsuranceAdapter } from '../../services/adapters/insurance-adapter';
import { AccidentAdapter } from '../../services/adapters/accident-adapter';
import * as moment from 'moment';

export class PatientAdapter {
    static parseResponse(data: any): Patient {

        let patient: Patient = null;
        if (data) {
            patient = new Patient({
                id: data.id,
                ssn: data.ssn,
                weight: data.weight,
                height: data.height,
                maritalStatusId: data.maritalStatusId,
                dateOfFirstTreatment: data.dateOfFirstTreatment ? moment(data.dateOfFirstTreatment) : null,
                user: UserAdapter.parseResponse(data.user),
                companyId: data.companyId,
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