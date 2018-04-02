import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { PatientsStore } from '../stores/patients-store';
import { Patient } from '../models/patient';
import { User } from '../../../commons/models/user';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { UserType } from '../../../commons/models/enums/user-type';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { SessionStore } from '../../../commons/stores/session-store';
import { StatesStore } from '../../../commons/stores/states-store';
import * as _ from 'underscore';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'add-patient',
    templateUrl: './add-patient.html'
})

export class AddPatientComponent implements OnInit {
    dob: moment.Moment;
    isEighteenOrAbove: boolean = true;
    languagePreference = '';
    martialStatus = '';
    selectedSocialMedia: any[] = [];
    states: any[];
    cities: any[];
    selectedCity = 0;
    minDate: Date;
    maxDate: Date;
    patientform: FormGroup;
    patientformControls;
    isCitiesLoading = false;
    isSavePatientProgress = false;
    uploadedFiles: any[] = [];
    files: any[] = [];
    method: string = 'POST';
    private _url: string = `${environment.SERVICE_BASE_URL}`;
    url;
    uploadedFilesLicence: any[] = [];
    fileLicence: any[] = [];
    id: number;

    constructor(
        private _statesStore: StatesStore,
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _patientsStore: PatientsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _elRef: ElementRef
    ) {
        this.patientform = this.fb.group({
            userInfo: this.fb.group({
                ssn: [''],
                maritalStatusId: ['', Validators.required],
                dateOfFirstTreatment: [''],
                dob: [''],
                firstname: ['', Validators.required],
                middlename: [''],
                lastname: ['', Validators.required],
                gender: ['', Validators.required],
                parentName: [''],
                languagePreference: [''],
                otherLanguage: [''],
                spouseName: [''],
                socialMedia: [''],
            }),
            contact: this.fb.group({
                email: ['', [Validators.required, AppValidators.emailValidator]],
                cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
                homePhone: ['', [AppValidators.numberValidator, Validators.maxLength(10)]],
                workPhone: ['', [AppValidators.numberValidator, Validators.maxLength(10)]],
                faxNo: [''],
                alternateEmail: ['', AppValidators.emailValidator],
                officeExtension: ['', [AppValidators.numberValidator, Validators.maxLength(5)]],
                preferredCommunication: [''],
                emergencyContactPerson: [''],
                emergencyContactCellPhone: ['']
            }),
            address: this.fb.group({
                address1: [''],
                address2: [''],
                city: [''],
                zipCode: [''],
                state: [''],
                country: ['']
            })
        });
        this.patientformControls = this.patientform.controls;

    }

    ngOnInit() {
        this.url = `${this._url}/documentmanager/uploadtoblob`;
        let today = new Date();
        let currentDate = today.getDate();
        this.maxDate = new Date();
        this.maxDate.setDate(currentDate);
        this._statesStore.getStates()
            // .subscribe(states => this.states = states);
            .subscribe(states =>
            // this.states = states);
            {
                let defaultLabel: any[] = [{
                    label: '-Select State-',
                    value: ''
                }]
                let allStates = _.map(states, (currentState: any) => {
                    return {
                        label: `${currentState.statetext}`,
                        value: currentState.statetext
                    };
                })
                this.states = _.union(defaultLabel, allStates);
            },
            (error) => {
            },
            () => {

            });
    }

    calculateAge() {
        let now = moment();
        // let age =  moment(this.dob, "YYYYMMDD").fromNow();
        let age = now.diff(this.dob, 'years');
        if (age < 18) {
            this.isEighteenOrAbove = false;
        } else {
            this.isEighteenOrAbove = true;
        }

    }



    savePatient() {
        let patientSocialMediaMappings: any[] = [];
        if (this.selectedSocialMedia.length > 0) {
            _.forEach(this.selectedSocialMedia, (currentSelectedSocialMedia: any) => {
                patientSocialMediaMappings.push({
                    socialMediaId: parseInt(currentSelectedSocialMedia)
                })
            })
        } else {
            patientSocialMediaMappings;
        }

        let patientLanguagePreferenceMappings: any[] = [];
        if (this.languagePreference != '') {
            patientLanguagePreferenceMappings.push({
                languagePreferenceId: parseInt(this.languagePreference)
            })
        } else {
            patientLanguagePreferenceMappings;
        }

        this.isSavePatientProgress = true;
        let patientFormValues = this.patientform.value;
        let result;
        let patient = new Patient({
            ssn: patientFormValues.userInfo.ssn,
            // weight: patientFormValues.userInfo.weight,
            // height: patientFormValues.userInfo.height,
            dateOfFirstTreatment: patientFormValues.userInfo.dateOfFirstTreatment ? moment(patientFormValues.userInfo.dateOfFirstTreatment) : null,
            maritalStatusId: patientFormValues.userInfo.maritalStatusId,
            createByUserId: this._sessionStore.session.account.user.id,
            companyId: this._sessionStore.session.currentCompany.id,
            patientLanguagePreferenceMappings: patientLanguagePreferenceMappings,
            languagePreferenceOther: parseInt(this.languagePreference) == 3 ? patientFormValues.userInfo.otherLanguage : null,
            patientSocialMediaMappings: patientSocialMediaMappings,
            parentOrGuardianName: !this.isEighteenOrAbove ? patientFormValues.userInfo.parentName : null,
            emergencyContactName: patientFormValues.contact.emergencyContactPerson,
            emergencyContactPhone: patientFormValues.contact.emergencyContactCellPhone,
            legallyMarried: null,
            spouseName: parseInt(this.martialStatus) == 2 ? patientFormValues.userInfo.spouseName : null,
            user: new User({
                dateOfBirth: patientFormValues.userInfo.dob ? moment(patientFormValues.userInfo.dob) : null,
                firstName: patientFormValues.userInfo.firstname,
                middleName: patientFormValues.userInfo.middlename,
                lastName: patientFormValues.userInfo.lastname,
                userType: UserType.PATIENT,
                userName: patientFormValues.contact.email,
                createByUserId: this._sessionStore.session.account.user.id,
                gender: patientFormValues.userInfo.gender,
                contact: new Contact({
                    cellPhone: patientFormValues.contact.cellPhone ? patientFormValues.contact.cellPhone.replace(/\-/g, '') : null,
                    emailAddress: patientFormValues.contact.email,
                    faxNo: patientFormValues.contact.faxNo ? patientFormValues.contact.faxNo.replace(/\-|\s/g, '') : null,
                    homePhone: patientFormValues.contact.homePhone,
                    workPhone: patientFormValues.contact.workPhone,
                    officeExtension: patientFormValues.contact.officeExtension,
                    alternateEmail: patientFormValues.contact.alternateEmail,
                    preferredCommunication: patientFormValues.contact.preferredCommunication,
                    createByUserId: this._sessionStore.session.account.user.id
                }),
                address: new Address({
                    address1: patientFormValues.address.address1,
                    address2: patientFormValues.address.address2,
                    city: patientFormValues.address.city,
                    country: patientFormValues.address.country,
                    state: patientFormValues.address.state,
                    zipCode: patientFormValues.address.zipCode,
                    createByUserId: this._sessionStore.session.account.user.id
                })
            })
        });
        this._progressBarService.show();
        result = this._patientsStore.addPatient(patient);
        result.subscribe(
            (response) => {
                this.uploadProfileImage(response.id);
                this.uploadLicenceImage(response.id);
                let notification = new Notification({
                    'title': 'Patient added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this.id = response.id;
                this._router.navigate(['patient-manager/patients/' + this.id + '/basic']);
            },
            (error) => {
                let errString = 'Unable to add patient.';
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

    onUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        for (let file of event.fileLicence) {
            this.uploadedFilesLicence.push(file);
        }

        //this.msgs = [];
        //this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
    myUploader(event) {
        this.files = event.files;
    }
    uploadProfileImage(patientId: number) {
        let xhr = new XMLHttpRequest(),
            formData = new FormData();

        for (let i = 0; i < this.files.length; i++) {
            formData.append(this.files[i].name, this.files[i], this.files[i].name);
        }

        xhr.open(this.method, this.url, true);
        xhr.setRequestHeader("inputjson", '{"ObjectType":"patient","DocumentType":"profile", "CompanyId": "' + this._sessionStore.session.currentCompany.id + '","ObjectId":"' + patientId + '"}');
        xhr.setRequestHeader("Authorization", this._sessionStore.session.accessToken);
        xhr.withCredentials = false;
        xhr.send(formData);
    }

    licenceUploader(event) {
        this.fileLicence = event.files;
    }
    uploadLicenceImage(patientId: number) {
        let xhr = new XMLHttpRequest(),
            formData = new FormData();
        for (let i = 0; i < this.fileLicence.length; i++) {
            formData.append(this.fileLicence[i].name, this.fileLicence[i], this.fileLicence[i].name);
        }
        xhr.open(this.method, this.url, true);
        xhr.setRequestHeader("inputjson", '{"ObjectType":"patient","DocumentType":"dl", "CompanyId": "' + this._sessionStore.session.currentCompany.id + '","ObjectId":"' + patientId + '"}');
        xhr.setRequestHeader("Authorization", this._sessionStore.session.accessToken);
        xhr.withCredentials = false;
        xhr.send(formData);
    }
}