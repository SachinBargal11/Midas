// import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs/Observable';
// import {Observer} from 'rxjs/Observer';
// import 'rxjs/add/operator/share';
// import 'rxjs/add/operator/map';
// import {Patient} from '../models/patient';
// import {PatientsService} from '../services/patients-service';
// import _ from 'underscore';
// import Moment from 'moment';

// @Injectable()
// export class PatientsStore {

//     patients$: Observable<Patient[]>;
//     private _patientsObserver: Observer<Patient[]>;

//     selectedPatients$: Observable<Patient[]>;
//     private _selectedPatientsObserver: Observer<Patient[]>;

//     private _dataStore: {
//         patients: Patient[],
//         selectedPatients: Patient[]
//     };

//     constructor(private _patientsService: PatientsService) {
//         this.patients$ = new Observable(observer => this._patientsObserver = observer).share();
//         this.selectedPatients$ = new Observable(observer => this._selectedPatientsObserver = observer).share();
//         this._dataStore = { patients: [], selectedPatients: [] };
//         this.getPatients();
//     }

//     selectPatient(patient: Patient) {
//         if (!_.findWhere(this._dataStore.selectedPatients, { id: patient.id })) {
//             this._dataStore.selectedPatients.push(patient);
//             if (this._dataStore.selectedPatients.length > 0) {
//                 this._selectedPatientsObserver.next(this._dataStore.selectedPatients);
//             }
//         }
//     }

//     deselectPatient(patient: Patient) {
//         this._dataStore.selectedPatients.forEach((t, i) => {
//             if (t.id === patient.id) { this._dataStore.selectedPatients.splice(i, 1); }
//         });
//         console.log(3);
        
//         this._selectedPatientsObserver.next(this._dataStore.selectedPatients);
//     }

//     getSelectedPatients() {
//         _.defer(() => {
//             if (this._dataStore.selectedPatients.length > 0) {
//                 console.log("1");
                
//                 this._selectedPatientsObserver.next(this._dataStore.selectedPatients);
//             }
//         });
//     }

//     findPatientById(id: number) {
//         return _.findWhere(this._dataStore.patients, { id: id });
//     }

//     getPatients() {
//         console.log("Hello");

//         this._patientsService.getPatients().subscribe((data: any) => {
//             let patients = (<Object[]>data.json()).map((patientData: any) =>
//                 new Patient(patientData.id, patientData.name, Moment(patientData.dob)));

//             this._dataStore.patients = patients;
//             if (this._dataStore.patients.length > 0) {
//                 this._patientsObserver.next(this._dataStore.patients);
//             }
//         }, error => console.log('Could not load patients.'));
//     }

//     // addPatient(patient: Patient) {
//     //     this._patientsService.addPatient(patient).subscribe((data: any) => {
//     //         patient.id = data.id;
//     //         this._dataStore.patients.push(patient);
//     //         this._patientsObserver.next(this._dataStore.patients);
//     //     }, error => console.log('Could not create patient.'));
//     // }

//     // updatePatient(patient: Patient) {
//     //     this._patientsService.updatePatient(patient).subscribe((data: any) => {
//     //         this._dataStore.patients.forEach((patient, i) => {
//     //             if (patient.id === data.id) { this._dataStore.patients[i] = data; }
//     //         });

//     //         this._patientsObserver.next(this._dataStore.patients);
//     //     }, error => console.log('Could not update patient.'));
//     // }

//     // deletePatient(patientId: number) {
//     //     this._patientsService.deletePatient(patientId).subscribe(response => {
//     //         this._dataStore.patients.forEach((t, i) => {
//     //             if (t.id === patientId) { this._dataStore.patients.splice(i, 1); }
//     //         });

//     //         this._patientsObserver.next(this._dataStore.patients);
//     //     }, error => console.log('Could not delete patient.'));
//     // }
// }