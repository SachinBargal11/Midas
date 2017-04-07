import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET } from '@angular/router';
import 'rxjs/add/operator/filter';
import { SessionStore } from '../../stores/session-store';

interface IBreadcrumb {
    label: string;
    params: Params;
    url: string;
}

@Component({
    selector: 'breadcrumb',
    template: `
    <ol class="breadcrumb">
      <!--<li><a routerLink="" class="">Home</a></li>
      <li><a (click)="home()" class="">Home</a></li>
      <li *ngIf="!doctorRole"><a routerLink="" class="">Home</a></li>
      <li *ngIf="doctorRole"><a [routerLink]="['/doctor-manager/doctor-appointment']" class="">Home</a></li>-->
      <li><a [routerLink]="['/patient-manager']" class="">Home</a></li>
      <li *ngFor="let breadcrumb of breadcrumbs">
        <a [routerLink]="[breadcrumb.url]">{{breadcrumb.label}}</a>
      </li>
    </ol>
  `
})
export class BreadcrumbComponent implements OnInit {
    doctorRole = false;

    public breadcrumbs: IBreadcrumb[];

    /**
     * @class DetailComponent
     * @constructor
     */
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _sessionStore: SessionStore
    ) {
        this.breadcrumbs = [];
    }

    home() {
        let roles = this._sessionStore.session.user.roles;
        if (roles) {
            roles.forEach(role => {
                if (role.roleType === 3) {
                    this.doctorRole = true;
                }
            });
        }
        if (this.doctorRole) {
            this.router.navigate(['/doctor-manager/doctor-appointment']);
        } else {
            this.router.navigate(['/dashboard']);
        }
    }

    /**
     * Let's go!
     *
     * @class DetailComponent
     * @method ngOnInit
     */
    ngOnInit() {
        let roles = this._sessionStore.session.user.roles;
        if (roles) {
            roles.forEach(role => {
                if (role.roleType === 3) {
                    this.doctorRole = true;
                }
            });
        }
        // const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';

        //subscribe to the NavigationEnd event
        this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
            //set breadcrumbs
            let root: ActivatedRoute = this.activatedRoute.root;
            this.breadcrumbs = this.getBreadcrumbs(root);
        });
    }

    /**
     * Returns array of IBreadcrumb objects that represent the breadcrumb
     *
     * @class DetailComponent
     * @method getBreadcrumbs
     * @param {ActivateRoute} route
     * @param {string} url
     * @param {IBreadcrumb[]} breadcrumbs
     */
    private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        const ROUTE_DATA_BREADCRUMB: string = 'breadcrumb';
        const ROUTE_DATA_URL: string = 'shell';

        //get the child routes
        let children: ActivatedRoute[] = route.children;

        //return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }

        //iterate over each children
        for (let child of children) {
            //verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            //verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                continue;
            }

            //get the route's URL segment
            let routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

            //append route URL to URL
            url += `/${routeURL}`;

            //add breadcrumb
            let shell = child.snapshot.data[ROUTE_DATA_URL];
            if ((Object.keys(child.snapshot.params).length !== 0 && shell === true) || shell === true) {
                if (null != url && url.length > 0) {
                    let endIndex = url.lastIndexOf('/');
                    if (endIndex !== -1) {
                        let newstr = url.substring(0, endIndex);
                        let breadcrumb: IBreadcrumb = {
                            label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                            params: child.snapshot.params,
                            url: newstr
                        };
                        if (breadcrumb.label !== 'root') {
                            breadcrumbs.push(breadcrumb);
                        }
                    }
                }
            } else {
                let breadcrumb: IBreadcrumb = {
                    label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                    params: child.snapshot.params,
                    url: url
                };
                if (breadcrumb.label !== 'root') {
                    breadcrumbs.push(breadcrumb);
                }
            }
            //

            // let breadcrumb: IBreadcrumb = {
            //     label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
            //     params: child.snapshot.params,
            //     url: url
            // };

            //recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }
    }

}