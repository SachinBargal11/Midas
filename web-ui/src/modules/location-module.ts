import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared-module';
import { LocationComponent } from '../components/pages/medical-provider/location';
import { AccessComponent } from '../components/pages/location-management/access';
import { AddLocationComponent } from '../components/pages/location-management/add-location';
import { BasicComponent } from '../components/pages/location-management/basic';
import { LocationShellComponent } from '../components/pages/location-management/location-shell';
import { ScheduleComponent } from '../components/pages/location-management/schedule';
import { SettingsComponent } from '../components/pages/location-management/settings';
import { LocationsService } from '../services/locations-service';
import { ScheduleService } from '../services/schedule-service';
import { LocationsStore } from '../stores/locations-store';
import { ScheduleStore } from '../stores/schedule-store';
@NgModule({
    imports: [CommonModule, RouterModule, SharedModule],
    declarations: [
        LocationComponent,
        AddLocationComponent,
        AccessComponent,
        BasicComponent,
        LocationShellComponent,
        ScheduleComponent,
        SettingsComponent
    ],
    providers: [
        LocationsService,
        LocationsStore,
        ScheduleService,
        ScheduleStore
    ]
})
export class LocationModule { }
