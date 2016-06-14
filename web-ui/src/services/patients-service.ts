import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Patient} from '../models/patient';


@Injectable()
export class PatientsService {

    private _url = "http://localhost:3004/patients";

    constructor(private _http: Http) {}

    getPatients() {
        return this._http.get(this._url);
    }

    addPatient(patient: Patient) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this._url, JSON.stringify(patient), {
            headers: headers
        });
    }

    updatePatient(patient: Patient) {
        return this._http.put(`${this._url}/${patient.id}`, JSON.stringify(patient));            
    }

    deletePatient(patientId: number) {
        return this._http.delete(`${this._url}/${patientId}`);
    }
}