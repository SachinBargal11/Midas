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
import { Contact } from '../../../commons/models/contact';
import { Address } from '../../../commons/models/address';
import { Adjuster } from '../../models/adjuster';
import { AdjusterMasterStore } from '../../stores/adjuster-store';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../../commons/pipes/faxno-format-pipe';
import { InsuranceStore } from '../../../patient-manager/patients/stores/insurance-store';
import * as _ from 'underscore';
import { InsuranceMaster } from '../../../patient-manager/patients/models/insurance-master';

@Component({
    selector: 'edit-adjuster',
    templateUrl: './edit-adjuster.html'
})


export class EditAdjusterComponent implements OnInit {
    cellPhone: string;
    faxNo: string;
    states: any[];
    insuranceMaster: any[];
    adjuster: Adjuster;
    adjusterCities: any[];
    patientId: number;
    selectedCity;
    isadjusterCitiesLoading = false;
    insuranceMasters: InsuranceMaster[];
    adjusterform: FormGroup;
    adjusterformControls;
    isSaveProgress = false;
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
        private _adjusterMasterStore: AdjusterMasterStore,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _faxNoFormatPipe: FaxNoFormatPipe,
        private _insuranceStore: InsuranceStore,

        // private _patientsStore: PatientsStore,
        private _elRef: ElementRef
    ) {

        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this._router.navigate(['/account-setup/adjuster']);
        });

        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.patientId = parseInt(routeParams.patientId);
        });
        this._route.params.subscribe((routeParams: any) => {
            let adjusterId: number = parseInt(routeParams.id);
            this._progressBarService.show();
            let result = this._adjusterMasterStore.fetchAdjusterById(adjusterId);
            result.subscribe(
                (adjuster: any) => {
                    this.adjuster = adjuster.toJS();
                    this.insuranceMasterId = this.insuranceMasterId;
                    this.cellPhone = this._phoneFormatPipe.transform(this.adjuster.adjusterContact.cellPhone);
                    this.faxNo = this._faxNoFormatPipe.transform(this.adjuster.adjusterContact.faxNo);
                    this.selectedCity = adjuster.adjusterAddress.city;
                    this.loadCities(adjuster.adjusterAddress.state);
                },
                (error) => {
                    this._router.navigate(['../'], { relativeTo: this._route });
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
        this.adjusterform = this.fb.group({
            firstname: ['', Validators.required],
            middlename: [''],
            lastname: ['', Validators.required],
            adjusterInsuranceMaster: ['', Validators.required],
            adjusterAddress: ['', Validators.required],
            adjusterAddress2: [''],
            adjusterState: [''],
            adjusterCity: [''],
            adjusterZipcode: [''],
            adjusterCountry: [''],
            adjusterEmail: ['', [Validators.required, AppValidators.emailValidator]],
            adjusterCellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            adjusterHomePhone: [''],
            adjusterWorkPhone: [''],
            adjusterFaxNo: [''],
            adjusteralternateEmail: ['', [AppValidators.emailValidator]],
            adjusterofficeExtension: [''],
            adjusterpreferredCommunication: ['']
        });

        this.adjusterformControls = this.adjusterform.controls;
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

        this._insuranceStore.getInsurancesMasterByCompanyId()
            .subscribe((insuranceMasters: InsuranceMaster[]) => {
                let defaultLabel: any[] = [{
                    label: '-Select Insurance Company-',
                    value: ''
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

    selectAdjusterState(event) {
        let currentState = event.target.value;
        if (currentState === this.adjuster.adjusterAddress.state) {
            this.loadCities(currentState);
            this.selectedCity = this.adjuster.adjusterAddress.city;
        } else {
            // this.loadCities(currentState);
            this.selectedCity = '';
        }
    }

    loadCities(stateName) {
        this.isadjusterCitiesLoading = true;
        if (stateName !== '') {
            this._statesStore.getCitiesByStates(stateName)
                .subscribe((cities) => { this.adjusterCities = cities; },
                null,
                () => { this.isadjusterCitiesLoading = false; });
        } else {
            this.adjusterCities = [];
            this.isadjusterCitiesLoading = false;
        }
    }


    save() {
        this.isSaveProgress = true;
        let adjusterformValues = this.adjusterform.value;
        let result;
        let adjuster = new Adjuster({
            id: this.adjuster.id,
            companyId: this._sessionStore.session.currentCompany.id,
            firstName: adjusterformValues.firstname,
            middleName: adjusterformValues.middlename,
            lastName: adjusterformValues.lastname,
            insuranceMasterId: adjusterformValues.adjusterInsuranceMaster,
            adjusterContact: new Contact({
                cellPhone: adjusterformValues.adjusterCellPhone ? adjusterformValues.adjusterCellPhone.replace(/\-/g, '') : null,
                emailAddress: adjusterformValues.adjusterEmail,
                faxNo: adjusterformValues.adjusterFaxNo ? adjusterformValues.adjusterFaxNo.replace(/\-|\s/g, '') : null,
                homePhone: adjusterformValues.adjusterHomePhone,
                workPhone: adjusterformValues.adjusterWorkPhone,
                officeExtension: adjusterformValues.adjusterofficeExtension,
                alternateEmail: adjusterformValues.adjusteralternateEmail,
                preferredCommunication: adjusterformValues.adjusterpreferredCommunication,

            }),
            adjusterAddress: new Address({
                address1: adjusterformValues.adjusterAddress,
                address2: adjusterformValues.adjusterAddress2,
                city: adjusterformValues.adjusterCity,
                country: adjusterformValues.adjusterCountry,
                state: adjusterformValues.adjusterState,
                zipCode: adjusterformValues.adjusterZipcode
            })

        });
        this._progressBarService.show();
        result = this._adjusterMasterStore.updateAdjuster(adjuster);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Adjuster updated successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                // this._router.navigate(['/patient-manager/patients/' + this.patientId + '/insurances']);
                this._router.navigate(['../../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to update adjuster.';
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
