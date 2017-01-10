import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared-module';
import { AddPatientComponent } from '../components/pages/patients/add-patient';
import { AppointmentsComponent } from '../components/pages/patients/appointments';
import { BalancesComponent } from '../components/pages/patients/balances';
import { DemographicsComponent } from '../components/pages/patients/demographics';
import { DocumentsComponent } from '../components/pages/patients/documents';
import { InsurancesComponent } from '../components/pages/patients/insurances';
import { PatientBasicComponent } from '../components/pages/patients/patient-basic';
import { PatientDetailsComponent } from '../components/pages/patients/patient-details';
import { PatientNavComponent } from '../components/pages/patients/patient-nav-bar';
import { PatientsListComponent } from '../components/pages/patients/patients-list';
import { PatientsManagerShellComponent } from '../components/pages/patients/patients-manager-shell';
import { PatientsShellComponent } from '../components/pages/patients/patients-shell';
import { PatientProfileComponent } from '../components/pages/patients/profile-patient';
import { CasesComponent } from '../components/pages/patient-manager/cases';
import { ConsentFormsComponent } from '../components/pages/patient-manager/consent-forms';
import { ReferalsComponent } from '../components/pages/patient-manager/referals';
import { PatientsService } from '../services/patients-service';
import { PatientsStore } from '../stores/patients-store';

import { PatientRoutingModule } from '../routes/patient-manager-routes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        PatientRoutingModule
    ],
    declarations: [
        AddPatientComponent,
        AppointmentsComponent,
        BalancesComponent,
        DemographicsComponent,
        DocumentsComponent,
        InsurancesComponent,
        PatientBasicComponent,
        PatientDetailsComponent,
        PatientNavComponent,
        PatientsListComponent,
        PatientsManagerShellComponent,
        PatientsShellComponent,
        PatientProfileComponent,
        CasesComponent,
        ConsentFormsComponent,
        ReferalsComponent
    ],
    providers: [
        PatientsService,
        PatientsStore
    ]
})
export class PatientModule { }
