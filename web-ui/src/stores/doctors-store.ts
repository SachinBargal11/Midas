import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import {DoctorDetail} from '../models/doctor-details';
import {DoctorsService} from '../services/doctors-service';
import {SessionStore} from './session-store';
import {List} from 'immutable';
import {BehaviorSubject} from 'rxjs/Rx';


@Injectable()
export class DoctorsStore {

    private _doctors: BehaviorSubject<List<DoctorDetail>> = new BehaviorSubject(List([]));
    private _selectedDoctors: BehaviorSubject<List<DoctorDetail>> = new BehaviorSubject(List([]));

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

    getDoctors(): Observable<DoctorDetail[]> {
        let promise = new Promise((resolve, reject) => {
            this._doctorsService.getDoctors().subscribe((doctors: DoctorDetail[]) => {
                this._doctors.next(List(doctors));
                resolve(doctors);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DoctorDetail[]>>Observable.fromPromise(promise);
    }

    findDoctorById(id: number) {
        let doctors = this._doctors.getValue();
        let index = doctors.findIndex((currentDoctor: DoctorDetail) => currentDoctor.doctor.id === id);
        return doctors.get(index);
    }

    fetchDoctorById(id: number): Observable<DoctorDetail> {
        let promise = new Promise((resolve, reject) => {
            let matchedDoctor: DoctorDetail = this.findDoctorById(id);
            if (matchedDoctor) {
                resolve(matchedDoctor);
            } else {
                this._doctorsService.getDoctor(id)
                .subscribe((doctorDetail: DoctorDetail) => {
                    resolve(doctorDetail);
                }, error => {
                    reject(error);
                });
            }
        });
        return <Observable<DoctorDetail>>Observable.fromPromise(promise);
    }


    addDoctor(doctorDetail: DoctorDetail): Observable<DoctorDetail> {
        let promise = new Promise((resolve, reject) => {
            this._doctorsService.addDoctor(doctorDetail).subscribe((doctor: DoctorDetail) => {
                this._doctors.next(this._doctors.getValue().push(doctor));
                resolve(doctor);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DoctorDetail>>Observable.from(promise);
    }
    updateDoctor(doctorDetail: DoctorDetail): Observable<DoctorDetail> {
        let promise = new Promise((resolve, reject) => {
            this._doctorsService.updateDoctor(doctorDetail).subscribe((doctorDetail: DoctorDetail) => {
                this._doctors.next(this._doctors.getValue().push(doctorDetail));
                resolve(doctorDetail);
            }, error => {
                reject(error);
            });
        });
        return <Observable<DoctorDetail>>Observable.from(promise);
    }

    selectDoctor(doctorDetail: DoctorDetail) {
        let selectedDoctors = this._selectedDoctors.getValue();
        let index = selectedDoctors.findIndex((currentDoctor: DoctorDetail) => currentDoctor.doctor.id === doctorDetail.doctor.id);
        if (index < 0) {
            this._selectedDoctors.next(this._selectedDoctors.getValue().push(doctorDetail));
        }
    }

}