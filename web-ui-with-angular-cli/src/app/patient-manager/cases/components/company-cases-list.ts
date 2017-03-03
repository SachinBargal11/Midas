import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStore } from '../../../commons/stores/session-store';
import { ProgressBarService } from '../../../commons/services/progress-bar-service';
import { CasesStore } from '../../cases/stores/case-store';
import { Case } from '../../cases/models/case';

@Component({
    selector: 'company-cases',
    templateUrl: './company-cases-list.html'
})


export class CompanyCasesComponent implements OnInit {
    cases: any[];

    constructor(
        public _route: ActivatedRoute,
        private _router: Router,
        private _sessionStore: SessionStore,
        private _casesStore: CasesStore,
        private _progressBarService: ProgressBarService
    ) {
        this._sessionStore.userCompanyChangeEvent.subscribe(() => {
            this.loadCases();
        });
    }
    ngOnInit() {
        this.loadCases();
    }

    loadCases() {
        this._progressBarService.show();
        this._casesStore.getCasesByCompany()
            .subscribe(cases => {
                this.cases = cases;
            },
            (error) => {
                this._progressBarService.hide();
            },
            () => {
                this._progressBarService.hide();
            });
    }
}