import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SpecialityStore} from '../../../stores/speciality-store';
import {Speciality} from '../../../models/speciality';

@Component({
    selector: 'speciality-list',
    templateUrl: 'templates/pages/speciality/speciality-list.html'
})


export class SpecialityListComponent implements OnInit {
    specialities: Speciality[];
    specialityLoading;
    constructor(
        private _router: Router,
        private _specialityStore: SpecialityStore
    ) {

    }

    ngOnInit() {
        this.loadSpeciality();
    }

    loadSpeciality() {
        this.specialityLoading = true;
        this._specialityStore.getSpecialities()
            .subscribe(specialities => { this.specialities = specialities; },
            null,
            () => { this.specialityLoading = false; });
    }
}