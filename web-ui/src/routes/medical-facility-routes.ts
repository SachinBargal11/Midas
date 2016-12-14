import {Routes} from '@angular/router';
import {ValidateActiveSession} from './guards/validate-active-session';
import {AddMedicalFacilityComponent} from '../components/pages/medical-facilities/add-medical-facility';
import {UpdateMedicalFacilityComponent} from '../components/pages/medical-facilities/update-medical-facility';
import {MedicalFacilitiesListComponent} from '../components/pages/medical-facilities/medical-facilities-list';
import {SpecialityDetailsComponent} from '../components/pages/medical-facilities/speciality-details';

export const MedicalFacilitiesRoutes: Routes = [
    {
        path: 'medical-facilities',
        component: MedicalFacilitiesListComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Medical Facilities'
        }
    },
    {
        path: 'medical-facilities/add',
        component: AddMedicalFacilityComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Add Medical Facility'
        }
    },
    {
        path: 'medical-facilities/:id/specialities',
        component: SpecialityDetailsComponent,
        canActivate: [ValidateActiveSession]
    },
    {
        path: 'medical-facilities/update/:id',
        component: UpdateMedicalFacilityComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Update Medical Facility'
        }
    }
];