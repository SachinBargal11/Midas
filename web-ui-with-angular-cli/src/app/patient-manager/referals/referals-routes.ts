import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateActiveSession } from '../../commons/guards/validate-active-session';
import { ShellComponent } from '../../commons/shell-component';
import { ReferralsShellComponent } from './components/referrals-shell';
import { InboundReferralsComponent } from './components/inbound-referrals';
import { OutboundReferralsComponent } from './components/outbound-referrals';
import { PendingReferralsComponent } from './components/pending-referrals';
export const ReferralsShellRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'referrals'
    },
    {
        path: 'referrals',
        component: ReferralsShellComponent,
        canActivate: [ValidateActiveSession],
        data: {
            breadcrumb: 'Referrals'
        },
        children: [
            {
                path: '',
                redirectTo: 'pending-referrals',
                pathMatch: 'full'
            },
            {
                path: 'inbound-referrals',
                component: InboundReferralsComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Inbound'
                }
            },
            {
                path: 'outbound-referrals',
                component: OutboundReferralsComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Outbound'
                }
            },
            {
                path: 'pending-referrals',
                component: PendingReferralsComponent,
                canActivate: [ValidateActiveSession],
                data: {
                    breadcrumb: 'Pending Referrals'
                }
            }

        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(ReferralsShellRoutes)],
    exports: [RouterModule]
})
export class ReferralShellRoutingModule { }
