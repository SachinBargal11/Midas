import * as moment from 'moment';
import { Signup } from '../../models/signup';
import { UserAdapter } from '../../../medical-provider/users/services/adapters/user-adapter';;
import { CompanyAdapter } from '../../../account/services/adapters/company-adapter';
import { ContactAdapter } from '../../../commons/services/adapters/contact-adapter';


export class SignupAdapter {
    static parseResponse(data: any): Signup {
        let signup = null;
        if (data) {
            signup = new Signup({
                company: CompanyAdapter.parseResponse(data.company),
                user: UserAdapter.parseResponse(data.user),
                contactInfo: ContactAdapter.parseResponse(data.contactInfo),
            });
        }
        return signup;
    }
}