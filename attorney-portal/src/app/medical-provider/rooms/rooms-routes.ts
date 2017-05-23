import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { RoomsShellComponent } from './components/rooms-shell';
import { RoomsComponent } from './components/rooms';
import { AddRoomComponent } from './components/add-room';
import { EditRoomComponent } from './components/edit-room';
import { RoomsScheduleComponent } from './components/rooms-schedule';
import { ShellComponent } from '../../commons/shell-component';

export const RoomsRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rooms'
    },
    // {
    //     path: 'rooms',
    //     component: RoomsComponent,
    //     canActivate: [ValidateActiveSession],
    //     data: {
    //         breadcrumb: 'Rooms'
    //     }
    // },
    {
        path: 'rooms',
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Rooms'
        },
        children: [
            {
                path: '',
                component: RoomsComponent,
                data: {
                    breadcrumb: 'root'
                }
            },
            {
                path: 'add',
                component: AddRoomComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Room'
                }
            },
            {
                path: ':roomId',
                component: RoomsShellComponent,
                data: {
                    breadcrumb: 'root'
                },
                children: [
                    {
                        path: '',
                        redirectTo: 'basic',
                        pathMatch: 'full'
                    },
                    {
                        path: 'basic',
                        component: EditRoomComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Basic'
                        }
                    },
                    {
                        path: 'schedule',
                        component: RoomsScheduleComponent,
                        canActivate: [ValidateActiveSession],
                        data: {
                            breadcrumb: 'Rooms Schedule'
                        }
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(RoomsRoutes)],
    exports: [RouterModule]
})
export class RoomsRoutingModule { }