import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/primeng'
//
import { SpecialityDetail } from '../../models/speciality-details';
import { TestSpecialityDetail } from '../../models/test-speciality-details';
//
import { SpecialityStore } from '../../stores/speciality-store';
import { Speciality } from '../../models/speciality';
import { Tests } from '../../../medical-provider/rooms/models/tests';
import { RoomsStore } from '../../../medical-provider/rooms/stores/rooms-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { SpecialityDetailsStore } from '../../stores/speciality-details-store';
import { TestSpecialityDetailsStore } from '../../stores/test-speciality-details-store';
import { SessionStore } from '../../../commons/stores/session-store';

@Component({
    selector: 'speciality-list',
    templateUrl: './speciality-list.html'
})


export class SpecialityListComponent implements OnInit {
    specialities: Speciality[];
    specialityDetail: any;
    testSpecialityDetail: any;
    datasource: Speciality[];
    testdatasource : Tests[];
    totalRecords: number;
    testSpecialities: Tests[];

    constructor(
        private _router: Router,
        private _specialityStore: SpecialityStore,
        private _testSpecialityStore: RoomsStore,
        private _progressBarService: ProgressBarService,
        public _sessionStore: SessionStore,
        private _specialityDetailsStore: SpecialityDetailsStore,
        private _testSpecialityDetailsStore: TestSpecialityDetailsStore
       
    ) {

    }

    ngOnInit() {
        this.loadSpeciality();
        this.loadTests();
    }

    loadSpeciality() {
        this._progressBarService.show();
        this._specialityStore.getSpecialities()
            .subscribe(specialities => { 
                this.specialities = specialities.reverse(); 
            },
            null,
            () => { this._progressBarService.hide(); });
    }

    loadTests()
    {
        this._testSpecialityStore.getTests().subscribe(testSpecialities=>{
            this.testSpecialities = testSpecialities.reverse();
        },
        null,
        ()=>{this._progressBarService.hide();});
    }
    
    loadSpecialitiesLazy(event: LazyLoadEvent) {
        setTimeout(() => {
            if(this.datasource) {
                this.specialities = this.datasource.slice(event.first, (event.first + event.rows));
            }
            if(this.testdatasource){
                this.testSpecialities = this.testdatasource.slice(event.first,(event.first + event.rows));
            }
        }, 250);
    }


    loadAddEditSpeciality(speciality) {
        let requestData = {
            company: {
                id: this._sessionStore.session.currentCompany.id
            },
            specialty: {
                id: speciality.id
            }
        };
        let result = this._specialityDetailsStore.getSpecialityDetails(requestData);
        result.subscribe(
            (specialityDetails) => {
                this.specialityDetail = specialityDetails;
                // if (this.specialityDetails.length > 0) {
                if (this.specialityDetail.id !== undefined) {
                    this._router.navigate(['/account-setup/specialities/' + speciality.id + '/edit/' + this.specialityDetail.id]);
                } else {
                    this._router.navigate(['/account-setup/specialities/' + speciality.id + '/add']);

                }
            },
            (error) => {
                this._router.navigate(['/account-setup/specialities']);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    loadAddEditTestSpeciality(testSpeciality) {
        let requestData = {
            company: {
                id: this._sessionStore.session.currentCompany.id
            },
            roomTest: {
                id: testSpeciality.id
            }
        };
        let result = this._testSpecialityDetailsStore.getTestSpecialityDetails(requestData);
        result.subscribe(
            (testSpecialityDetails) => {
                this.testSpecialityDetail = testSpecialityDetails;
                if (this.testSpecialityDetail.id !== undefined) {
                    this._router.navigate(['/account-setup/specialities/test-speciality/' + testSpeciality.id + '/edit/' + this.testSpecialityDetail.id]);
                } else {
                    this._router.navigate(['/account-setup/specialities/test-speciality/' + testSpeciality.id + '/add']);

                }
            },
            (error) => {
                this._router.navigate(['/account-setup/specialities']);
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
}