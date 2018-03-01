import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientsStore } from '../stores/patients-store';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { Patient } from '../../patients/models/patient';
import { UserSettingStore } from '../../../commons/stores/user-setting-store';
import { UserSetting } from '../../../commons/models/user-setting';


@Component({
    selector: 'patients-shell',
    templateUrl: './patients-shell.html',
    styleUrls: ['../../../accordion.scss']
})

export class PatientsShellComponent implements OnInit {
    patientId: number;
    patientName: string;
    patient: Patient;
    userSetting: UserSetting;
    preferredUIViewId: number;
    currAccordion;
    // routeData: [{
    //     header: 'View All';
    //     link: 'viewall';
    // },
    //     {
    //         header: 'Basic';
    //         link: 'basic';
    //     },
    //     {
    //         header: 'Demographics';
    //         link: 'demographics';
    //     },
    //     {
    //         header: 'Documents';
    //         link: 'documents';
    //     }]
    constructor(
        public _router: Router,
        private _patientStore: PatientsStore,
        private _sessionStore: SessionStore,
        private _progressBarService: ProgressBarService,
        public _route: ActivatedRoute,
        private _userSettingStore: UserSettingStore
    ) {
        let href = window.location.href;
        this.currAccordion = href.substr(href.lastIndexOf('/') + 1);

        this._route.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
            this._progressBarService.show();
            this._patientStore.fetchPatientById(this.patientId)
                .subscribe(
                (patient: Patient) => {
                    this.patient = patient;
                    this.patientName = patient.user.firstName + ' ' + patient.user.lastName;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            //this._router.navigate(['/patient-manager/patients']);
            this._router.navigate(['/dashboard']);
        });

    }

    ngOnInit() {
        this._userSettingStore.getUserSettingByUserId(this._sessionStore.session.user.id, this._sessionStore.session.currentCompany.id)
            .subscribe((userSetting) => {
                this.userSetting = userSetting;
                this.preferredUIViewId = userSetting.preferredUIViewId;
            });
    }
    setContent(elem) {
        if(this.currAccordion == elem) {
            this.currAccordion = '';
        }
        // console.log(value)
        // this.currAccordion = this.currAccordion == value ? this.currAccordion = '' : this.currAccordion;
        // let value = e.target.value;
        // let href = window.location.href;
        // let currRoute = href.substr(href.lastIndexOf('/') + 1);
        // if (this.currAccordion == currRoute) {
        //     this.currAccordion = '';
        // }
    }
}
