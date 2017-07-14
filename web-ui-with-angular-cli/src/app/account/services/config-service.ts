import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';

// import { AppConfig } from '../../../assets/app.config';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigService {
    // private _config: AppConfig;

    constructor(private http: Http) {
    // constructor(private http: Http, private config: AppConfig) {
    }

    // public Load(): Promise<AppConfig> {
    public Load(): Promise<any> {
        return new Promise((resolve) => {
            this.http.get('../../../assets/config.json').map(res => res.json())
            .subscribe((config: any) => {
                    environment.SERVICE_BASE_URL = config.baseUrl;
                    resolve(config);
            // .subscribe((config: AppConfig) => {
                // this.copyConfiguration(config, new AppConfig()).then((data: AppConfig) => {
                //     this._config = data;
                    // resolve(this._config);
                // });
            }, (error: any) => {
                // this._config = new AppConfig();
                // resolve(this._config);
            });
        });
    }
//    public getApiUrl(): Observable<any> {
//         let promise: Promise<any> = new Promise((resolve, reject) => {
//             return this.http.get('../../../assets/config.json').map(res => res.json())
//                 .subscribe((data: any) => {
//                     resolve(data);
//                 }, (error) => {
//                     reject(error);
//                 });
//         });
//         return <Observable<any>>Observable.fromPromise(promise);
//     }

    // public GetApiUrl(endPoint: any): string {
    //     return `${this._config.ApiUrls.BaseUrl}/${this._config.ApiUrls[ endPoint ]}`;
    // }

//     public GetApiEndPoint(endPoint: any): string {
//         return this._config.ApiUrls[ endPoint ];
//     }

//     public Get(key: any): any {
//         return this._config[ key ];
//     }

//     private copyConfiguration(source: Object, destination: Object): any {
//         return new Promise(function(resolve) {
//             Object.keys(source).forEach(function(key) {
//                 destination[ key ] = source[ key ];
//                 resolve(destination);
//             });
//         });
//     }
}

export function configServiceFactory(config: ConfigService) {
    return () => config.Load();
}
// const environment = LOCAL_DEV_ENV;

// export default environment;