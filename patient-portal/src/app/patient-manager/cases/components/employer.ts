
import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { Employer } from '../models/employer';
//import { Patient } from '../models/patient';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { EmployerStore } from '../stores/employer-store';
//import { PatientsStore } from '../stores/patients-store';
import * as _ from 'underscore';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../../commons/pipes/faxno-format-pipe';
import { Case } from '../../cases/models/case';
import { CasesStore } from '../../cases/stores/case-store';
import { School } from '../models/school';


@Component({
    selector: 'employer',
    templateUrl: './employer.html'
})

export class CaseEmployerComponent implements OnInit {
    cellPhone: string;
    title: string;
    faxNo: string;
    states: any[];
    cities: any[];
    caseId: number;
    employer: Employer;
    currentEmployer: Employer;
    isCurrentEmp: any;
    selectedCity = '';
    caseDetail: Case[];
    referredToMe: boolean = false;
    isCitiesLoading = false;
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false
    };
    employerform: FormGroup;
    employerformControls;
    isSaveProgress = false;
    isSaveEmployerProgress = false;
    patientId: number;
    salaryType = '';
    txtSalary = '';
    islossEarnings: boolean = false;
    txtDatesOutWork = '';
    txtHoursPerWeek = '';
    isAccidentAtEmployment: boolean = false;
    txtSchoolName = '';
    txtGrade = '';
    islossTimeofSchool: boolean = false;
    txtDateOutofSchool = '';
    hourOrYearly = false;
    lossOfEarnings = false;
    accidentAtEmployment = false;
    school: School;
    id = 0;
    lossOfTime = false;
    nameOfSchool = '';
    grade = '';
    datesOutOfSchool = '';


    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _employerStore: EmployerStore,
        //   private _patientsStore: PatientsStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef,
        private _casesStore: CasesStore,
        private _notificationsService: NotificationsService,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _faxNoFormatPipe: FaxNoFormatPipe

    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId, 10);
        });
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this._progressBarService.show();

            let result = this._employerStore.getCurrentEmployer(this.caseId);
            result.subscribe(
                (employer: Employer) => {
                    this.employer = employer;
                    this.hourOrYearly = this.employer.hourOrYearly;
                    this.lossOfEarnings = this.employer.lossOfEarnings;
                    this.accidentAtEmployment = this.employer.accidentAtEmployment;
                    this.currentEmployer = this.employer;
                    //this.isCurrentEmp = this.employer.id ? this.employer.isCurrentEmp : '1';
                    // this.title = this.currentEmployer.id ? 'Edit Employment/School' : 'Add Employment/School';
                    this.title = 'Employment/School Info';
                    // if (this.currentEmployer.id) {
                        this.cellPhone = this._phoneFormatPipe.transform(this.currentEmployer.contact.cellPhone);
                        this.faxNo = this._faxNoFormatPipe.transform(this.currentEmployer.contact.faxNo);

                    // } else {
                    //     this.currentEmployer = new Employer({
                    //         address: new Address({}),
                    //         contact: new Contact({})
                    //     });
                    // }

                },
                (error) => {
                    this._router.navigate(['../../']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });

            let schoolResult = this._employerStore.getSchoolInformation(this.caseId);
            schoolResult.subscribe(
                (school: School) => {
                    this.school = school;
                    this.id = this.school.id;
                    this.lossOfTime = this.school.lossOfTime;
                    this.datesOutOfSchool = this.school.datesOutOfSchool;
                    this.nameOfSchool = this.school.nameOfSchool;
                    this.grade = this.school.grade;

                },
                (error) => {
                    this._router.navigate(['../../']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });



        // let caseResult = this._casesStore.getOpenCaseForPatient(this.patientId);
        // caseResult.subscribe(
        //     (cases: Case[]) => {
        //         this.caseDetail = cases;
        //         if (this.caseDetail.length > 0) {
        //             let matchedCompany = null;
        //             matchedCompany = _.find(this.caseDetail[0].referral, (currentReferral: PendingReferral) => {
        //                 return currentReferral.toCompanyId == _sessionStore.session.currentCompany.id
        //             })
        //             if (matchedCompany) {
        //                 this.referredToMe = true;
        //             } else {
        //                 this.referredToMe = false;
        //             }
        //         } else {
        //             this.referredToMe = false;
        //         }

        //     },
        //     (error) => {
        //         this._router.navigate(['../'], { relativeTo: this._route });
        //         this._progressBarService.hide();
        //     },
        //     () => {
        //         this._progressBarService.hide();
        //     });
        this.employerform = this.fb.group({
            jobTitle: ['', Validators.required],
            employerName: ['', Validators.required],
            //  isCurrentEmployer: ['1', Validators.required],
            address: [''],
            address2: [''],
            state: [''],
            city: [''],
            zipcode: [''],
            country: [''],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            homePhone: [''],
            workPhone: [''],
            faxNo: [''],
            alternateEmail: ['', [AppValidators.emailValidator]],
            officeExtension: [''],
            preferredCommunication: [''],
            salaryType: [''],
            txtSalary: [''],
            islossEarnings: [''],
            isAccidentAtEmployment: [''],
            txtDatesOutWork: [''],
            txtHoursPerWeek: [''],
            txtSchoolName: [''],
            txtGrade: [''],
            islossTimeofSchool: [''],
            txtDateOutofSchool: [''],
        });

        this.employerformControls = this.employerform.controls;
    }

    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
    }

    save() {
        this.isSaveEmployerProgress = true;
        let employerformValues = this.employerform.value;
        let result;
        let addResult;
        let employer = new Employer({
            caseId: this.caseId,
            jobTitle: employerformValues.jobTitle,
            empName: employerformValues.employerName,
            // isCurrentEmp: parseInt(employerformValues.isCurrentEmployer),
            //isCurrentEmp: employerformValues.isCurrentEmployer == '1' ? true : false,
            contact: new Contact({
                cellPhone: employerformValues.cellPhone ? employerformValues.cellPhone.replace(/\-/g, '') : null,
                emailAddress: employerformValues.email,
                faxNo: employerformValues.faxNo ? employerformValues.faxNo.replace(/\-|\s/g, '') : '',
                homePhone: employerformValues.homePhone,
                workPhone: employerformValues.workPhone,
                officeExtension: employerformValues.officeExtension,
                alternateEmail: employerformValues.alternateEmail,
                preferredCommunication: employerformValues.preferredCommunication,

            }),
            address: new Address({
                address1: employerformValues.address,
                address2: employerformValues.address2,
                city: employerformValues.city,
                country: employerformValues.country,
                state: employerformValues.state,
                zipCode: employerformValues.zipcode

            }),
            salary: employerformValues.txtSalary,
            hourOrYearly: parseInt(employerformValues.salaryType),
            lossOfEarnings: parseInt(employerformValues.islossEarnings),
            datesOutOfWork: employerformValues.txtDatesOutWork,
            hoursPerWeek: employerformValues.txtHoursPerWeek,
            accidentAtEmployment: parseInt(employerformValues.isAccidentAtEmployment)
        });

        let school = new School({
            id: this.school.id,
            caseId: this.caseId,
            nameOfSchool: employerformValues.txtSchoolName,
            grade: employerformValues.txtGrade,
            lossOfTime: parseInt(employerformValues.islossTimeofSchool),
            datesOutOfSchool: employerformValues.txtDateOutofSchool
        });

        this._progressBarService.show();

        if (this.currentEmployer.id) {
            result = this._employerStore.updateEmployer(employer, this.currentEmployer.id);
            let addSchool = this._employerStore.addSchool(school);
            result.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Employer updated successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._router.navigate(['/patient-manager/patients']);
                },
                (error) => {
                    let errString = 'Unable to update employer.';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this.isSaveEmployerProgress = false;
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    this._progressBarService.hide();
                },
                () => {
                    this.isSaveEmployerProgress = false;
                    this._progressBarService.hide();
                });
        }
        else {
            addResult = this._employerStore.addEmployer(employer);
            let addSchool = this._employerStore.addSchool(school);

            addResult.subscribe(
                (response) => {
                    let notification = new Notification({
                        'title': 'Employer added successfully!',
                        'type': 'SUCCESS',
                        'createdAt': moment()
                    });
                    this._notificationsStore.addNotification(notification);
                    this._router.navigate(['/patient-manager/patients']);
                },
                (error) => {
                    let errString = 'Unable to add employer.';
                    let notification = new Notification({
                        'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                        'type': 'ERROR',
                        'createdAt': moment()
                    });
                    this.isSaveEmployerProgress = false;
                    this._notificationsStore.addNotification(notification);
                    this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                    this._progressBarService.hide();
                },
                () => {
                    this.isSaveEmployerProgress = false;
                    this._progressBarService.hide();
                });


        }
    }
}
