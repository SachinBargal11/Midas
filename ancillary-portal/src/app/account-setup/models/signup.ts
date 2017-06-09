import { Record } from 'immutable';
import * as moment from 'moment';
import * as _ from 'underscore';
import { User } from '../../commons/models/user';
import { Company } from '../../account/models/company';
import { Contact } from '../../commons/models/contact';

const SignupRecord = Record({
    company: null,
    user: null,
    contactInfo: null,
    originalResponse: null
});

export class Signup extends SignupRecord {
    company: Company;
    user: User;
    contactInfo: Contact;
    originalResponse: any

    constructor(props) {
        super(props);
    }
}