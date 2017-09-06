import { Patient } from '../models/patient';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { PatientsStore } from '../stores/patients-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../../commons/models/notification';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { User } from '../../../commons/models/user';
import * as _ from 'underscore';
import { Case } from '../../cases/models/case';
import { CasesStore } from '../../cases/stores/case-store';
import { Observable } from 'rxjs/Rx';
import { PatientDocument } from '../models/patient-document';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PatientsService } from '../services/patients-service';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'basic',
    templateUrl: './patient-basic.html'
})

export class PatientBasicComponent implements OnInit {
    isEighteenOrAbove: boolean = true;
    languagePreference: string;
    selectedSocialMedia: any[] = [];
    martialStatus: number;
    caseDetail: Case[];
    referredToMe: boolean = false;
    patientId: number;
    patientInfo: Patient;
    dateOfBirth: Date;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    basicform: FormGroup;
    basicformControls;
    isSavePatientProgress = false;
    imageLink: SafeResourceUrl;
    url;
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    uploadedFiles: any[] = [];
    imagePhotoIDLink: SafeResourceUrl;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _patientsStore: PatientsStore,
        private _casesStore: CasesStore,
        private _sanitizer: DomSanitizer,
        private _patientsService: PatientsService

    ) {
        this._route.parent.params.subscribe((params: any) => {
            this.patientId = parseInt(params.patientId, 10);
            this._progressBarService.show();
            let caseResult = this._casesStore.getOpenCaseForPatient(this.patientId);
            let result = this._patientsStore.fetchPatientById(this.patientId);
            Observable.forkJoin([caseResult, result])
                .subscribe(
                (results) => {
                    this.caseDetail = results[0];
                    if (this.caseDetail.length > 0) {
                        this.caseDetail[0].referral.forEach(element => {
                            if (element.referredToCompanyId == _sessionStore.session.currentCompany.id) {
                                this.referredToMe = true;
                            } else {
                                this.referredToMe = false;
                            }
                        })
                    } else {
                        this.referredToMe = false;
                    }
                    this.patientInfo = results[1];
                    _.forEach(this.patientInfo.patientDocuments, (currentPatientDocument: PatientDocument) => {
                        if (currentPatientDocument.document.documentType == 'profile') {
                            this.imageLink = this._sanitizer.bypassSecurityTrustResourceUrl(this._patientsService.getProfilePhotoDownloadUrl(currentPatientDocument.document.originalResponse.midasDocumentId));
                        }
                        if (currentPatientDocument.document.documentType == 'dl') {
                            this.imagePhotoIDLink = this._sanitizer.bypassSecurityTrustResourceUrl(this._patientsService.getProfilePhotoDownloadUrl(currentPatientDocument.document.originalResponse.midasDocumentId));
                        }
                    })
                    this.dateOfBirth = this.patientInfo.user.dateOfBirth
                        ? this.patientInfo.user.dateOfBirth.toDate()
                        : null;
                    if (this.dateOfBirth) {
                        this.calculateAge();
                    }

                    this.martialStatus = this.patientInfo.maritalStatusId;
                    if (this.patientInfo.patientLanguagePreferenceMappings.length > 0){
                     this.languagePreference = this.patientInfo.patientLanguagePreferenceMappings[0].languagePreferenceId;
                    }
                    if (this.patientInfo.patientSocialMediaMappings.length > 0) {
                        this.selectedSocialMedia = _.map(this.patientInfo.patientSocialMediaMappings, (currentSocialMedia: any) => {
                            return currentSocialMedia.socialMediaId.toString();
                        })
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
        this.basicform = this.fb.group({
            dob: [''],
            firstname: ['', Validators.required],
            middlename: [''],
            lastname: ['', Validators.required],
            gender: ['', Validators.required],
            maritalStatusId: ['', Validators.required],
            parentName: [''],
            languagePreference: [''],
            otherLanguage: [''],
            spouseName: [''],
            socialMedia: [''],

        });

        this.basicformControls = this.basicform.controls;
    }

    ngOnInit() {
        this.url = `${this._url}/documentmanager/uploadtoblob`;
    }

    calculateAge() {
        let now = moment();
        let age = now.diff(this.dateOfBirth, 'years');
        if (age < 18) {
            this.isEighteenOrAbove = false;
        } else {
            this.isEighteenOrAbove = true;
        }

    }

    onBeforeSendEvent(event) {
        event.xhr.setRequestHeader("inputjson", '{"ObjectType":"patient","DocumentType":"profile", "CompanyId": "' + this._sessionStore.session.currentCompany.id + '","ObjectId":"' + this.patientId + '"}');
        // event.xhr.setRequestHeader("Authorization", this._sessionStore.session.accessToken);
    }

    onFilesUploadComplete(event) {
        var response = JSON.parse(event.xhr.responseText);
        let documentId = response[0].documentId;
        console.log(documentId)
        this.imageLink = this._sanitizer.bypassSecurityTrustResourceUrl(this._patientsService.getProfilePhotoDownloadUrl(documentId));
    }
    onFilesUploadError(event) {
        let even = event;
    }

    savePatient() {
        let patientSocialMediaMappings: any[] = [];
        _.forEach(this.selectedSocialMedia, (currentSelectedSocialMedia: any) => {
            patientSocialMediaMappings.push({
                socialMediaId: parseInt(currentSelectedSocialMedia)
            })
        })
        let patientLanguagePreferenceMappings: any[] = [];
        patientLanguagePreferenceMappings.push({
            languagePreferenceId: (this.languagePreference)
        })
        this.isSavePatientProgress = true;
        let basicFormValues = this.basicform.value;
        let result;
        let existingPatientJS = this.patientInfo.toJS();
        let patient = new Patient(_.extend(existingPatientJS, {
            maritalStatusId: basicFormValues.maritalStatusId,
            updateByUserId: this._sessionStore.session.account.user.id,
            patientLanguagePreferenceMappings: patientLanguagePreferenceMappings,
            languagePreferenceOther: parseInt(this.languagePreference) == 3 ? basicFormValues.otherLanguage : null,
            patientSocialMediaMappings: patientSocialMediaMappings,
            parentOrGuardianName: !this.isEighteenOrAbove ? basicFormValues.parentName : null,
            legallyMarried: null,
            spouseName: parseInt(basicFormValues.maritalStatusId) == 2 ? basicFormValues.spouseName : null,
            user: new User(_.extend(existingPatientJS.user, {
                dateOfBirth: basicFormValues.dob ? moment(basicFormValues.dob) : null,
                firstName: basicFormValues.firstname,
                middleName: basicFormValues.middlename,
                lastName: basicFormValues.lastname,
                updateByUserId: this._sessionStore.session.account.user.id,
                gender: basicFormValues.gender
            }))
        }));

        this._progressBarService.show();
        result = this._patientsStore.updatePatient(patient);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Patient updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/patient-manager/patients']);
            },
            (error) => {
                let errString = 'Unable to update patient.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSavePatientProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSavePatientProgress = false;
                this._progressBarService.hide();
            });
    }
    onBeforeSendEventPhotoID(event) {
        event.xhr.setRequestHeader("inputjson", '{"ObjectType":"patient","DocumentType":"dl", "CompanyId": "' + this._sessionStore.session.currentCompany.id + '","ObjectId":"' + this.patientId + '"}');
        // event.xhr.setRequestHeader("Authorization", this._sessionStore.session.accessToken);
    }
    onFilesUploadCompletePhotoID(event) {
        var response = JSON.parse(event.xhr.responseText);
        let documentId = response[0].documentId;
        console.log(documentId)
        this.imagePhotoIDLink = this._sanitizer.bypassSecurityTrustResourceUrl(this._patientsService.getProfilePhotoDownloadUrl(documentId));
    }
    onFilesUploadErrorPhotoID(event) {
        let even = event;
    }
}
