import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Patient} from '../models/patient';
import {PatientsService} from '../services/patients-service';
import {Subject} from "rxjs/Subject";
import {List} from 'immutable';
import {BehaviorSubject} from "rxjs/Rx";
import _ from 'underscore';
import Moment from 'moment';

@Injectable()
export class PatientsStore {

    private _patients: BehaviorSubject<List<Patient>> = new BehaviorSubject(List([]));
    private _selectedPatients: BehaviorSubject<List<Patient>> = new BehaviorSubject(List([]));

    constructor(private _patientsService: PatientsService) {
        this.loadInitialData();
    }

    get patients() {
        return this._patients.asObservable();
    }

    get selectedPatients() {
        return this._selectedPatients.asObservable();
    }

    loadInitialData(): Observable<Patient[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientsService.getPatients().subscribe((patients: Patient[]) => {
                this._patients.next(List(patients));
                resolve(patients);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Patient[]>>Observable.fromPromise(promise);
    }

    findPatientById(id: number) {
        let patients = this._patients.getValue();
        let index = patients.findIndex((currentPatient: Patient) => currentPatient.id === id);
        return patients.get(index);
    }

    fetchPatientById(id: number): Observable<Patient> {
        let promise = new Promise((resolve, reject) => {
            let matchedPatient: Patient = this.findPatientById(id);
            if (matchedPatient) {
                resolve(matchedPatient);
            } else {
                this._patientsService.getPatient(id).subscribe((patient: Patient) => {
                    resolve(patient);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<Patient>>Observable.fromPromise(promise);
    }

    addPatient(patient: Patient): Observable<Patient> {
        let promise = new Promise((resolve, reject) => {
            this._patientsService.addPatient(patient).subscribe((patient: Patient) => {
                this._patients.next(this._patients.getValue().push(patient));
                resolve(patient);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Patient>>Observable.from(promise);
    }

     updatePatient(patient: Patient): Observable<Patient> {
        let patients = this._patients.getValue();
        let index = patients.findIndex((currentPatient: Patient) => currentPatient.id === patient.id);
        let promise = new Promise((resolve, reject) => {
            this._patientsService.updatePatient(patient).subscribe((patient: Patient) => {
                this._patients.next(patients.set(index, patient));
                resolve(patient);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Patient>>Observable.from(promise);
    }
    
      deletePatient(patient: Patient): Observable<Patient> {
        let patients = this._patients.getValue();        
        let index = patients.findIndex((currentPatient: Patient) => currentPatient.id === patient.id);              
        let promise = new Promise((resolve, reject) => {
            this._patientsService.deletePatient(patient).subscribe((patient: Patient) => {
              this._patients.next(patients.delete(index));
                resolve(patient);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Patient>>Observable.from(promise);
    }
    
    selectPatient(patient: Patient) {
        let selectedPatients = this._selectedPatients.getValue();
        let index = selectedPatients.findIndex((currentPatient: Patient) => currentPatient.id === patient.id);
        if (index < 0) {
            this._selectedPatients.next(this._selectedPatients.getValue().push(patient));
        }
    }

    deselectPatient(patient: Patient) {
        let selectedPatients = this._selectedPatients.getValue();
        let index = selectedPatients.findIndex((currentPatient: Patient) => currentPatient.id === patient.id);
        this._selectedPatients.next(selectedPatients.delete(index));
    }


}