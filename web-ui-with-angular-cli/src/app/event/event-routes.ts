import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './components/event';
import { AddEventComponent } from './components/add-event';
import { EventShellComponent } from './components/event-shell';
import { ValidateActiveSession } from '../commons/guards/validate-active-session';

export const eventRoutes: Routes = [
    // {
    //     path: '',
    //     component: DashboardComponent,
    //     canActivate: [ValidateActiveSession],
    //     data: {
    //       breadcrumb: 'Dashboard'
    //     }
    // }
    {
        path: '',
        component: EventShellComponent,
        canActivate: [ValidateActiveSession],
        children: [
            {
                path: '',
                redirectTo: 'event',
                pathMatch: 'full'
            },
            {
                path: 'event',
                component: EventComponent,
                data: {
                    breadcrumb: 'Event'
                }
            },
            {
                path: 'addEvent',
                component: AddEventComponent,
                data: {
                    breadcrumb: 'Add Event'
                }
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(eventRoutes)],
    exports: [RouterModule]
})
export class EventRoutingModule { }