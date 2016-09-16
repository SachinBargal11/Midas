import {Component, OnInit, ElementRef} from '@angular/core';
import {Validators, FormControl, FormGroup, FormBuilder, AbstractControl} from '@angular/forms';
import {Router} from '@angular/router';
import {AppValidators} from '../../../utils/AppValidators';
import {LoaderComponent} from '../../elements/loader';
import {MedicalFacility} from '../../../models/medical-facility';
import {MedicalFacilityDetail} from '../../../models/medical-facility-details';
import {User} from '../../../models/user';
import {AccountDetail} from '../../../models/account-details';
import {Account} from '../../../models/account';
import {ContactInfo} from '../../../models/contact';
import {Address} from '../../../models/address';
import {SessionStore} from '../../../stores/session-store';
import {NotificationsStore} from '../../../stores/notifications-store';
import {Notification} from '../../../models/notification';
import moment from 'moment';
import {Calendar, InputMask, AutoComplete} from 'primeng/primeng';
import {MedicalFacilityStore} from '../../../stores/medical-facilities-store';
import {MedicalFacilityService} from '../../../services/medical-facility-service';
import {Gender} from '../../../models/enums/Gender';
import {UserType} from '../../../models/enums/UserType';
import {StatesStore} from '../../../stores/states-store';
import {StateService} from '../../../services/state-service';

@Component({
    selector: 'add-medical-facility',
    templateUrl: 'templates/pages/medical-facilities/add-medical-facility.html',
    providers: [MedicalFacilityService, StateService, StatesStore, FormBuilder]
})

export class AddMedicalFacilityComponent implements OnInit {
    states: any[];
    options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 10
    };
    medicalFacilityForm: FormGroup;
    medicalFacilityFormControls;
    isSaveMedicalFacilityProgress = false;

    constructor(
        private _stateService: StateService,
        private _statesStore: StatesStore,
        private _medicalFacilitiesStore: MedicalFacilityStore,
        private fb: FormBuilder,
        private _router: Router,
        private _notificationsStore: NotificationsStore,
        private _sessionStore: SessionStore,
        private _elRef: ElementRef
    ) {
        this.medicalFacilityForm = this.fb.group({
                name: ['', Validators.required],
                prefix: ['', Validators.required],
            contact: this.fb.group({
                email: ['', [Validators.required, AppValidators.emailValidator]],
                cellPhone: ['', [Validators.required]],
                homePhone: [''],
                workPhone: [''],
                faxNo: ['']
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

        this.medicalFacilityFormControls = this.medicalFacilityForm.controls;
    }

    ngOnInit() {
        this._stateService.getStates()
            .subscribe(states => this.states = states);
    }


    saveMedicalFacility() {
        let medicalFacilityFormValues = this.medicalFacilityForm.value;
        let medicalFacilityDetail = new MedicalFacilityDetail({
            account: new Account({
               id: this._sessionStore.session.account_id
            }),
            user: new User({
                id: this._sessionStore.session.user.id
            }),
            medicalfacility: new MedicalFacility({
                name: medicalFacilityFormValues.name,
                prefix: medicalFacilityFormValues.prefix
            }),
            contactInfo: new ContactInfo({
                cellPhone: medicalFacilityFormValues.contact.cellPhone,
                emailAddress: medicalFacilityFormValues.contact.email,
                faxNo: medicalFacilityFormValues.contact.faxNo,
                homePhone: medicalFacilityFormValues.contact.homePhone,
                workPhone: medicalFacilityFormValues.contact.workPhone,
            }),
            address: new Address({
                address1: medicalFacilityFormValues.address.address1,
                address2: medicalFacilityFormValues.address.address2,
                city: medicalFacilityFormValues.address.city,
                country: medicalFacilityFormValues.address.country,
                state: medicalFacilityFormValues.address.state,
                zipCode: medicalFacilityFormValues.address.zipCode,
            })
        });
        this.isSaveMedicalFacilityProgress = true;
        let result;

        result = this._medicalFacilitiesStore.addMedicalFacility(medicalFacilityDetail);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Medical facility added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['/medical-facilities']);
            },
            (error) => {
                let notification = new Notification({
                    'title': 'Unable to add Medical facility.',
                    'type': 'ERROR',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
            },
            () => {
                this.isSaveMedicalFacilityProgress = false;
            });

    }

}
