import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {DoctorsStore} from '../../../stores/doctors-store';
import {DoctorsService} from '../../../services/doctors-service';
import {ReversePipe} from '../../../pipes/reverse-array-pipe';
import {LimitPipe} from '../../../pipes/limit-array-pipe';
import {DataTable} from 'primeng/primeng';
import {DoctorDetail} from '../../../models/doctor-details';

@Component({
    selector: 'doctors-list',
    templateUrl: 'templates/pages/doctors/doctors-list.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    pipes: [ReversePipe, LimitPipe],
    providers: [DoctorsStore]
})


export class DoctorsListComponent implements OnInit {
doctors: DoctorDetail[];
    constructor(
        private _router: Router,
        private _doctorsStore: DoctorsStore,
        private _doctorsService: DoctorsService
    ) {
    }
    ngOnInit() {
         let user = this._doctorsService.getDoctors()
                                .subscribe(doctors => this.doctors = doctors);

    }
selectDoctor(doctor) {
        this._router.navigate(['/doctors/update/' + doctor.doctor.id]);
    }
}