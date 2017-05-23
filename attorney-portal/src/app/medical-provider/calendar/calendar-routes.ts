import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './components/calendar';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';

export const CalendarRoutes: Routes = [
    {
        path: 'calendar',
        component: CalendarComponent,
        canActivate: [ValidateActiveSession]
    }
];

@NgModule({
    imports: [RouterModule.forChild(CalendarRoutes)],
    exports: [RouterModule]
})
export class CalendarRoutingModule { }

