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
    
    currentPatient;

    constructor(private _patientsService: PatientsService) {
        this.loadInitialData();
    }

    get patients() {
        return this._patients.asObservable();
    }

    get selectedPatients() {
        return this._selectedPatients.asObservable();
    }

    loadInitialData() {
        this._patientsService.getPatients().subscribe((data: any) => {
            let patients = (<Object[]>data.json()).map((patientData: any) =>
                new Patient({
                    id: patientData.id,
                    firstname: patientData.firstname, 
                    lastname: patientData.lastname, 
                    email: patientData.email, 
                    mobileNo: patientData.mobileNo, 
                    address: patientData.address, 
                    dob: Moment(patientData.dob)
                }));

            this._patients.next(List(patients));
        }, error => console.log('Could not load patients.'));
    }

    findPatientById(id: number) {
        let patients = this._patients.getValue();
        let index = patients.findIndex((currentPatient: Patient) => currentPatient.id === id);
        this.currentPatient = patients.get(index);
        return patients.get(index);
    }

    addPatient(patient: Patient) {
        let obs = this._patientsService.addPatient(patient);
        
        obs.subscribe(
            res => {
                this._patients.next(this._patients.getValue().push(patient));
            });

        return obs;
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