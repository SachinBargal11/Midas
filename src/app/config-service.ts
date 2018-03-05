import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ConfigService {
    url: string;
    constructor(private http: Http) {
    }

    public Load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('../assets/config.json').map(res => res.json())
                .subscribe((config: any) => {
                    environment.IDENTITY_SCOPE = config.IDENTITY_SCOPE;
                    environment.AUTHORIZATION_SERVER_URL = config.AUTHORIZATION_SERVER_URL;
                    environment.CLIENT_ID = config.CLIENT_ID;
                    environment.MEDICAL_PROVIDER_URI = config.MEDICAL_PROVIDER_URI;
                    environment.PATIENT_PORTAL_URI = config.PATIENT_PORTAL_URI;
                    environment.ATTORNEY_PORTAL_URI = config.ATTORNEY_PORTAL_URI;
                    environment.ANCILLARY_PORTAL_URI = config.ANCILLARY_PORTAL_URI;
                    resolve(environment);
                }, (error: any) => {
                    reject(new Error('UNABLE_TO_LOAD_CONFIG'));
                });
        });
    }

    // loadConfig(): Observable<any> {
    //     let promise: Promise<any> = new Promise((resolve, reject) => {
    //         return this.http.get('../assets/config.json').map(res => res.json())
    //             .subscribe((config: any) => {
    //                 environment.IDENTITY_SCOPE = config.IDENTITY_SCOPE;
    //                 environment.AUTHORIZATION_SERVER_URL = config.AUTHORIZATION_SERVER_URL;
    //                 environment.CLIENT_ID = config.CLIENT_ID;
    //                 environment.MEDICAL_PROVIDER_URI = config.MEDICAL_PROVIDER_URI;
    //                 environment.PATIENT_PORTAL_URI = config.PATIENT_PORTAL_URI;
    //                 environment.ATTORNEY_PORTAL_URI = config.ATTORNEY_PORTAL_URI;
    //                 environment.ANCILLARY_PORTAL_URI = config.ANCILLARY_PORTAL_URI;
    //                 resolve(environment);
    //             }, (error) => {
    //                 reject(new Error('UNABLE_TO_LOAD_CONFIG'));
    //             });

    //     });
    //     return <Observable<any>>Observable.fromPromise(promise);
    // }
}

export function configServiceFactory(config: ConfigService) {
    return () => config.Load();
}
