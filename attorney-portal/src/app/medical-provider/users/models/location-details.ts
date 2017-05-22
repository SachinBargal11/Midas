import { Record } from 'immutable';
import { Company } from '../../../account/models/company';
import { Location } from './location';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { Schedule } from '../../locations/models/schedule';

const LocationDetailsRecord = Record({
    company: null,
    location: null,
    contact: null,
    address: null,
    schedule: null
});

export class LocationDetails extends LocationDetailsRecord {
    company: Company;
    location: Location;
    contact: Contact;
    address: Address;
    schedule: Schedule;

    constructor(props) {
        super(props);
    }

}