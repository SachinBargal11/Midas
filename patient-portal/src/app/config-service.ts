import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable()
export class ConfigService {

    constructor(private http: Http) {
    }
    public Load(): Promise<any> {
        return new Promise((resolve) => {
            this.http.get('../assets/config.json').map(res => res.json())
            .subscribe((config: any) => {
                    environment.SERVICE_BASE_URL = config.baseUrl;
                    environment.IDENTITY_SERVER_URL = config.identityServerUrl;
                    environment.NOTIFICATION_SERVER_URL = config.notificationServerUrl;
                    environment.HOME_URL = config.home_url;
                    environment.APP_URL = config.app_url
                    resolve(config);
            }, (error: any) => {
                // this._config = new AppConfig();
                // resolve(this._config);
            });
        });
    }
}

export function configServiceFactory(config: ConfigService) {
    return () => config.Load();
}
