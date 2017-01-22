import { Component } from '@angular/core';
// import {UsersStore} from '../../stores/users-store';
// import {DoctorsStore} from '../../stores/doctors-store';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
})

export class DashboardComponent {
    users: any;
    doctors: any;
    providers: any;
    medicalfacilities: any;
    constructor(
    ) {

    }
}