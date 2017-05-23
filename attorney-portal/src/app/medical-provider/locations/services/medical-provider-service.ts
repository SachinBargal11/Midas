import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
// import {environment} from '../../environments/environment';

@Injectable()
export class MedicalProviderService {

    // private _url: string = `${environment.SERVICE_BASE_URL}`;
    private _headers: Headers = new Headers();

    constructor(
        private _http: Http
    ) {
        this._headers.append('Content-Type', 'application/json');
    }

}

