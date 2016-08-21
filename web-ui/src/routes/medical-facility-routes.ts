import {Routes, RouterModule} from '@angular/router';
import {ValidateActiveSession} from './guards/validate-active-session';
import {AddMedicalFacilityComponent} from '../components/pages/medical-facilities/add-medical-facility';
import {MedicalFacilitiesListComponent} from '../components/pages/medical-facilities/medical-facilities-list';

export const MedicalFacilitiesRoutes: Routes = [
    {
        path: 'medical-facilities',
        component: MedicalFacilitiesListComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'medical-facilities/add',
        component: AddMedicalFacilityComponent,
        canActivate: [ValidateActiveSession]
    }
];