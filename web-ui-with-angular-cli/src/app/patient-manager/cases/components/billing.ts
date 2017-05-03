import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'billing',
    templateUrl: './billing.html'
})

export class BillingInfoComponent {

postDialogVisible: boolean = false;
billing: any[] = [{bill:"ab69852", speciality:"AC", visitDate:"03/05/2017",
                   billDate:"03/05/2017", billAmount:"$560", paid:"$560",  
                   outstanding:"0", status:"Paid" },
                   {bill:"ab69851", speciality:"PT", visitDate:"01/05/2017",
                   billDate:"03/05/2017", billAmount:"$560", paid:"$460",  
                   outstanding:"$100", status:"Litgate" }]; 
                   
ngOnInit() {  
   
    }

postCheck(){
 this.postDialogVisible = true;
}

}
