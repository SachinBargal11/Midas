import {Provider} from '../../models/provider';
import Moment from 'moment';


export class ProviderAdapter {
    static parseResponse(providerData: any): Provider {

        let provider = null;
        if (providerData) {
            provider = new Provider({
              provider: {
                id: providerData.id,
                name: providerData.name,
                npi: providerData.npi,
                federalTaxID: providerData.federalTaxID,
                prefix: providerData.prefix
              }
            });
        }
        return provider;
    }
}