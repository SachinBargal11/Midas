import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DoctorsStore} from '../../../stores/doctors-store';
import {DoctorDetail} from '../../../models/doctor-details';

@Component({
    selector: 'doctors-list',
    templateUrl: 'templates/pages/doctors/doctors-list.html'
})


export class DoctorsListComponent implements OnInit {
    doctors: DoctorDetail[];
    doctorsLoading;
    constructor(
        private _router: Router,
        private _doctorsStore: DoctorsStore
    ) {
    }
    ngOnInit() {
        this.loadDoctors();
    }
    loadDoctors() {
        this.doctorsLoading = true;
        let doctor = this._doctorsStore.getDoctors()
            .subscribe(doctors => { this.doctors = doctors; },
            null,
            () => { this.doctorsLoading = false; });
        return doctor;
    }
}