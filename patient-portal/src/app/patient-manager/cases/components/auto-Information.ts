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
import { DefendantAutoInformation } from '../models/defendantAutoInformation';
@Component({
    selector: 'autoInformation',
    templateUrl: './auto-Information.html'
})

export class AutoInformationInfoComponent implements OnInit {
    caseId: number;
    states: any[];
    cities: any[];
    autoInfoform: FormGroup;
    autoInfoformControls;
    isSaveProgress = false;
    autoInformation: AutoInformation;
    title: string;
    isrelativesVehicle = '';
    ishelpinDamageResolved = '';
    isvehicleDrivable = '';
    istitletoVehicle = '';
    titletoVehicle: false;
    relativeVehicle: false;
    vehicleResolveDamage: false;
    vehicleDriveable: false;
    vehicleClientHaveTitle: false;
    defendantAutoInformation: DefendantAutoInformation;
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
                    debugger;
                    this.autoInformation = autoInformation;
                    //this.title = this.autoInformation.id ? 'Edit Auto Information' : 'Add Auto Information';
                    this.isrelativesVehicle = String(this.autoInformation.relativeVehicle) == 'true' ? 'Yes' : 'No';
                    this.ishelpinDamageResolved = String(this.autoInformation.vehicleResolveDamage) == 'true' ? 'Yes' : 'No';
                    this.isvehicleDrivable = String(this.autoInformation.vehicleDriveable) == 'true' ? 'Yes' : 'No';
                    this.istitletoVehicle = String(this.autoInformation.vehicleClientHaveTitle) == 'true' ? 'Yes' : 'No';
                },
                (error) => {
                    this._router.navigate(['../../']);
                    this._progressBarService.hide();
                },
                () => {
                    this._progressBarService.hide();
                });

            let resultDefendant = this._autoInformationStore.getDefendantByCaseId(this.caseId);
            resultDefendant.subscribe(
                (defendantAutoInformation: DefendantAutoInformation) => {
                    this.defendantAutoInformation = defendantAutoInformation;
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
            relativeVehicle: parseInt(formValues.relativesVehicle),
            vehicleResolveDamage: parseInt(formValues.helpinDamageResolved),
            vehicleDriveable: parseInt(formValues.vehicleDrivable),
            vehicleEstimatedDamage: formValues.txtEstimatedDamage,
            relativeVehicleLocation: '',
            vehicleClientHaveTitle: parseInt(formValues.titletoVehicle),
            relativeVehicleOwner: formValues.relOwnerName,

        });

        let defendantAutoInfoform = new DefendantAutoInformation({
            id: this.defendantAutoInformation.id ? this.defendantAutoInformation.id : 0,
            caseId: this.caseId,
            vehicleNumberPlate: formValues.txtDefendantPlate,
            state: formValues.defendantState,
            vehicleMakeModel: formValues.txtDefendantModel,
            vehicleMakeYear: formValues.txtDefendantModelYear,
            vehicleOwnerName: formValues.txtDefendantOwnerName,
            vehicleOperatorName: formValues.txtDefendantOperatorName,
            vehicleInsuranceCompanyName: formValues.defendantInsuranceCompany,
            vehiclePolicyNumber: formValues.txtDefendantPolicy,
            vehicleClaimNumber: formValues.txtDefendantClaim,
        });

        this._progressBarService.show();
        result = this._autoInformationStore.saveAutoInformation(autoInfoform);
        let addDefendantAutoInfo = this._autoInformationStore.saveDefendantAutoInformation(defendantAutoInfoform);
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