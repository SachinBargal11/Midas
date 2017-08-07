import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigService {
    url: string;
    constructor(private http: Http) {
    }

    public Load(): Promise<any> {
        return new Promise((resolve) => {
                this.http.get('../../../assets/config.json').map(res => res.json())
                    .subscribe((config: any) => {
                        environment.SERVICE_BASE_URL = config.baseUrl;
                        resolve(environment);
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
