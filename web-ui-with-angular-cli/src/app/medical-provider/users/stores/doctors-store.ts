import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {Doctor} from '../models/doctor';
import {DoctorsService} from '../services/doctors-service';
import {SessionStore} from '../../../commons/stores/session-store';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';


@Injectable()
export class DoctorsStore {

    private _doctors: BehaviorSubject<List<Doctor>> = new BehaviorSubject(List([]));
    private _selectedDoctors: BehaviorSubject<List<Doctor>> = new BehaviorSubject(List([]));

   constructor(
        private _doctorsService: DoctorsService,
        private _sessionStore: SessionStore
    ) {
        this._sessionStore.userLogoutEvent.subscribe(() => {
            this.resetStore();
        });
    }

    resetStore() {
        this._doctors.next(this._doctors.getValue().clear());
        this._selectedDoctors.next(this._selectedDoctors.getValue().clear());
    }


    get doctors() {
        return this._doctors.asObservable();
    }

    get selectedDoctors(){
        return this._selectedDoctors.asObservable();
    }

    getDoctors(): Observable<Doctor[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorsService.getDoctors().subscribe((doctors: Doctor[]) => {
                this._doctors.next(List(doctors));
                resolve(doctors);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Doctor[]>>Observable.fromPromise(promise);
    }
    getDoctorsByCompanyId(): Observable<Doctor[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._doctorsService.getDoctorsByCompanyId(companyId).subscribe((doctors: Doctor[]) => {
                this._doctors.next(List(doctors));
                resolve(doctors);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Doctor[]>>Observable.fromPromise(promise);
    }
    getReadingDoctorsByCompanyId(): Observable<Doctor[]> {
        let companyId: number = this._sessionStore.session.currentCompany.id;
        let promise = new Promise((resolve, reject) => {
            this._doctorsService.getReadingDoctorsByCompanyId(companyId).subscribe((doctors: Doctor[]) => {
                this._doctors.next(List(doctors));
                resolve(doctors);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Doctor[]>>Observable.fromPromise(promise);
    }
    getDoctorsBySpecialityInAllApp(specialityId: number): Observable<Doctor[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorsService.getDoctorsBySpecialityInAllApp(specialityId).subscribe((doctors: Doctor[]) => {
                this._doctors.next(List(doctors));
                resolve(doctors);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Doctor[]>>Observable.fromPromise(promise);
    }

    findDoctorById(id: number) {
        let doctors = this._doctors.getValue();
        let index = doctors.findIndex((currentDoctor: Doctor) => currentDoctor.id === id);
        return doctors.get(index);
    }

    fetchDoctorById(id: number): Observable<Doctor> {
        let promise = new Promise((resolve, reject) => {
            // let matchedDoctor: Doctor = this.findDoctorById(id);
            // if (matchedDoctor) {
            //     resolve(matchedDoctor);
            // } else {
                this._doctorsService.getDoctor(id)
                .subscribe((doctorDetail: Doctor) => {
                    resolve(doctorDetail);
                }, error => {
                    reject(error);
                });
            // }
        });
        return <Observable<Doctor>>Observable.fromPromise(promise);
    }


    addDoctor(doctorDetail: Doctor): Observable<Doctor> {
        let promise = new Promise((resolve, reject) => {
            this._doctorsService.addDoctor(doctorDetail).subscribe((doctor: Doctor) => {
                this._doctors.next(this._doctors.getValue().push(doctor));
                resolve(doctor);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Doctor>>Observable.from(promise);
    }
    updateDoctor(doctorDetail: Doctor): Observable<Doctor> {
        let promise = new Promise((resolve, reject) => {
            this._doctorsService.updateDoctor(doctorDetail).subscribe((updatedDoctor: Doctor) => {
                let doctorDetails: List<Doctor> = this._doctors.getValue();
                let index = doctorDetails.findIndex((currentDoctor: Doctor) => currentDoctor.id === updatedDoctor.id);
                doctorDetails = doctorDetails.update(index, function () {
                    return updatedDoctor;
                });
                this._doctors.next(doctorDetails);
                resolve(doctorDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<Doctor>>Observable.from(promise);
    }

    selectDoctor(doctorDetail: Doctor) {
        let selectedDoctors = this._selectedDoctors.getValue();
        let index = selectedDoctors.findIndex((currentDoctor: Doctor) => currentDoctor.id === doctorDetail.id);
        if (index < 0) {
            this._selectedDoctors.next(this._selectedDoctors.getValue().push(doctorDetail));
        }
    }

}