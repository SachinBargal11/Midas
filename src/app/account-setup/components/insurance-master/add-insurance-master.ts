import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { SessionStore } from '../../../commons/stores/session-store';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { InsuranceMasterTypeStore } from '../../../commons/stores/insurance-master-type-store';
import { InsuranceMasterStore } from '../../stores/insurance-master-store';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { InsuranceMaster } from '../../../patient-manager/patients/models/insurance-master';
import * as _ from 'underscore';

@Component({
    selector: 'add-insurance-master',
    templateUrl: './add-insurance-master.html'
})


export class AddInsuranceMasterComponent implements OnInit {
    states: any[];
    insuranceMasterTypes : any[];
    Cities: any[];
    minDate: Date;
    maxDate: Date;
    patientId: number;
    Only1500Form = '0';
    paperAuthorization = '0';
    priorityBilling = '0';

    addInsuranceMasterForm: FormGroup;
    addInsuranceMasterFormControls;
    isSaveProgress = false;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _notificationsService: NotificationsService,
        private _sessionStore: SessionStore,
        private _insuranceMasterStore: InsuranceMasterStore,
        private _elRef: ElementRef,
        private _insuranceMasterTypeStore: InsuranceMasterTypeStore
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/account-setup/insurance-masters']);
        });
        this.addInsuranceMasterForm = this.fb.group({
            companyCode: ['', Validators.required],
            companyName: ['', Validators.required],
            address1: [''],
            address2: [''],
            state: [''],
            insuranceMasterType: ['',Validators.required],
            city: [''],
            zipCode: [''],
            country: [''],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            homePhone: [''],
            workPhone: [''],
            faxNo: [''],
            alternateEmail: ['', [AppValidators.emailValidator]],
            officeExtension: [''],
            preferredCommunication: [''],
            Only1500Form: [''],
            paperAuthorization: [''],
            priorityBilling: [''],
            zeusId: ['']
        });

        this.addInsuranceMasterFormControls = this.addInsuranceMasterForm.controls;
    }
    ngOnInit() {
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

            // insurancemastertype

            this._insuranceMasterTypeStore.getInsuranceMasterType()
            .subscribe(insuranceMasterTypes =>
            {
                let defaultLabel: any[] = [{
                    label: '-Select Insurance Type-',
                    value: ''
                }]
                let allInsuranceMasterType = _.map(insuranceMasterTypes, (currentInsuranceMasterType: any) => {
                    return {
                        label: `${currentInsuranceMasterType.insuranceMasterTypeText}`,
                        value: currentInsuranceMasterType.id
                    };
                })
                this.insuranceMasterTypes = _.union(defaultLabel, allInsuranceMasterType);
            },
            (error) => {
            },
            () => {

            });
    }


    save() {
        this.isSaveProgress = true;
        let addInsuranceMasterFormValues = this.addInsuranceMasterForm.value;
        let result;
        let insuranceMaster = new InsuranceMaster({
            companyCode: addInsuranceMasterFormValues.companyCode,
            companyName: addInsuranceMasterFormValues.companyName,
            Contact: new Contact({
                cellPhone: addInsuranceMasterFormValues.cellPhone ? addInsuranceMasterFormValues.cellPhone.replace(/\-/g, '') : null,
                emailAddress: addInsuranceMasterFormValues.email,
                faxNo: addInsuranceMasterFormValues.faxNo ? addInsuranceMasterFormValues.faxNo.replace(/\-|\s/g, '') : null,
                homePhone: addInsuranceMasterFormValues.homePhone,
                workPhone: addInsuranceMasterFormValues.workPhone,
                officeExtension: addInsuranceMasterFormValues.officeExtension,
                alternateEmail: addInsuranceMasterFormValues.alternateEmail,
                preferredCommunication: addInsuranceMasterFormValues.preferredCommunication,
                createByUserId: this._sessionStore.session.account.user.id
            }),
            Address: new Address({
                address1: addInsuranceMasterFormValues.address1,
                address2: addInsuranceMasterFormValues.address2,
                city: addInsuranceMasterFormValues.city,
                country: addInsuranceMasterFormValues.country,
                state: addInsuranceMasterFormValues.state,
                zipCode: addInsuranceMasterFormValues.zipCode,
                createByUserId: this._sessionStore.session.account.user.id
            }),
            Only1500Form: parseInt(addInsuranceMasterFormValues.Only1500Form),
            paperAuthorization: parseInt(addInsuranceMasterFormValues.paperAuthorization),
            priorityBilling: parseInt(addInsuranceMasterFormValues.priorityBilling),
            zeusID: addInsuranceMasterFormValues.zeusId,
            createdByCompanyId: this._sessionStore.session.currentCompany.id,
            insuranceMasterTypeId: addInsuranceMasterFormValues.insuranceMasterType
        });
        this._progressBarService.show();
        result = this._insuranceMasterStore.addInsuranceMaster(insuranceMaster);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Insurance master added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add Insurance master.';
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
