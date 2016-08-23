import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import Environment from '../scripts/environment';
import {Provider} from '../models/provider';
import {SessionStore} from '../stores/session-store';
import {ProviderAdapter} from './adapters/provider-adapter';

@Injectable()
export class ProvidersService {

    private _url: string = `${Environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http,
        private _sessionStore: SessionStore
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

    getProviders(): Observable<Provider[]> {
            return this._http.get(this._url + '/Provider/GetAll').map(res => res.json());
    }

    addProvider(providerDetail: Provider): Observable<Provider> {
        let promise: Promise<Provider> = new Promise((resolve, reject) => {


            let providerDetailRequestData = providerDetail.toJS();

            // remove unneeded keys 
            providerDetailRequestData.provider = _.omit(providerDetailRequestData.provider, 'providerMedicalFacilities',  'createDate', 'updateByUserID', 'updateDate');

            return this._http.post(this._url + '/Provider/Add', JSON.stringify(providerDetailRequestData), {
                headers: this._headers
            })
                .map(res => res.json())
                .subscribe((providerData: any) => {
                    let parsedProvider: Provider = null;
                    parsedProvider = ProviderAdapter.parseResponse(providerData);
                    resolve(parsedProvider);
                }, (error) => {
                    reject(error);
                });
        });
        return <Observable<Provider>>Observable.fromPromise(promise);

    }

}

