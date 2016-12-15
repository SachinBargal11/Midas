import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DoctorsStore} from '../../../stores/doctors-store';
import {Doctor} from '../../../models/doctor';

@Component({
    selector: 'doctors-list',
    templateUrl: 'templates/pages/doctors/doctors-list.html'
})


export class DoctorsListComponent implements OnInit {
    doctors: Doctor[];
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
    onRowSelect(doctor) {
        this._router.navigate(['/doctors/edit/' + doctor.id]);
    }
}