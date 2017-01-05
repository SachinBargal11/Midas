import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DoctorsStore} from '../../../stores/doctors-store';
import {Doctor} from '../../../models/doctor';
import { ProgressBarService } from '../../../services/progress-bar-service';

@Component({
    selector: 'doctors-list',
    templateUrl: 'templates/pages/doctors/doctors-list.html'
})


export class DoctorsListComponent implements OnInit {
    doctors: Doctor[];
    constructor(
        private _router: Router,
        private _doctorsStore: DoctorsStore,
        private _progressBarService: ProgressBarService
    ) {
    }
    ngOnInit() {
        this.loadDoctors();
    }
    loadDoctors() {
        this._progressBarService.start();
        let doctor = this._doctorsStore.getDoctors()
            .subscribe(doctors => { this.doctors = doctors; },
            null,
            () => { this._progressBarService.stop(); });
        return doctor;
    }
    onRowSelect(doctor) {
        this._router.navigate(['/doctors/edit/' + doctor.id]);
    }
}