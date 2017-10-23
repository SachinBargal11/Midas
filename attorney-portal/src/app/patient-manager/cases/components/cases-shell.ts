import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientsStore } from '../../patients/stores/patients-store';
import { CasesStore } from '../../cases/stores/case-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { Patient } from '../../patients/models/patient';
import { Case } from '../models/case';
import * as _ from 'underscore';
import { SessionStore } from '../../../commons/stores/session-store';
import { CaseCompanyMapping } from '../models/caseCompanyMapping';
import { UserSetting } from '../../../commons/models/user-setting';
import { UserSettingStore } from '../../../commons/stores/user-setting-store';

@Component({
    selector: 'cases-shell',
    templateUrl: './cases-shell.html',
    styleUrls: ['../../../accordion.scss']
})

export class CaseShellComponent implements OnInit {
    patientId: number;
    caseId: number;
    patientName: string;
    caseStatus: string;
    caseEditableLabel: boolean = false;
    caseType: string;
    patient: Patient;
    caseDetail: Case;
    userSetting: UserSetting;
    preferredUIViewId: number;

    currAccordion;
    currAccordion1;
    currAccordion2;
    currAccordion3;
    index: number;
    routerLink: string;

    constructor(
        public router: Router,
        private _patientStore: PatientsStore,
        private _casesStore: CasesStore,
        public _route: ActivatedRoute,
        private _progressBarService: ProgressBarService,
        private _router: Router,
        public sessionStore: SessionStore,
        private _userSettingStore: UserSettingStore
    ) {
        let href = window.location.href;
        this.currAccordion = href.substr(href.lastIndexOf('/') + 1);
        this._route.parent.params.subscribe((routeParams: any) => {
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

        this._route.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this._progressBarService.show();
            let result = this._casesStore.fetchCaseById(this.caseId);
            result.subscribe(
                (caseDetail: Case) => {
                    this.caseDetail = caseDetail;
                    this.caseStatus = caseDetail.caseStatusLabel;
                    this.caseType = caseDetail.caseTypeLabel;
                    if (this.caseDetail.caseStatusId != 2) {
                        //    _.forEach(this.caseDetail.caseCompanyMapping, (currentCaseCompanyMapping: CaseCompanyMapping) => {
                        //     if (currentCaseCompanyMapping.isOriginator == true && (currentCaseCompanyMapping.company.id === sessionStore.session.currentCompany.id)) {
                        //         this.caseEditableLabel = true;
                        //     }else{
                        //         this.caseEditableLabel = false;
                        //     }
                        // });
                        if (caseDetail.orignatorCompanyId == sessionStore.session.currentCompany.id) {
                            this.caseEditableLabel = true;
                        }
                        else {
                            this.caseEditableLabel = false;
                        }
                    } else {
                        this.caseEditableLabel = false
                    }
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

    }

    ngOnInit() {
        this._userSettingStore.getUserSettingByUserId(this.sessionStore.session.user.id, this.sessionStore.session.currentCompany.id)
            .subscribe((userSetting) => {
                this.userSetting = userSetting;
                this.preferredUIViewId = userSetting.preferredUIViewId;
            }
            )
    }

     onTabOpen(e) {
        this.index = e.index;
    }

    setContent() {
        // let value = e.target.value;
        this.currAccordion;
        // this.currAccordion1;
        // this.currAccordion2;
        // this.currAccordion3;
    }
}