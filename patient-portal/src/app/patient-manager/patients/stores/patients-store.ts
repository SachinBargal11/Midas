import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Patient} from '../models/patient';
import {PatientsService} from '../services/patients-service';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';
import {SessionStore} from '../../../commons/stores/session-store';

@Injectable()
export class PatientsStore {

    private _patients: BehaviorSubject<List<Patient>> = new BehaviorSubject(List([]));
    private _patientsWithOpenCases: BehaviorSubject<List<Patient>> = new BehaviorSubject(List([]));
    private _selectedPatients: BehaviorSubject<List<Patient>> = new BehaviorSubject(List([]));

    constructor(
        private _patientsService: PatientsService,
        private _sessionStore: SessionStore
    ) {
        // this.getPatients();
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._patients.next(this._patients.getValue().clear());
        this._selectedPatients.next(this._selectedPatients.getValue().clear());
    }

    get patients() {
        return this._patients.asObservable();
    }

    get patientsWithOpenCases() {
        return this._patientsWithOpenCases.asObservable();
    }

    get selectedPatients() {
        return this._selectedPatients.asObservable();
    }

    // getPatients(): Observable<Patient[]> {
    //     let promise = new Promise((resolve, reject) => {
    //         this._patientsService.getPatients().subscribe((patients: Patient[]) => {
    //             this._patients.next(List(patients));
    //             resolve(patients);
    //         }, error => {
    //             reject(error);
    //         });
    //     });
    //     return <Observable<Patient[]>>Observable.fromPromise(promise);
    // }

        //
     getPatientsWithNoCase(): Observable<Patient[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientsService.getPatientsWithNoCase().subscribe((patients: Patient[]) => {
                resolve(patients);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Patient[]>>Observable.fromPromise(promise);
    }

    //

    getPatientsWithOpenCases(): Observable<Patient[]> {
        let promise = new Promise((resolve, reject) => {
            this._patientsService.getPatientsWithOpenCases().subscribe((patients: Patient[]) => {
                this._patientsWithOpenCases.next(List(patients));
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

    getPatientById(id: number): Observable<Patient> {
        let promise = new Promise((resolve, reject) => {
            this._patientsService.getPatient(id).subscribe((patient: Patient) => {
                resolve(patient);
            }, error => {
                reject(error);
            });
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
        let promise = new Promise((resolve, reject) => {
            this._patientsService.updatePatient(patient).subscribe((updatedPatient: Patient) => {
                let patientDetails: List<Patient> = this._patients.getValue();
                let index = patientDetails.findIndex((currentPatient: Patient) => currentPatient.id === updatedPatient.id);
                patientDetails = patientDetails.update(index, function () {
                    return updatedPatient;
                });
                this._patients.next(patientDetails);
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