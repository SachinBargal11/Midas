import {Component} from '@angular/core';
import {UsersStore} from '../../stores/users-store';
import {DoctorsStore} from '../../stores/doctors-store';
import {ProvidersStore} from '../../stores/providers-store';
import {MedicalFacilityStore} from '../../stores/medical-facilities-store';

@Component({
    selector: 'dashboard',
    templateUrl: 'templates/pages/dashboard.html',
})

export class DashboardComponent {
users: any;
doctors: any;
providers: any;
medicalfacilities: any;
    constructor(
        private _usersStore: UsersStore,
        private _doctorsStore: DoctorsStore,
        private _providersStore: ProvidersStore,
        private _medicalFacilityStore: MedicalFacilityStore
    ) {
        // this._usersStore.getUsers().subscribe(users => {
        // this.users = users.length;
        // });
        // this._doctorsStore.getDoctors().subscribe(doctors => {
        // this.doctors = doctors.length;
        // });
        // this._providersStore.getProviders().subscribe(providers => {
        // this.providers = providers.length;
        // });
        // this._medicalFacilityStore.getMedicalFacilities().subscribe(medicalfacilities => {
        // this.medicalfacilities = medicalfacilities.length;
        // });
    }
}