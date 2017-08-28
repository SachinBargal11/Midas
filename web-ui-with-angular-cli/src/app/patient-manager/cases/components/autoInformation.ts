import { Component, OnInit, ElementRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { Accident } from '../models/accident';
import { ErrorMessageFormatter } from '../../../commons/utils/ErrorMessageFormatter';
import { NotificationsStore } from '../../../commons/stores/notifications-store';
import { AppValidators } from '../../../commons/utils/AppValidators';
import { StatesStore } from '../../../commons/stores/states-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { NotificationsService } from 'angular2-notifications';
import { Notification } from '../../../commons/models/notification';
import * as moment from 'moment';
import { Address } from '../../../commons/models/address';
import * as _ from 'underscore';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../models/case';
import { environment } from '../../../../environments/environment';
import { AutoInformation } from '../models/autoInformation';
import { AutoInformationStore } from '../stores/autoInformation-store';
@Component({
    selector: 'autoInformation',
    templateUrl: './autoInformation.html'
})

export class AutoInformationInfoComponent implements OnInit {
    caseId: number;
    states: any[];
    cities: any[];
    autoInfoform: FormGroup;
    autoInfoformControls;
    isSaveProgress = false;
    relativesVehicle = '';
    helpinDamageResolved = '';
    vehicleDrivable = '';
    titletoVehicle = '';
    autoInformation: AutoInformation;
    title: string;
    constructor(
        private fb: FormBuilder,
        private _router: Router,
        public _route: ActivatedRoute,
        private _statesStore: StatesStore,
        private _notificationsStore: NotificationsStore,
        private _progressBarService: ProgressBarService,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef,
        private _notificationsService: NotificationsService,
        private _casesStore: CasesStore,
        private _autoInformationStore: AutoInformationStore,
    ) {
        this._route.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId, 10);
            this._progressBarService.show();

            let result = this._autoInformationStore.getByCaseId(this.caseId);
            result.subscribe(
                (autoInformation: AutoInformation) => {
                    this.autoInformation = autoInformation;
                    // this.hourOrYearly = this.employer.hourOrYearly;
                    // this.lossOfEarnings = this.employer.lossOfEarnings;
                    // this.accidentAtEmployment = this.employer.accidentAtEmployment;
                    // this.currentEmployer = this.employer;

                    this.title = this.autoInformation.id ? 'Edit Auto Information' : 'Add Auto Information';

                },
                (error) => {
                    this._router.navigate(['../../']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });
        });
        this.autoInfoform = this.fb.group({
            txtPlate: ['', Validators.required],
            txtModelYear: ['', Validators.required],
            state: [''],
            insuranceCompany: [''],
            txtPolicy: [''],
            txtClaim: [''],
            txtVehicalLocated: [''],
            txtVehicalDesc: [''],
            relativesVehicle: [''],
            relModelYear: [''],
            relOwnerName: [''],
            relInsuranceCompany: [''],
            relPolicy: [''],
            helpinDamageResolved: [''],
            vehicleDrivable: [''],
            txtEstimatedDamage: [''],
            titletoVehicle: [''],
            txtDefendantPlate: [''],
            defendantState: [''],
            txtDefendantModelYear: [''],
            txtDefendantOwnerName: [''],
            txtDefendantOperatorName: [''],
            defendantInsuranceCompany: [''],
            txtDefendantPolicy: [''],
            txtDefendantClaim: [''],
            txtModel: [''],
            relModel: [''],
            txtDefendantModel: [''],
            txtOwnerName: [''],
            txtOperatorName: [''],

        });
        this.autoInfoformControls = this.autoInfoform.controls;

    }
    ngOnInit() {
        this._statesStore.getStates()
            .subscribe(states => this.states = states);
    }

    save() {
        this.isSaveProgress = true;
        let formValues = this.autoInfoform.value;
        let result;
        let addResult;
        let autoInfoform = new AutoInformation({
            id: this.autoInformation.id ? this.autoInformation.id : 0,
            caseId: this.caseId,
            vehicleNumberPlate: formValues.txtPlate,
            state: formValues.state,
            vehicleMakeModel: formValues.txtModel,
            vehicleMakeYear: formValues.txtModelYear,
            vehicleOwnerName: formValues.txtOwnerName,
            vehicleOperatorName: formValues.txtOperatorName,
            vehicleInsuranceCompanyName: formValues.insuranceCompany,
            vehiclePolicyNumber: formValues.txtPlate,
            vehicleClaimNumber: formValues.txtClaim,
            vehicleLocation: formValues.txtVehicalLocated,
            vehicleDamageDiscription: formValues.txtVehicalDesc,
            relativeVehicle: false,
            relativeVehicleMakeModel: formValues.relModel,
            relativeVehicleMakeYear: formValues.relModelYear,
            relativeVehicleOwnerName: formValues.relOwnerName,
            relativeVehicleInsuranceCompanyName: formValues.relInsuranceCompany,
            relativeVehiclePolicyNumber: formValues.relPolicy,
            vehicleResolveDamage: formValues.helpinDamageResolved,
            vehicleDriveable: formValues.vehicleDrivable,
            vehicleEstimatedDamage: formValues.txtEstimatedDamage,
            relativeVehicleLocation: '',
            vehicleClientHaveTitle: formValues.titletoVehicle,
            relativeVehicleOwner: formValues.relOwnerName,

        });
        this._progressBarService.show();
        result = this._autoInformationStore.saveAutoInformation(autoInfoform);
        //  let addSchool = this._autoInformationStore.addSchool(school);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Auto Information Added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/patient-manager/cases']);
            },
            (error) => {
                let errString = 'Unable to add Auto Information.';
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