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
import { InsuranceAddress } from '../../../commons/models/insurance-address';
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
    insuranceAddressnew : InsuranceAddress;
    insuranceAddressnewList: InsuranceAddress[] = [];
    insuranceAddressSelectedList:InsuranceAddress[] = [];
    insuranceAddressDeleteList:InsuranceAddress[] = [];
    recordId : number = 0;
    isAddressAdd = true;

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
            zeusId: [''],
            isDefault: ['']
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
        debugger;
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
            InsuranceAddress: this.insuranceAddressnewList,
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
                this.insuranceAddressnewList = [];
                this.insuranceAddressDeleteList = [];
                this.isAddressAdd = true;
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

    AddNewAddressToList()
    {
        let addInsuranceMasterFormValues = this.addInsuranceMasterForm.value;
        if(addInsuranceMasterFormValues.address1.trim() != '' &&  addInsuranceMasterFormValues.address1.trim() != undefined)
        {
        this.recordId = this.recordId + 1;
        this.insuranceAddressnew  = new InsuranceAddress({
            insuranceMasterId: 0,
            address1: addInsuranceMasterFormValues.address1,
            address2: addInsuranceMasterFormValues.address2,
            city: addInsuranceMasterFormValues.city,
            country: addInsuranceMasterFormValues.country? addInsuranceMasterFormValues.country : '',
            state: addInsuranceMasterFormValues.state,
            zipCode: addInsuranceMasterFormValues.zipCode,
            isDefault: this.insuranceAddressnewList.length > 0 ? false : true,
            createByUserId: this._sessionStore.session.account.user.id,
            recordId: this.recordId
        });
        this.insuranceAddressnewList.push(this.insuranceAddressnew);
        this.insuranceAddressnewList = _.union(this.insuranceAddressnewList);
        this.addInsuranceMasterForm.controls['address1'].reset();
        this.addInsuranceMasterForm.controls['address2'].reset();
        this.addInsuranceMasterForm.controls['state'].reset();
        this.addInsuranceMasterForm.controls['city'].reset();
        this.addInsuranceMasterForm.controls['zipCode'].reset();
        //this.addInsuranceMasterForm.controls['country'].reset({country:''});
        if(this.insuranceAddressnewList.length > 0)
        {
            this.isAddressAdd = false;
        }
        else
        {
            this.isAddressAdd = true;
        }
        
    }
    else{
        let errString = 'Please enter address .';
        this._notificationsService.error('Oh No!', errString);
    }
 }


 DeleteAddress() {
    let addressIds: number[] = _.map(this.insuranceAddressDeleteList, (currentaddress: InsuranceAddress) => {
      return currentaddress.recordId;
    });
    let addressDetails = _.filter(this.insuranceAddressnewList, (currentaddress: InsuranceAddress) => {
      return _.indexOf(addressIds, currentaddress.recordId) < 0 ? true : false;
    });
    this.insuranceAddressnewList = _.union(addressDetails);
    this.insuranceAddressDeleteList = [];
    if(this.insuranceAddressnewList.length > 0)
    {
        this.isAddressAdd = false;
    }
    else
    {
        this.isAddressAdd = true;
    }
}

DeleteAddressindividual(data:InsuranceAddress)
{
    if(data.isDefault == false)
    {
      let addressIds: number[] = [];
      addressIds.push(data.recordId);
      let addressDetails = _.filter(this.insuranceAddressnewList, (currentaddress: InsuranceAddress) => {
        return _.indexOf(addressIds, currentaddress.recordId) < 0 ? true : false;
      });
      this.insuranceAddressnewList = _.union(addressDetails);
      this.insuranceAddressDeleteList = [];
    }
    else
    {
        let errString = 'Default address cannot be deleted.';
        this._notificationsService.error('Oh No!', errString);
    }

    if(this.insuranceAddressnewList.length > 0)
    {
          this.isAddressAdd = false;
    }
    else
    {
          this.isAddressAdd = true;
    }

}

updateDefault(data:InsuranceAddress,status:string)
{
    if(status == 'add')
    {
        let itemIndexold = this.insuranceAddressnewList.findIndex(item => item.isDefault == true);
        let itemIndex = this.insuranceAddressnewList.findIndex(item => item.recordId == data.recordId);
      
        if(itemIndexold !== -1)
        {
            this.insuranceAddressnew  = new InsuranceAddress({
                insuranceMasterId: this.insuranceAddressnewList[itemIndexold].insuranceMasterId,
                address1: this.insuranceAddressnewList[itemIndexold].address1,
                address2: this.insuranceAddressnewList[itemIndexold].address2,
                city: this.insuranceAddressnewList[itemIndexold].city,
                country: this.insuranceAddressnewList[itemIndexold].country,
                state: this.insuranceAddressnewList[itemIndexold].state,
                zipCode: this.insuranceAddressnewList[itemIndexold].zipCode,
                isDefault:  false,
                createByUserId: this.insuranceAddressnewList[itemIndexold].createByUserId,
                recordId: this.insuranceAddressnewList[itemIndexold].recordId
              });
              this.insuranceAddressnewList[itemIndexold] = this.insuranceAddressnew;
        }

        if(itemIndex !== -1)
        {
          this.insuranceAddressnew  = new InsuranceAddress({
            insuranceMasterId: data.insuranceMasterId,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            country: data.country,
            state: data.state,
            zipCode: data.zipCode,
            isDefault:  true,
            createByUserId: data.createByUserId,
            recordId: data.recordId
          });
          this.insuranceAddressnewList[itemIndex] = this.insuranceAddressnew;
        }
        this.insuranceAddressnewList = _.union(this.insuranceAddressnewList);
    }
    else if(status == 'rem')
    {
        let itemIndexold = this.insuranceAddressnewList.findIndex(item => item.isDefault == true);
        if(itemIndexold !== -1)
        {
         if(this.insuranceAddressnewList.length > 1)
         {
             let itemIndex = this.insuranceAddressnewList.findIndex(item => item.recordId == data.recordId);
            if(this.insuranceAddressnewList[itemIndex].recordId != this.insuranceAddressnewList[itemIndexold].recordId)
            { 
             if(itemIndex !== -1)
             {
               this.insuranceAddressnew  = new InsuranceAddress({
                insuranceMasterId: data.insuranceMasterId,
                address1: data.address1,
                address2: data.address2,
                city: data.city,
                country: data.country,
                state: data.state,
                zipCode: data.zipCode,
                isDefault:  false,
                createByUserId: data.createByUserId,
                recordId: data.recordId
               });
               this.insuranceAddressnewList[itemIndex] = this.insuranceAddressnew;
              }
             this.insuranceAddressnewList = _.union(this.insuranceAddressnewList);
            }
            else
            {
                let errString = 'One address should be set as deafult.';
                this._notificationsService.error('Oh No!', errString);
            }
         }
         else
         {
            let errString = 'One address should be set as deafult.';
            this._notificationsService.error('Oh No!', errString);
         }
        }
        else
        {
            let errString = 'One address should be set as deafult.';
            this._notificationsService.error('Oh No!', errString);
        }
        
    }
    
}

}
