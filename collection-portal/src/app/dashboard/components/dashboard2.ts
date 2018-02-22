import { Component } from '@angular/core';
// import { AmChartsService } from "amcharts3-angular2";


@Component({
    selector: 'dashboard2',
    templateUrl: './dashboard2.html',
})

export class Dashboard2Component {
    clientReports: any[];
    clientSettlements: any[];
    withdrawnCases: any[];
    clientNewCases: any[];
    private timer: any;
    private chart: any;
    private chart1: any;
    private chartDetail: any;
    users: any;
    doctors: any;
    providers: any;
    medicalfacilities: any;
    constructor(
        // private AmCharts: AmChartsService
    ) {

    }
    ngOnInit() {
        this.clientReports = [
            {
                name: 'ABC at Medical Provider 1',
                address: '300 Community Driv',
                billing: 4,
                balance: '$0.00'
            },
            {
                name: 'XYZ at Medical Provider 2',
                address: '101 Andrew Stree',
                billing: 4,
                balance: '$0.00'
            },
            {
                name: 'PQR at Medical Provider 3',
                address: '900 Franklin Avenue',
                billing: 4,
                balance: '$0.00'
            }
        ]
        this.clientSettlements = [
            {
                month: 7,
                year: 2012,
                countOfCases: 39,
                sumOfOpenClaim: '$145,338.31',
                sumOfSettlementPrincipal: '$145,338.32',
                sumOfSettlementInterest: '$2,038.79',
                percentage: '63.53%'
            },
            {
                month: 6,
                year: 2012,
                countOfCases: 56,
                sumOfOpenClaim: '$140,943.04',
                sumOfSettlementPrincipal: '$114,614.56',
                sumOfSettlementInterest: '$2,611.32',
                percentage: '83.17%'
            },
            {
                month: 5,
                year: 2012,
                countOfCases: 72,
                sumOfOpenClaim: '$269,712.65',
                sumOfSettlementPrincipal: '$215,844.40',
                sumOfSettlementInterest: '$1,406.95',
                percentage: '80.55%'
            }
        ]
        this.withdrawnCases = [
            {
                month: 7,
                year: 2012,
                countOfCases: 2,
                sumOfOpenClaimAmount: '$429.89',
                sumOfBalance: '$429.89',
                sumOfSettlementPrincipal: '$0.00',
                percentage: '0.00%'
            },
            {
                month: 6,
                year: 2012,
                countOfCases: 3,
                sumOfOpenClaimAmount: '$93,731.88',
                sumOfBalance: '$92,074.95',
                sumOfSettlementPrincipal: '$0.00',
                percentage: '0.00%'
            },
            {
                month: 5,
                year: 2012,
                countOfCases: 6,
                sumOfOpenClaimAmount: '$13,167.54',
                sumOfBalance: '$5,116.90',
                sumOfSettlementPrincipal: '$0.00',
                percentage: '0.00%'
            }
        ]
        this.clientNewCases = [
            {
                initialStatus: 'ARB',
                month: 7,
                year: 2012,
                countOfCases: 27,
                sumOfOpenClaim: '$668,270.27'
            },
            {
                initialStatus: 'ARB',
                month: 7,
                year: 2012,
                countOfCases: 1,
                sumOfOpenClaim: '$600.87'
            },
            {
                initialStatus: 'ARB',
                month: 6,
                year: 2012,
                countOfCases: 119,
                sumOfOpenClaim: '$1,648,619.75'
            }
        ]
    }
}
