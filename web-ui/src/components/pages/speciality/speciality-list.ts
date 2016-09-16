import {Component, OnInit, ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {SpecialityService} from '../../../services/speciality-service';
import {DataTable} from 'primeng/primeng';
import {Speciality} from '../../../models/speciality';

@Component({
    selector: 'speciality-list',
    templateUrl: 'templates/pages/speciality/speciality-list.html',
    providers: [SpecialityService]
})


export class SpecialityListComponent implements OnInit {
specialities: Speciality[];
specialityLoading;
    constructor(
        private _router: Router,
        private _specialityService: SpecialityService
    ) {
    }
    ngOnInit() {
        this.loadSpeciality();
    }
    loadSpeciality() {
        this.specialityLoading = true;
          let speciality = this._specialityService.getSpecialities()
                                .subscribe(specialities => { this.specialities = specialities; },
                                null,
                                  () => { this.specialityLoading = false; });
    }
}