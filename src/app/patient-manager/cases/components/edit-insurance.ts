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
import {InsuranceAddress} from '../../../commons/models/insurance-address';
import { Insurance } from '../../patients/models/insurance';
import { InsuranceMaster } from '../../patients/models/insurance-master';
import { InsuranceStore } from '../../patients/stores/insurance-store';
import { PatientsStore } from '../../patients/stores/patients-store';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../../commons/pipes/faxno-format-pipe';
import { Adjuster } from '../../../account-setup/models/adjuster';
import { AdjusterMasterStore } from '../../../account-setup/stores/adjuster-store';
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
    adjusterMasters: Adjuster[];
    adjusterMaster: Adjuster;
    adjusterMastersList: Adjuster[];
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
    showAdjusterList = false;
    insuranceform: FormGroup;
    insuranceformControls;
    isSaveProgress = false;
    insuranceStartDate: Date;
    insuranceEndDate: Date;
    balanceInsuredAmount: string;
    caseStatusId: number;
    insuranceMasterId: number;
    adjusterMasterId = '';
    insuranceContactPerson:string = '';
    insuranceisReadOnly:boolean = false;
    insuranceMastersAddressList : InsuranceAddress[];
    insuranceMastersAddressDisplay : InsuranceAddress[];
    insuranceMasterAddressId: number = 0;
    showinsuranceAddressList = false;

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
        private _adjusterMasterStore: AdjusterMasterStore,
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
            this.clearInsuranceAdjusterFields();
            let result = this._insuranceStore.fetchInsuranceById(insuranceId);
            result.subscribe(
                (insurance: any) => {
                    this.insurance = insurance.toJS();
                    this.insuranceMasterId = this.insurance.insuranceMasterId;
                    this.loadInsuranceMasterAddressInit(this.insurance.insuranceMasterId);
                    this.policyCellPhone = this._phoneFormatPipe.transform(this.insurance.policyContact.cellPhone);
                    this.policyFaxNo = this._faxNoFormatPipe.transform(this.insurance.policyContact.faxNo);
                    this.insuranceCellPhone = this._phoneFormatPipe.transform(this.insurance.insuranceContact.cellPhone);
                    this.insuranceFaxNo = this._faxNoFormatPipe.transform(this.insurance.insuranceContact.faxNo);
                    this.insuranceContactPerson = this.insurance.contactPerson;
                    this.insuranceContact = new Contact({
                        cellPhone: this.insurance.insuranceContact.cellPhone,
                        emailAddress: this.insurance.insuranceContact.emailAddress,
                        faxNo:  this.insurance.insuranceContact.faxNo,
                        homePhone: this.insurance.insuranceContact.homePhone,
                        workPhone: this.insurance.insuranceContact.workPhone,
                        officeExtension: this.insurance.insuranceContact.officeExtension,
                        alternateEmail:  this.insurance.insuranceContact.alternateEmail,
                        preferredCommunication: this.insurance.insuranceContact.preferredCommunication ? this.insurance.insuranceContact.preferredCommunication :'',
        
                    });
                    this.insuranceAddress = new Address({
                        address1: this.insurance.insuranceAddress.address1,
                        address2: this.insurance.insuranceAddress.address2,
                        city: this.insurance.insuranceAddress.city,
                        country: this.insurance.insuranceAddress.country,
                        state: this.insurance.insuranceAddress.state,
                        zipCode: this.insurance.insuranceAddress.zipCode
                    });
                    this.insuranceStartDate = this.insurance.insuranceStartDate
                        ? this.insurance.insuranceStartDate.toDate()
                        : null;
                    this.insuranceEndDate = this.insurance.insuranceEndDate
                        ? this.insurance.insuranceEndDate.toDate()
                        : null;
                    this.balanceInsuredAmount = this.insurance.balanceInsuredAmount;
                    this.insuranceMastersAdress = this.insurance.insuranceAddress;
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
            preferredCommunication: [''],
            adjusterMasterId:[''],
            insuranceMasterAddressId:['']
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

    selectInsurance(event) {
        let currentInsurance: number = 0;
        if(event.value != '' && event.value != undefined)
        {
            currentInsurance = parseInt(event.value);
        }
        else
        {
            currentInsurance = 0;
        }
        
        if (currentInsurance != 0) {
            this.loadInsuranceMasterAddress(currentInsurance);
        } else {
            this.insuranceMastersAdress = null
            this.insuranceisReadOnly = false;
            this.showAdjusterList = false;
            this.insuranceContactPerson = this.insurance.contactPerson;
            this.insuranceCellPhone = this._phoneFormatPipe.transform(this.insurance.insuranceContact.cellPhone);
            this.insuranceFaxNo = this._faxNoFormatPipe.transform(this.insurance.insuranceContact.faxNo);
            this.insuranceContact = new Contact({
                cellPhone: this.insurance.insuranceContact.cellPhone,
                emailAddress: this.insurance.insuranceContact.emailAddress,
                faxNo:  this.insurance.insuranceContact.faxNo,
                homePhone: this.insurance.insuranceContact.homePhone,
                workPhone: this.insurance.insuranceContact.workPhone,
                officeExtension: this.insurance.insuranceContact.officeExtension,
                alternateEmail:  this.insurance.insuranceContact.alternateEmail,
                preferredCommunication: this.insurance.insuranceContact.preferredCommunication ? this.insurance.insuranceContact.preferredCommunication :'',
        
            });
            this.insuranceAddress = new Address({
                address1: this.insurance.insuranceAddress.address1,
                address2: this.insurance.insuranceAddress.address2,
                city: this.insurance.insuranceAddress.city,
                country: this.insurance.insuranceAddress.country,
                state: this.insurance.insuranceAddress.state,
                zipCode: this.insurance.insuranceAddress.zipCode
            });
        }
    }
    onUpload(event) {

        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
    }

    loadInsuranceMasterAddress(currentInsurance) {
        if (currentInsurance) {
        this._insuranceStore.getInsuranceMasterById(currentInsurance)
            .subscribe(
            (insuranceMaster) => {
                this.insuranceMaster = insuranceMaster;
                if(insuranceMaster.InsuranceAddress.length > 0 && insuranceMaster.InsuranceAddress.length == 1)
                {
                    if(currentInsurance == this.insurance.insuranceMasterId)
                    {
                        this.insuranceMastersAdress = this.insurance.insuranceAddress;
                        this.showinsuranceAddressList = false;
                    }
                    else
                    {
                        this.insuranceMastersAdress = insuranceMaster.InsuranceAddress[0];
                        this.showinsuranceAddressList = false;
                    }
                   
                }
                else if (insuranceMaster.InsuranceAddress.length > 1)
                {
                    let itemIndex = insuranceMaster.InsuranceAddress.findIndex(item => item.isDefault == true);
                    if(itemIndex !== -1)
                    {
                        if(currentInsurance == this.insurance.insuranceMasterId)
                        {
                            this.insuranceMastersAdress = this.insurance.insuranceAddress;
                        }
                        else
                        {
                            this.insuranceMastersAdress = insuranceMaster.InsuranceAddress[itemIndex];
                        }
                        
                    }
                    this.insuranceMastersAddressList = insuranceMaster.InsuranceAddress;
                    this.showinsuranceAddressList = true;
                    this.loadInsuranceMasterAddressList();
                }
                else
                {
                    this.insuranceMastersAdress = this.insurance.insuranceAddress;
                    this.showinsuranceAddressList = false;
                }
                this.loadInsuranceAdjusterInfo(this.insuranceMaster.id);
            });
        }
        else
        {
          
        }
    }

    loadInsuranceMasterAddressInit(currentInsurance) {
        if (currentInsurance) {
        this._insuranceStore.getInsuranceMasterById(currentInsurance)
            .subscribe(
            (insuranceMaster) => {
                this.insuranceMaster = insuranceMaster;
                if(insuranceMaster.InsuranceAddress.length > 0 && insuranceMaster.InsuranceAddress.length == 1)
                {
                    //this.insuranceMastersAdress = insuranceMaster.InsuranceAddress[0];
                    this.showinsuranceAddressList = false;
                }
                else if (insuranceMaster.InsuranceAddress.length > 1)
                {
                    let itemIndex = insuranceMaster.InsuranceAddress.findIndex(item => item.isDefault == true);
                    if(itemIndex !== -1)
                    {
                       // this.insuranceMastersAdress = insuranceMaster.InsuranceAddress[itemIndex];
                    }
                    this.insuranceMastersAddressList = insuranceMaster.InsuranceAddress;
                    this.showinsuranceAddressList = true;
                    this.loadInsuranceMasterAddressList();
                }
                this.loadInsuranceAdjuster(this.insuranceMaster.id);
            });
        }
        else
        {

        }
    }

    loadInsuranceMasterAddressList()
    {
        let defaultLabel: any[] = [{
            label: '-Select Insurance Address-',
            value: ''
        }]
        let insuranceMasterAddress = _.map(this.insuranceMastersAddressList, (currentInsuranceMaster: InsuranceAddress) => {
            return {
                label: `${currentInsuranceMaster.address1 + (currentInsuranceMaster.isDefault  ? ' | Default' : '')}`,
                value: currentInsuranceMaster.id
            };
        })
        this.insuranceMastersAddressDisplay = _.union(defaultLabel, insuranceMasterAddress);
    }

    insuranceAddressChange(event)
    {
        if(event.value != '' && event.value != undefined)
        {
            let itemIndex = this.insuranceMastersAddressList.findIndex(item => item.id == event.value);
            if(itemIndex !== -1)
            {
                this.insuranceMastersAdress = this.insuranceMastersAddressList[itemIndex];
            }
        }
        else
        {
            let itemIndex = this.insuranceMastersAddressList.findIndex(item => item.isDefault == true);
            if(itemIndex !== -1)
            {
                this.insuranceMastersAdress = this.insuranceMastersAddressList[itemIndex];
            }
            
        }
    }

    loadInsuranceAdjuster(insuranceId:number)
    {
        this._adjusterMasterStore.getAdjusterByCompanyAndInsuranceMasterId(insuranceId)
        .subscribe(
        (adjusterMaster) => {
            this.adjusterMasters = adjusterMaster;
            if(this.adjusterMasters.length == 0)
            {
                this.showAdjusterList = false;
            }
          /*  else if(this.adjusterMasters.length == 1)
            {
                this.showAdjusterList = false;
            }*/
            else if(this.adjusterMasters.length > 0)
            {
                this.showAdjusterList = true;
                let defaultLabel: any[] = [{
                    label: '-Select Adjuster-',
                    value: ''
                 }]
                let adjusterMasterLst = _.map(adjusterMaster, (currentAdjusterMaster: Adjuster) => {
                return {
                    label: `${currentAdjusterMaster.firstName + '' + currentAdjusterMaster.lastName}`,
                    value: currentAdjusterMaster.id
                };
             })
             this.adjusterMastersList = _.union(defaultLabel, adjusterMasterLst);
            }
   });
}

    loadInsuranceAdjusterInfo(insuranceId:number)
    {
        this._adjusterMasterStore.getAdjusterByCompanyAndInsuranceMasterId(insuranceId)
        .subscribe(
        (adjusterMaster) => {
            this.adjusterMasters = adjusterMaster;
            if(this.adjusterMasters.length == 0)
            {
                this.showAdjusterList = false;
                this.insuranceisReadOnly = false;
                this.clearInsuranceAdjusterFields();
                if(insuranceId == this.insurance.insuranceMasterId)
                {
                this.insuranceContactPerson = this.insurance.contactPerson;
                this.insuranceCellPhone = this._phoneFormatPipe.transform(this.insurance.insuranceContact.cellPhone);
                this.insuranceFaxNo = this._faxNoFormatPipe.transform(this.insurance.insuranceContact.faxNo);
                this.insuranceContact = new Contact({
                    cellPhone: this.insurance.insuranceContact.cellPhone,
                    emailAddress: this.insurance.insuranceContact.emailAddress,
                    faxNo:  this.insurance.insuranceContact.faxNo,
                    homePhone: this.insurance.insuranceContact.homePhone,
                    workPhone: this.insurance.insuranceContact.workPhone,
                    officeExtension: this.insurance.insuranceContact.officeExtension,
                    alternateEmail:  this.insurance.insuranceContact.alternateEmail,
                    preferredCommunication: this.insurance.insuranceContact.preferredCommunication ? this.insurance.insuranceContact.preferredCommunication :'',
            
                });
                this.insuranceAddress = new Address({
                    address1: this.insurance.insuranceAddress.address1,
                    address2: this.insurance.insuranceAddress.address2,
                    city: this.insurance.insuranceAddress.city,
                    country: this.insurance.insuranceAddress.country,
                    state: this.insurance.insuranceAddress.state,
                    zipCode: this.insurance.insuranceAddress.zipCode
                });
            }
        }
         /*   else if(this.adjusterMasters.length == 1)
            {
                if(this.insuranceMasterId == this.insurance.insuranceMasterId)
                {
                    this.loadInsuranceAdjuster(this.insuranceMasterId);
                    this.insuranceContactPerson = this.insurance.contactPerson;
                    this.insuranceCellPhone = this._phoneFormatPipe.transform(this.insurance.insuranceContact.cellPhone);
                    this.insuranceFaxNo = this._faxNoFormatPipe.transform(this.insurance.insuranceContact.faxNo);
                    this.insuranceContact = new Contact({
                        cellPhone: this.insurance.insuranceContact.cellPhone,
                        emailAddress: this.insurance.insuranceContact.emailAddress,
                        faxNo:  this.insurance.insuranceContact.faxNo,
                        homePhone: this.insurance.insuranceContact.homePhone,
                        workPhone: this.insurance.insuranceContact.workPhone,
                        officeExtension: this.insurance.insuranceContact.officeExtension,
                        alternateEmail:  this.insurance.insuranceContact.alternateEmail,
                        preferredCommunication: this.insurance.insuranceContact.preferredCommunication ? this.insurance.insuranceContact.preferredCommunication :'',
                
                    });
                    this.insuranceAddress = new Address({
                        address1: this.insurance.insuranceAddress.address1,
                        address2: this.insurance.insuranceAddress.address2,
                        city: this.insurance.insuranceAddress.city,
                        country: this.insurance.insuranceAddress.country,
                        state: this.insurance.insuranceAddress.state,
                        zipCode: this.insurance.insuranceAddress.zipCode
                    });
                }
                else
                {
                    this.showAdjusterList = false;
                    var adjusterContactInfo = this.adjusterMasters[0].adjusterContact;
                    var adjusterAddressInfo =this.adjusterMasters[0].adjusterAddress;
                    if((adjusterContactInfo != null && adjusterContactInfo != undefined) && (adjusterAddressInfo != null && adjusterAddressInfo != undefined) )
                    {
                    this.insuranceCellPhone = this._phoneFormatPipe.transform(adjusterContactInfo.cellPhone);
                    this.insuranceFaxNo = this._faxNoFormatPipe.transform(adjusterContactInfo.faxNo);
                    this.insuranceContactPerson = this.adjusterMasters[0].firstName + ' ' + this.adjusterMasters[0].lastName;
                   
                    this.insuranceContact = new Contact({
                        cellPhone: adjusterContactInfo.cellPhone,
                        emailAddress: adjusterContactInfo.emailAddress,
                        faxNo:  adjusterContactInfo.faxNo,
                        homePhone: adjusterContactInfo.homePhone,
                        workPhone: adjusterContactInfo.workPhone,
                        officeExtension: adjusterContactInfo.officeExtension,
                        alternateEmail:  adjusterContactInfo.alternateEmail,
                        preferredCommunication: adjusterContactInfo.preferredCommunication ? adjusterContactInfo.preferredCommunication :'',
        
                    });
                    this.insuranceAddress = new Address({
                        address1: adjusterAddressInfo.address1,
                        address2: adjusterAddressInfo.address2,
                        city: adjusterAddressInfo.city,
                        country: adjusterAddressInfo.country,
                        state: adjusterAddressInfo.state,
                        zipCode: adjusterAddressInfo.zipCode
                    })
            }
            else
            {
                this.showAdjusterList = false;
                this.clearInsuranceAdjusterFields();
            }
        }   
    }*/
    else if(this.adjusterMasters.length > 0)
    {
        this.showAdjusterList = true;
        this.insuranceisReadOnly = false;
        let defaultLabel: any[] = [{
            label: '-Select Adjuster-',
            value: ''
        }]
        let adjusterMasterLst = _.map(adjusterMaster, (currentAdjusterMaster: Adjuster) => {
            return {
                label: `${currentAdjusterMaster.firstName + '' + currentAdjusterMaster.lastName}`,
                value: currentAdjusterMaster.id
            };
        });
        this.adjusterMastersList = _.union(defaultLabel, adjusterMasterLst);

        if(this.adjusterMasterId == '' || this.adjusterMasterId == undefined)
        {
            this.insuranceContactPerson = this.insurance.contactPerson;
            this.insuranceCellPhone = this._phoneFormatPipe.transform(this.insurance.insuranceContact.cellPhone);
            this.insuranceFaxNo = this._faxNoFormatPipe.transform(this.insurance.insuranceContact.faxNo);
            this.insuranceContact = new Contact({
                cellPhone: this.insurance.insuranceContact.cellPhone,
                emailAddress: this.insurance.insuranceContact.emailAddress,
                faxNo:  this.insurance.insuranceContact.faxNo,
                homePhone: this.insurance.insuranceContact.homePhone,
                workPhone: this.insurance.insuranceContact.workPhone,
                officeExtension: this.insurance.insuranceContact.officeExtension,
                alternateEmail:  this.insurance.insuranceContact.alternateEmail,
                preferredCommunication: this.insurance.insuranceContact.preferredCommunication ? this.insurance.insuranceContact.preferredCommunication :'',
        
            });
            this.insuranceAddress = new Address({
                address1: this.insurance.insuranceAddress.address1,
                address2: this.insurance.insuranceAddress.address2,
                city: this.insurance.insuranceAddress.city,
                country: this.insurance.insuranceAddress.country,
                state: this.insurance.insuranceAddress.state,
                zipCode: this.insurance.insuranceAddress.zipCode
            });
        }
    }

   });
}


 loadInsuranceAdjusterInfoByID(event)
 {
     if(event.value != '' && event.value != undefined)
     {
        
     this._adjusterMasterStore.fetchAdjusterById(event.value)
     .subscribe(
     (adjusterMaster) => {
         this.adjusterMaster = adjusterMaster;
             var adjusterContactInfo = this.adjusterMaster.adjusterContact;
             var adjusterAddressInfo = this.adjusterMaster.adjusterAddress;
             if((adjusterContactInfo != null && adjusterContactInfo != undefined) && (adjusterAddressInfo != null && adjusterAddressInfo != undefined) )
             {
             this.insuranceisReadOnly = true;    
             this.insuranceCellPhone = this._phoneFormatPipe.transform(adjusterContactInfo.cellPhone);
             this.insuranceFaxNo = this._faxNoFormatPipe.transform(adjusterContactInfo.faxNo);
             this.insuranceContactPerson =  this.adjusterMaster.firstName + ' ' +  this.adjusterMaster.lastName;
            
             this.insuranceContact = new Contact({
                 cellPhone: adjusterContactInfo.cellPhone,
                 emailAddress: adjusterContactInfo.emailAddress,
                 faxNo:  adjusterContactInfo.faxNo,
                 homePhone: adjusterContactInfo.homePhone,
                 workPhone: adjusterContactInfo.workPhone,
                 officeExtension: adjusterContactInfo.officeExtension,
                 alternateEmail:  adjusterContactInfo.alternateEmail,
                 preferredCommunication: adjusterContactInfo.preferredCommunication ? adjusterContactInfo.preferredCommunication :'',
 
             });
             this.insuranceAddress = new Address({
                 address1: adjusterAddressInfo.address1,
                 address2: adjusterAddressInfo.address2,
                 city: adjusterAddressInfo.city,
                 country: adjusterAddressInfo.country,
                 state: adjusterAddressInfo.state,
                 zipCode: adjusterAddressInfo.zipCode
             });
        }
     else{
         this.clearInsuranceAdjusterFields();
         this.insuranceisReadOnly = false;
     }
  });
 }
 else{
    this.insuranceisReadOnly = false;
    this.insuranceContactPerson = this.insurance.contactPerson;
    this.insuranceCellPhone = this._phoneFormatPipe.transform(this.insurance.insuranceContact.cellPhone);
    this.insuranceFaxNo = this._faxNoFormatPipe.transform(this.insurance.insuranceContact.faxNo);
    this.insuranceContact = new Contact({
        cellPhone: this.insurance.insuranceContact.cellPhone,
        emailAddress: this.insurance.insuranceContact.emailAddress,
        faxNo:  this.insurance.insuranceContact.faxNo,
        homePhone: this.insurance.insuranceContact.homePhone,
        workPhone: this.insurance.insuranceContact.workPhone,
        officeExtension: this.insurance.insuranceContact.officeExtension,
        alternateEmail:  this.insurance.insuranceContact.alternateEmail,
        preferredCommunication: this.insurance.insuranceContact.preferredCommunication ? this.insurance.insuranceContact.preferredCommunication :'',

    });
    this.insuranceAddress = new Address({
        address1: this.insurance.insuranceAddress.address1,
        address2: this.insurance.insuranceAddress.address2,
        city: this.insurance.insuranceAddress.city,
        country: this.insurance.insuranceAddress.country,
        state: this.insurance.insuranceAddress.state,
        zipCode: this.insurance.insuranceAddress.zipCode
    });
 }
}

    clearInsuranceAdjusterFields()
    {
        this.adjusterMasterId = '';
        this.insuranceContactPerson = '';
        this.insuranceCellPhone = null;
        this.insuranceFaxNo = null;
       
           this.insuranceContact= new Contact({
                cellPhone: null,
                emailAddress: null,
                faxNo: null,
                homePhone: null,
                workPhone: null,
                officeExtension: null,
                alternateEmail: null,
                preferredCommunication: '',
            }),
            this.insuranceAddress = new Address({
                address1: null,
                address2: null,
                city: null,
                country: null,
                state: null,
                zipCode: null
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
                address1: this.insuranceMastersAdress.address1,
                address2: this.insuranceMastersAdress.address2,
                city: this.insuranceMastersAdress.city,
                country: this.insuranceMastersAdress.country,
                state: this.insuranceMastersAdress.state,
                zipCode: this.insuranceMastersAdress.zipCode
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