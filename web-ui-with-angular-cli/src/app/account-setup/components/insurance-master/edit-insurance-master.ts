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
import { InsuranceMasterStore } from '../../stores/insurance-master-store';
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { InsuranceMaster } from '../../../patient-manager/patients/models/insurance-master';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../../commons/pipes/faxno-format-pipe';

@Component({
    selector: 'edit-insurance-master',
    templateUrl: './edit-insurance-master.html'
})


export class EditInsuranceMasterComponent implements OnInit {
    states: any[];
    Cities: any[];
    minDate: Date;
    maxDate: Date;
    insuranceMaster: InsuranceMaster;
    insuranceMasterId: number;
    Only1500Form = '0';
    paperAuthorization = '0';
    priorityBilling = '0';

    editInsuranceMasterForm: FormGroup;
    editInsuranceMasterFormControls;
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
        private _elRef: ElementRef
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/account-setup/insurance-masters']);
        });
        this._route.params.subscribe((routeParams: any) => {
            this.insuranceMasterId = parseInt(routeParams.id, 10);
            this._progressBarService.show();
            this._insuranceMasterStore.fetchInsuranceMasterById(this.insuranceMasterId)
                .subscribe(
                (insuranceMaster: InsuranceMaster) => {
                    this.insuranceMaster = insuranceMaster;
                    this.Only1500Form = insuranceMaster.Only1500Form ? insuranceMaster.Only1500Form.toString() : '0';
                    this.paperAuthorization = insuranceMaster.paperAuthorization ? insuranceMaster.paperAuthorization.toString() : '0';
                    this.priorityBilling = insuranceMaster.priorityBilling ? insuranceMaster.priorityBilling.toString() : '0';
                },
                (error) => {
                    this._router.navigate(['../../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
        this.editInsuranceMasterForm = this.fb.group({
            companyCode: ['', Validators.required],
            companyName: ['', Validators.required],
            address1: [''],
            address2: [''],
            state: [''],
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

        this.editInsuranceMasterFormControls = this.editInsuranceMasterForm.controls;
    }
    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
    }


    save() {
        this.isSaveProgress = true;
        let editInsuranceMasterFormValues = this.editInsuranceMasterForm.value;
        let result;
        let existingInsuranceMasterJS = this.insuranceMaster.toJS();
        let insuranceMaster = new InsuranceMaster(_.extend(existingInsuranceMasterJS, {
            companyCode: editInsuranceMasterFormValues.companyCode,
            companyName: editInsuranceMasterFormValues.companyName,
            Contact: new Contact(_.extend(existingInsuranceMasterJS.Contact, {
                cellPhone: editInsuranceMasterFormValues.cellPhone ? editInsuranceMasterFormValues.cellPhone.replace(/\-/g, '') : null,
                emailAddress: editInsuranceMasterFormValues.email,
                faxNo: editInsuranceMasterFormValues.faxNo ? editInsuranceMasterFormValues.faxNo.replace(/\-|\s/g, '') : null,
                homePhone: editInsuranceMasterFormValues.homePhone,
                workPhone: editInsuranceMasterFormValues.workPhone,
                officeExtension: editInsuranceMasterFormValues.officeExtension,
                alternateEmail: editInsuranceMasterFormValues.alternateEmail,
                preferredCommunication: editInsuranceMasterFormValues.preferredCommunication,
                updateByUserId: this._sessionStore.session.account.user.id
            })),
            Address: new Address(_.extend(existingInsuranceMasterJS.Address, {
                address1: editInsuranceMasterFormValues.address1,
                address2: editInsuranceMasterFormValues.address2,
                city: editInsuranceMasterFormValues.city,
                country: editInsuranceMasterFormValues.country,
                state: editInsuranceMasterFormValues.state,
                zipCode: editInsuranceMasterFormValues.zipCode,
                updateByUserId: this._sessionStore.session.account.user.id
            })),
            Only1500Form: parseInt(editInsuranceMasterFormValues.Only1500Form),
            paperAuthorization: parseInt(editInsuranceMasterFormValues.paperAuthorization),
            priorityBilling: parseInt(editInsuranceMasterFormValues.priorityBilling),
            zeusID: editInsuranceMasterFormValues.zeusId,
            createdByCompanyId: this._sessionStore.session.currentCompany.id
        }));
        this._progressBarService.show();
        result = this._insuranceMasterStore.updateInsuranceMaster(insuranceMaster);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Insurance master added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../../'], { relativeTo: this._route });
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
