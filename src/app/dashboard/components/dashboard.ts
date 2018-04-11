import { Component } from '@angular/core';


@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
})

export class DashboardComponent {
    users: any;
    doctors: any;
    providers: any;
    medicalfacilities: any;
    constructor(
    ) {


    }

    /*displayResponseOnPage(successful, mesg, response) {
        if (!successful) { // On error
            document.getElementById('response').innerHTML = 'Failed: ' + mesg;
            return;
        }
        if (successful && mesg != null && mesg.toLowerCase().indexOf('user cancel') >= 0) { // User cancelled.
            document.getElementById('response').innerHTML = 'User cancelled';
            return;
        }
        document.getElementById('response').innerHTML = (<any>window).scanner.getSaveResponse(response);
    }

    scanToLocalDisk() {
        /*
        scanner.listSources((isSuccessful, message, result) =>
            {
                if(isSuccessful)
                {
                    console.log(result);
                }
                else
                {
                    console.error(message);
                }
            }, false, "all", true, true);
            
        (<any>window).scanner.scan(this.displayResponseOnPage,
            {
                'output_settings': [
                    {
                        'type': 'save',
                        'format': 'pdf',
                        'save_path': '${TMP}\\${TMS}${EXT}'
                    }
                ]
            }
        );
    }*/

}
