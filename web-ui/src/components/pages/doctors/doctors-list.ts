import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {DoctorsStore} from '../../../stores/doctors-store';
import {ReversePipe} from '../../../pipes/reverse-array-pipe';
import {LimitPipe} from '../../../pipes/limit-array-pipe';

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

    constructor(
        private _router: Router,
        private _doctorsStore: DoctorsStore
    ) {
    }
    ngOnInit() {

    }
selectDoctor(doctor) {
        this._router.navigate(['/doctors/update/' + doctor.doctor.id]);
    }
}