import { PendingReferral } from '../../referals/models/pending-referral';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import * as _ from 'underscore';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { Insurance } from '../../patients/models/insurance';
import { InsuranceMaster } from '../../patients/models/insurance-master';
import { InsuranceStore } from '../../patients/stores/insurance-store';
import { PatientsStore } from '../../patients/stores/patients-store';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../../commons/pipes/faxno-format-pipe';
import { Case } from '../../cases/models/case';
import { CasesStore } from '../../cases/stores/case-store';

@Component({
    selector: 'edit-insurance',
    templateUrl: './edit-insurance.html'
})


export class EditInsuranceComponent implements OnInit {
    caseDetail: Case[];
    referredToMe: boolean = false;
    insuranceMasters: InsuranceMaster[];
    insuranceMastersAdress: Address;
    insuranceMaster: InsuranceMaster;
    policyCellPhone: string;
    policyFaxNo: string;
    insuranceCellPhone: string;
    insuranceFaxNo: string;
    states: any[];
    policyCities: any[];
    insuranceCities: any[];
    selectedPolicyCity;
    selectedInsuranceCity;
    insurance: Insurance;
    policyAddress = new Address({});
    policyContact = new Contact({});
    insuranceAddress = new Address({});
    insuranceContact = new Contact({});
    caseId: number;
    isPolicyCitiesLoading = false;
    isInsuranceCitiesLoading = false;
    uploadedFiles: any[] = [];

    insuranceform: FormGroup;
    insuranceformControls;
    isSaveProgress = false;
    insuranceStartDate: Date;
    insuranceEndDate: Date;
    balanceInsuredAmount: string;
    caseStatusId: number;
    insuranceMasterId: number;

    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _insuranceStore: InsuranceStore,
        private _patientsStore: PatientsStore,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _faxNoFormatPipe: FaxNoFormatPipe,
        private _elRef: ElementRef,
        private _casesStore: CasesStore
    ) {
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId);
            this._progressBarService.show();
            let result = this._casesStore.fetchCaseById(this.caseId);
            result.subscribe(
                (caseDetail: Case) => {
                    this.caseStatusId = caseDetail.caseStatusId;
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
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
        this._route.params.subscribe((routeParams: any) => {
            let insuranceId: number = parseInt(routeParams.id);
            this._progressBarService.show();
            let result = this._insuranceStore.fetchInsuranceById(insuranceId);
            result.subscribe(
                (insurance: any) => {
                    this.insurance = insurance.toJS();
                    this.insuranceMasterId = this.insurance.insuranceMasterId;
                    this.loadInsuranceMasterAddress(this.insurance.insuranceMasterId);
                    this.policyCellPhone = this._phoneFormatPipe.transform(this.insurance.policyContact.cellPhone);
                    this.policyFaxNo = this._faxNoFormatPipe.transform(this.insurance.policyContact.faxNo);
                    this.insuranceCellPhone = this._phoneFormatPipe.transform(this.insurance.insuranceContact.cellPhone);
                    this.insuranceFaxNo = this._faxNoFormatPipe.transform(this.insurance.insuranceContact.faxNo);
                    this.insuranceStartDate = this.insurance.insuranceStartDate
                        ? this.insurance.insuranceStartDate.toDate()
                        : null;
                    this.insuranceEndDate = this.insurance.insuranceEndDate
                        ? this.insurance.insuranceEndDate.toDate()
                        : null;
                    this.balanceInsuredAmount = this.insurance.balanceInsuredAmount;
                },
                (error) => {
                    this._router.navigate(['../../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });

        this.insuranceform = this.fb.group({
            policyNo: ['', Validators.required],
            policyOwner: ['', Validators.required],
            policyHoldersName: ['', Validators.required],
            insuranceStartDate: [''],
            insuranceEndDate: [''],
            balanceInsuredAmount: [''],
            insuranceCompanyCode: [''],
            insuranceType: ['', Validators.required],
            insuranceMasterId: ['', Validators.required],
            contactPerson: ['', Validators.required],
            policyAddress: ['', Validators.required],
            policyAddress2: [''],
            policyState: [''],
            policyCity: [''],
            policyZipCode: [''],
            policyCountry: [''],
            policyEmail: ['', [Validators.required, AppValidators.emailValidator]],
            policyCellPhone: ['', [Validators.required]],
            policyHomePhone: ['', [AppValidators.numberValidator, Validators.maxLength(10)]],
            policyWorkPhone: ['', [AppValidators.numberValidator, Validators.maxLength(10)]],
            policyFaxNo: [''],
            policyOfficeExtension: ['', [AppValidators.numberValidator, Validators.maxLength(5)]],
            policyAlternateEmail: ['', [AppValidators.emailValidator]],
            policyPreferredCommunication: [''],
            address: [],
            address2: [],
            state: [],
            city: [],
            zipcode: [],
            country: [],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            cellPhone: ['', [Validators.required]],
            homePhone: ['', [AppValidators.numberValidator, Validators.maxLength(10)]],
            workPhone: ['', [AppValidators.numberValidator, Validators.maxLength(10)]],
            faxNo: [''],
            alternateEmail: ['', [AppValidators.emailValidator]],
            officeExtension: ['', [AppValidators.numberValidator, Validators.maxLength(5)]],
            preferredCommunication: ['']
        });

        this.insuranceformControls = this.insuranceform.controls;
    }
    ngOnInit() {
        this._statesStore.getStates()
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

        this._insuranceStore.getInsurancesMasterByCompanyId()
            .subscribe((insuranceMasters: InsuranceMaster[]) => {
                let defaultLabel: any[] = [{
                    label: '-Select Insurance Company-',
                    value: '0'
                }]
                let insuranceMaster = _.map(insuranceMasters, (currentInsuranceMaster: InsuranceMaster) => {
                    return {
                        label: `${currentInsuranceMaster.companyName}`,
                        value: currentInsuranceMaster.id
                    };
                })
                this.insuranceMasters = _.union(defaultLabel, insuranceMaster);
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    selectInsurance(event) {
        // this.insuranceMasterId = parseInt(event.value);
        let currentInsurance: number = parseInt(event.value);
        if (currentInsurance !== 0) {
            this.loadInsuranceMasterAddress(currentInsurance);
        } else {
            this.insuranceMastersAdress = null
        }
    }
    onUpload(event) {

        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    loadInsuranceMasterAddress(currentInsurance) {
        this._insuranceStore.getInsuranceMasterById(currentInsurance)
            .subscribe(
            (insuranceMaster) => {
                this.insuranceMaster = insuranceMaster;
                this.insuranceMastersAdress = insuranceMaster.Address
            });
    }
    save() {
        this.isSaveProgress = true;
        let insuranceformValues = this.insuranceform.value;
        let result;
        let insurance = new Insurance({
            id: this.insurance.id,
            caseId: this.caseId,
            policyHoldersName: insuranceformValues.policyHoldersName,
            policyOwnerId: insuranceformValues.policyOwner,
            policyNo: insuranceformValues.policyNo,
            insuranceStartDate: insuranceformValues.insuranceStartDate ? moment(insuranceformValues.insuranceStartDate) : null,
            insuranceEndDate: insuranceformValues.insuranceEndDate ? moment(insuranceformValues.insuranceEndDate) : null,
            balanceInsuredAmount: insuranceformValues.balanceInsuredAmount,
            insuranceCompanyCode: insuranceformValues.insuranceCompanyCode,
            contactPerson: insuranceformValues.contactPerson,
            insuranceType: insuranceformValues.insuranceType,
            insuranceMasterId: parseInt(insuranceformValues.insuranceMasterId),
            policyContact: new Contact({
                cellPhone: insuranceformValues.policyCellPhone ? insuranceformValues.policyCellPhone.replace(/\-/g, '') : null,
                emailAddress: insuranceformValues.policyEmail,
                faxNo: insuranceformValues.policyFaxNo ? insuranceformValues.policyFaxNo.replace(/\-|\s/g, '') : null,
                homePhone: insuranceformValues.policyHomePhone,
                workPhone: insuranceformValues.policyWorkPhone,
                officeExtension: insuranceformValues.policyOfficeExtension,
                alternateEmail: insuranceformValues.policyAlternateEmail,
                preferredCommunication: insuranceformValues.policyPreferredCommunication,

            }),
            policyAddress: new Address({
                address1: insuranceformValues.policyAddress,
                address2: insuranceformValues.policyAddress2,
                city: insuranceformValues.policyCity,
                country: insuranceformValues.policyCountry,
                state: insuranceformValues.policyState,
                zipCode: insuranceformValues.policyZipCode
            }),
            insuranceContact: new Contact({
                cellPhone: insuranceformValues.cellPhone ? insuranceformValues.cellPhone.replace(/\-/g, '') : null,
                emailAddress: insuranceformValues.email,
                faxNo: insuranceformValues.faxNo ? insuranceformValues.faxNo.replace(/\-|\s/g, '') : null,
                homePhone: insuranceformValues.homePhone,
                workPhone: insuranceformValues.workPhone,
                officeExtension: insuranceformValues.officeExtension,
                alternateEmail: insuranceformValues.alternateEmail,
                preferredCommunication: insuranceformValues.preferredCommunication,
            }),
            insuranceAddress: new Address({
            })
        });
        this._progressBarService.show();
        result = this._insuranceStore.updateInsurance(insurance);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Insurance updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to update insurance.';
                let notification = new Notification({
                    'messages': ErrorMessageFormatter.getErrorMessages(error, errString),
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this.isSaveProgress = false;
                this._notificationsStore.addNotification(notification);
                this._notificationsService.error('Oh No!', ErrorMessageFormatter.getErrorMessages(error, errString));
                this._progressBarService.hide();
            },
            () => {
                this.isSaveProgress = false;
                this._progressBarService.hide();
            });
    }
}
