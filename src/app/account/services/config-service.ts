import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ConfigService {
    url: string;
    constructor(private http: Http) {
    }

    public Load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('../../../assets/config.json').map(res => res.json())
                .subscribe((config: any) => {
                    environment.SERVICE_BASE_URL = config.baseUrl;
                    environment.IDENTITY_SERVER_URL = config.identityServerUrl;
                    environment.NOTIFICATION_SERVER_URL = config.notificationServerUrl;
                    environment.HOME_URL = config.home_url;
                    environment.MP_URL = config.mp_url;
                    environment.IDENTITY_SCOPE = config.identity_scope;
                    environment.CLIENT_ID = config.client_id;
                    resolve(environment);
                }, (error: any) => {
                    reject(new Error('UNABLE_TO_LOAD_CONFIG'));
                });
        });
    }

    loadConfig(): Observable<any> {
        let promise: Promise<any> = new Promise((resolve, reject) => {
            return this.http.get('../../../assets/config.json').map(res => res.json())
                .subscribe((config: any) => {
                    environment.SERVICE_BASE_URL = config.baseUrl;
                    environment.IDENTITY_SERVER_URL = config.identityServerUrl;
                    environment.NOTIFICATION_SERVER_URL = config.notificationServerUrl;
                    environment.HOME_URL = config.home_url;
                    environment.MP_URL = config.mp_url;
                    environment.IDENTITY_SCOPE = config.identity_scope;
                    environment.CLIENT_ID = config.client_id;
                    resolve(environment);
                }, (error) => {
                    reject(new Error('UNABLE_TO_LOAD_CONFIG'));
                });

        });
        return <Observable<any>>Observable.fromPromise(promise);
    }
}

export function configServiceFactory(config: ConfigService) {
    return () => config.Load();
}
