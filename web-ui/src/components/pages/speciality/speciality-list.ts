import {Component, OnInit, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {SpecialityService} from '../../../services/speciality-service';
import {ReversePipe} from '../../../pipes/reverse-array-pipe';
import {LimitPipe} from '../../../pipes/limit-array-pipe';
import {DataTable} from 'primeng/primeng';
import {Specialty} from '../../../models/speciality';

@Component({
    selector: 'speciality-list',
    templateUrl: 'templates/pages/speciality/speciality-list.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    pipes: [ReversePipe, LimitPipe],
    providers: [SpecialityService]
})


export class SpecialityListComponent implements OnInit {
specialties: Specialty[];
    constructor(
        private _router: Router,
        private _specialityService: SpecialityService
    ) {
    }
    ngOnInit() {
         let specialty = this._specialityService.getSpecialities()
                                .subscribe(specialties => this.specialties = specialties);

    }
selectSpeciality(specialty) {
        this._router.navigate(['/specialities/update/' + specialty.specialty.id]);
    }
}