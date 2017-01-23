import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { RoomsComponent } from './components/rooms';
import { AddRoomComponent } from './components/add-room';
import { EditRoomComponent } from './components/edit-room';
import { ShellComponent } from '../../commons/shell-component';

export const RoomsRoutes: Routes = [
    {
        path: 'rooms',
        component: RoomsComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Rooms'
        }
    },
    {
        path: 'rooms',
        component: ShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Rooms'
        },
        children: [
            {
                path: 'add',
                component: AddRoomComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Add Room'
                }
            },
            {
                path: 'edit/:id',
                component: EditRoomComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Edit Room'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(RoomsRoutes)],
    exports: [RouterModule]
})
export class RoomsRoutingModule { }