import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
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
    providers: [DoctorsService]
})


export class DoctorsListComponent implements OnInit {
doctors: DoctorDetail[];
    constructor(
        private _router: Router,
        private _doctorsService: DoctorsService
    ) {
    }
    ngOnInit() {
         let doctor = this._doctorsService.getDoctors()
                                .subscribe(doctors => this.doctors = doctors);

    }
}