import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SpecialityStore} from '../../../../stores/speciality-store';
import {Speciality} from '../../../../models/speciality';
import { ProgressBarService } from '../../../../services/progress-bar-service';

@Component({
    selector: 'speciality-list',
    templateUrl: 'templates/pages/account-setup/speciality/speciality-list.html'
})


export class SpecialityListComponent implements OnInit {
    specialities: Speciality[];
    constructor(
        private _router: Router,
        private _specialityStore: SpecialityStore,
        private _progressBarService: ProgressBarService
    ) {

    }

    ngOnInit() {
        this.loadSpeciality();
    }

    loadSpeciality() {
        this._progressBarService.show();
        this._specialityStore.getSpecialities()
            .subscribe(specialities => { this.specialities = specialities; },
            null,
            () => { this._progressBarService.hide(); });
    }
}