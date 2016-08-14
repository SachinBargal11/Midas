import {Record} from 'immutable';
import moment from 'moment';
import {AccountStatus} from './enums/AccountStatus';

const ProviderRecord = Record({
provider:{
    id: 0,
    name: "",
    npi: "",
    federalTaxID: "",
    prefix: "",    
    providerMedicalFacilities: "",
    isDeleted: 0,
    createByUserID: 0,
    updateByUserID: 0,
    createDate: null,
    updateDate: null
    }
});

export class Provider extends ProviderRecord {
provider:{
    id: number;
    name: string;
    npi: string;
    federalTaxID: string;
    prefix: string;
    providerMedicalFacilities: string;
    isDeleted: boolean;
    createByUserID: number;
    updateByUserID: number;
    createDate: moment.MomentStatic;
    updateDate: moment.MomentStatic;
}
    constructor(props) {
        super(props);
    }
}