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
import {InsuranceAddress} from '../../../commons/models/insurance-address';
import { Insurance } from '../../patients/models/insurance';
import { InsuranceMaster } from '../../patients/models/insurance-master';
import { InsuranceStore } from '../../patients/stores/insurance-store';
import { PatientsStore } from '../../patients/stores/patients-store';
import { PhoneFormatPipe } from '../../../commons/pipes/phone-format-pipe';
import { FaxNoFormatPipe } from '../../../commons/pipes/faxno-format-pipe';
import { Adjuster } from '../../../account-setup/models/adjuster';
import { AdjusterMasterStore } from '../../../account-setup/stores/adjuster-store';
import * as _ from 'underscore';
import { Observable } from 'rxjs/Rx';
import { Case } from '../models/case';
import { CasesStore } from '../../cases/stores/case-store';

@Component({
    selector: 'add-insurance',
    templateUrl: './add-insurance.html'
})


export class AddInsuranceComponent implements OnInit {
    states: any[];
    insuranceMasters: InsuranceMaster[];
    insuranceMaster: InsuranceMaster;
    adjusterMasters: Adjuster[];
    adjusterMaster: Adjuster;
    adjusterMastersList: Adjuster[];
    insuranceMastersAdress: Address;
    policyCities: any[];
    insuranceCities: any[];
    eventStartAsDate: Date;
    caseId: number;
    selectedCity = 0;
    isPolicyCitiesLoading = false;
    isInsuranceCitiesLoading = false;
    patientId: number;
    insurance: Insurance;
    insuranceAdjuster: Insurance;
    policyCellPhone: string;
    policyFaxNo: string;
    insuranceCellPhone: string;
    insuranceFaxNo: string;
    // msgs: Message[];
    uploadedFiles: any[] = [];
    insuranceform: FormGroup;
    insuranceformControls;
    isSaveProgress = false;
    insuranceMasterId: number = 0;
    insuranceContactPerson:string = '';
    showAdjusterList = false;
    adjusterMasterId = '';
    caseDetails: Case[];        
    insuranceisReadOnly : boolean = false;
    insuranceMastersAddressList : InsuranceAddress[];
    insuranceMastersAddressDisplay : InsuranceAddress[];
    insuranceMasterAddressId: number = 0;
    showinsuranceAddressList = false;
    caseViewedByOriginator = false;
    

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
        private _elRef: ElementRef,
        private _phoneFormatPipe: PhoneFormatPipe,
        private _faxNoFormatPipe: FaxNoFormatPipe,
        private _casesStore: CasesStore
    ) {

        this.eventStartAsDate = moment().toDate();
        this._route.parent.parent.params.subscribe((routeParams: any) => {
            this.caseId = parseInt(routeParams.caseId);
        });

        this._route.parent.parent.parent.params.subscribe((routeParams: any) => {            
            this.patientId = parseInt(routeParams.patientId, 10);
            this.MatchCase();
            this.clearInsuranceFields();
            this.clearInsuranceAdjusterFields();
        });
        //  this._insuranceStore.getInsurancesMaster()
        //     .subscribe(
        //     (insuranceMasters) => {
        //         this.insuranceMasters = insuranceMasters;
        //         this.insuranceMasters.forEach(element => {
        //             this.insuranceMastersAdress = element.Address
        //         });
        //     });


        this.insuranceform = this.fb.group({
            policyNumber: ['', Validators.required],
            policyOwner: ['', Validators.required],
            policyHoldersName: ['', Validators.required],
            insuranceStartDate: [''],
            insuranceEndDate: [''],
            balanceInsuredAmount: [''],
            insuranceCompanyCode: [''],
            insuranceMasterId: ['', Validators.required],
            insuranceType: ['', Validators.required],
            contactPerson: ['', Validators.required],
            policyAddress: ['', Validators.required],
            policyAddress2: [''],
            policyState: [''],
            policyCity: [''],
            policyZipCode: [''],
            policyCountry: [''],
            policyEmail: ['', [Validators.required, AppValidators.emailValidator]],
            policyCellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
            policyHomePhone: ['', [AppValidators.numberValidator, Validators.maxLength(10)]],
            policyWorkPhone: ['', [AppValidators.numberValidator, Validators.maxLength(10)]],
            policyFaxNo: [''],
            policyOfficeExtension: ['', [AppValidators.numberValidator, Validators.maxLength(5)]],
            policyAlternateEmail: ['', [AppValidators.emailValidator]],
            policyPreferredCommunication: [''],
            address: [''],
            address2: [''],
            state: [''],
            city: [''],
            zipcode: [''],
            country: [''],
            email: ['', [Validators.required, AppValidators.emailValidator]],
            cellPhone: ['', [Validators.required, AppValidators.mobileNoValidator]],
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
        // this.selectedInsurance = 0;
        if(event.value != "" && event.value != undefined)
        {
            let currentInsurance: number = parseInt(event.value);
            this.loadInsuranceMasterAddress(currentInsurance);
        }
        else
        {
            this.insuranceisReadOnly = false;
            this.clearInsuranceAdjusterFields();
            this.adjusterMasterId='';
            this.showAdjusterList = false;
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
                        this.insuranceMastersAdress = insuranceMaster.InsuranceAddress[0];
                        this.showinsuranceAddressList = false;
                    }
                    else if (insuranceMaster.InsuranceAddress.length > 1)
                    {
                        let itemIndex = insuranceMaster.InsuranceAddress.findIndex(item => item.isDefault == true);
                        if(itemIndex !== -1)
                        {
                            this.insuranceMastersAdress = insuranceMaster.InsuranceAddress[itemIndex];
                        }
                        this.insuranceMastersAddressList = insuranceMaster.InsuranceAddress;
                        this.showinsuranceAddressList = true;
                        this.loadInsuranceMasterAddressList();
                    }
                    else
                    {
                       
                        this.insuranceMastersAdress = null;
                        this.showinsuranceAddressList = false;
                    }
                   
                    this.loadInsuranceAdjusterInfo(this.insuranceMaster.id);
                });
        } else {
            this.insuranceMaster = null;
            this.insuranceMastersAdress = null;
            this.insuranceMastersAddressList = [];
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
            }
           /* else if(this.adjusterMasters.length == 1)
            {
                this.showAdjusterList = false;
                var adjusterContactInfo = this.adjusterMasters[0].adjusterContact;
                var adjusterAddressInfo =this.adjusterMasters[0].adjusterAddress;
                if((adjusterContactInfo != null && adjusterContactInfo != undefined) && (adjusterAddressInfo != null && adjusterAddressInfo != undefined) )
                {
                this.insuranceCellPhone = this._phoneFormatPipe.transform(adjusterContactInfo.cellPhone);
                this.policyFaxNo = this._faxNoFormatPipe.transform(adjusterContactInfo.faxNo);
                this.insuranceContactPerson = this.adjusterMasters[0].firstName + '' + this.adjusterMasters[0].lastName;
                this.insuranceAdjuster =   new Insurance({
                insuranceContact: new Contact({
                    cellPhone: adjusterContactInfo.cellPhone,
                    emailAddress: adjusterContactInfo.emailAddress,
                    faxNo:  adjusterContactInfo.faxNo,
                    homePhone: adjusterContactInfo.homePhone,
                    workPhone: adjusterContactInfo.workPhone,
                    officeExtension: adjusterContactInfo.officeExtension,
                    alternateEmail:  adjusterContactInfo.alternateEmail,
                    preferredCommunication: adjusterContactInfo.preferredCommunication ? adjusterContactInfo.preferredCommunication :'',
    
                }),
                insuranceAddress: new Address({
                    address1: adjusterAddressInfo.address1,
                    address2: adjusterAddressInfo.address2,
                    city: adjusterAddressInfo.city,
                    country: adjusterAddressInfo.country,
                    state: adjusterAddressInfo.state,
                    zipCode: adjusterAddressInfo.zipCode
                })
               
            });
        }
        else{
            this.showAdjusterList = false;
            this.clearInsuranceAdjusterFields();
        }
    }*/
    else if(this.adjusterMasters.length > 0)
    {
        this.clearInsuranceAdjusterFields();
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
             this.policyFaxNo = this._faxNoFormatPipe.transform(adjusterContactInfo.faxNo);
             this.insuranceContactPerson =  this.adjusterMaster.firstName + '' +  this.adjusterMaster.lastName;
             this.insuranceAdjuster =   new Insurance({
             insuranceContact: new Contact({
                 cellPhone: adjusterContactInfo.cellPhone,
                 emailAddress: adjusterContactInfo.emailAddress,
                 faxNo:  adjusterContactInfo.faxNo,
                 homePhone: adjusterContactInfo.homePhone,
                 workPhone: adjusterContactInfo.workPhone,
                 officeExtension: adjusterContactInfo.officeExtension,
                 alternateEmail:  adjusterContactInfo.alternateEmail,
                 preferredCommunication: adjusterContactInfo.preferredCommunication ? adjusterContactInfo.preferredCommunication :'',
 
             }),
             insuranceAddress: new Address({
                 address1: adjusterAddressInfo.address1,
                 address2: adjusterAddressInfo.address2,
                 city: adjusterAddressInfo.city,
                 country: adjusterAddressInfo.country,
                 state: adjusterAddressInfo.state,
                 zipCode: adjusterAddressInfo.zipCode
             })
            
         });
        }
     else{
         this.clearInsuranceAdjusterFields();
         this.insuranceisReadOnly = false;
     }
  });
 }
 else{
    this.clearInsuranceAdjusterFields();
    this.insuranceisReadOnly = false;
 }
}


    onUpload(event) {

        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }

    }

    save() {
        this.isSaveProgress = true;
        let insuranceformValues = this.insuranceform.value;
        let result;
        let insurance = new Insurance({
            caseId: this.caseId,
            policyHoldersName: insuranceformValues.policyHoldersName,
            policyOwnerId: insuranceformValues.policyOwner,
            policyNo: insuranceformValues.policyNumber,
            insuranceStartDate: insuranceformValues.insuranceStartDate ? moment(insuranceformValues.insuranceStartDate) : null,
            insuranceEndDate: insuranceformValues.insuranceEndDate ? moment(insuranceformValues.insuranceEndDate) : null,
            balanceInsuredAmount: insuranceformValues.balanceInsuredAmount,
            insuranceCompanyCode: insuranceformValues.insuranceCompanyCode,
            contactPerson: insuranceformValues.contactPerson,
            insuranceType: insuranceformValues.insuranceType,
            insuranceMasterId: insuranceformValues.insuranceMasterId,
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
                address1: this.insuranceMastersAdress ? this.insuranceMastersAdress.address1 : '',
                address2: this.insuranceMastersAdress ? this.insuranceMastersAdress.address2 : '',
                city: this.insuranceMastersAdress ? this.insuranceMastersAdress.city : '',
                country: this.insuranceMastersAdress ? this.insuranceMastersAdress.country : '',
                state: this.insuranceMastersAdress  ? this.insuranceMastersAdress.state : '',
                zipCode: this.insuranceMastersAdress ? this.insuranceMastersAdress.zipCode : ''
            })
        });
        this._progressBarService.show();
        result = this._insuranceStore.addInsurance(insurance);
        result.subscribe(
            (response) => {
                let notification = new Notification({
                    'title': 'Insurance added successfully!',
                    'type': 'SUCCESS',
                    'createdAt': moment()
                });
                this._notificationsStore.addNotification(notification);
                this._router.navigate(['../'], { relativeTo: this._route });
            },
            (error) => {
                let errString = 'Unable to add insurance.';
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

    clearInsuranceFields()
    {
        this.policyCellPhone = null;
        this.policyFaxNo = null;
        this.insurance =   new Insurance({
            policyContact: new Contact({
                cellPhone: null,
                emailAddress: null,
                faxNo:  null,
                homePhone: null,
                workPhone: null,
                officeExtension: null,
                alternateEmail: null,
                preferredCommunication: '',

            }),
            policyAddress: new Address({
                address1: null,
                address2: null,
                city: null,
                country: null,
                state: null,
                zipCode: null
            })
        });
    
    }


    clearInsuranceAdjusterFields()
    {
        this.adjusterMasterId = '';
        this.insuranceContactPerson = '';
        this.insuranceCellPhone = null;
        this.insuranceFaxNo = null;
        this.insuranceAdjuster =   new Insurance({
            insuranceContact: new Contact({
                cellPhone: null,
                emailAddress: null,
                faxNo: null,
                homePhone: null,
                workPhone: null,
                officeExtension: null,
                alternateEmail: null,
                preferredCommunication: '',
            }),
            insuranceAddress: new Address({
                address1: null,
                address2: null,
                city: null,
                country: null,
                state: null,
                zipCode: null
            })
        });
    
    }


    loadPatientInfoIfExists(event)
    {
        if(event.target.value == '1')
        {
        this._progressBarService.show();
        let fetchPatient = this._patientsStore.fetchPatientById(this.patientId);
        fetchPatient.subscribe(
            (patients: any) => {
                
                var patientInfo = patients.toJS();
                var patientContactInfo = patientInfo.user.contact;
                var patientAddressInfo = patientInfo.user.address;
                if((patientContactInfo != null && patientContactInfo != undefined) && (patientAddressInfo != null && patientAddressInfo != undefined) )
                {
                    this.policyCellPhone = this._phoneFormatPipe.transform(patientContactInfo.cellPhone);
                    this.policyFaxNo = this._faxNoFormatPipe.transform(patientContactInfo.faxNo);
                   
                this.insurance =   new Insurance({
                    policyContact: new Contact({
                        cellPhone: patientContactInfo.cellPhone,
                        emailAddress: patientContactInfo.emailAddress,
                        faxNo:  patientContactInfo.faxNo,
                        homePhone: patientContactInfo.homePhone,
                        workPhone: patientContactInfo.workPhone,
                        officeExtension: patientContactInfo.officeExtension,
                        alternateEmail:  patientContactInfo.alternateEmail,
                        preferredCommunication: patientContactInfo.preferredCommunication ? patientContactInfo.preferredCommunication :'',
        
                    }),
                    policyAddress: new Address({
                        address1: patientAddressInfo.address1,
                        address2: patientAddressInfo.address2,
                        city: patientAddressInfo.city,
                        country: patientAddressInfo.country,
                        state: patientAddressInfo.state,
                        zipCode: patientAddressInfo.zipCode
                    })
                   
                });
            }
               
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
        }
        else{
            this.clearInsuranceFields();
        }
    }

    MatchCase() {            
        this._progressBarService.show();
        let result = this._casesStore.fetchCaseById(this.caseId);
        result.subscribe(
            (caseDetail: Case) => {                    
                if (caseDetail.orignatorCompanyId != this._sessionStore.session.currentCompany.id) {
                    this.caseViewedByOriginator = false;
                } else {
                    this.caseViewedByOriginator = true;
                }                
            },
            (error) => {
                this._router.navigate(['../'], { relativeTo: this._route });
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }

    AddinsuranceAddress()
    {
        
    }
}