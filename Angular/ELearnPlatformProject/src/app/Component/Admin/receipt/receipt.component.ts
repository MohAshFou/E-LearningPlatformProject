
import { Component, OnInit } from '@angular/core';
// import { ReceiptService } from '../../../Services/Receipt/receipt.service';
import { ReceiptCardComponent } from '../receipt-card/receipt-card.component';
import { CommonModule } from '@angular/common';
import { ReceiptService } from '../../../Services/Admin/receipt-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [ReceiptCardComponent, CommonModule],
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})

export class ReceiptComponent implements OnInit {
  receipts: any[] = [];


  constructor(private receiptService: ReceiptService, private router: Router) {}

  ngOnInit() {
    console.log('ReceiptComponent initialized');
    this.fetchReceipts();
  }

  fetchReceipts() {
    console.log('fetchReceipts method called');
    // this.http.get<any[]>(`https://localhost:7217/api/Admin/unapproved`).subscribe
    this.receiptService.getUnapprovedReceipts().subscribe(

      (data) => {

        if (data && data.length > 0) {

          this.receipts = data;
          console.log( this.receipts);
        } else {
          console.error('No receipts returned from the API');
        }
      },
      (error) => {
        console.error('Failed to fetch receipts', error);
      }
    );
  }

  // onSubmitReceipt(receiptData: any) {
  //   console.log('Receipt submitted:', receiptData);
  // }

  // onAcceptReceipt(receipt: any) {
  //   console.log('Receipt accepted:', receipt);
  // }

  // onRejectReceipt(receipt: any) {
  //   console.log('Receipt rejected:', receipt);
  // }

  viewReceiptDetails(receipt: any){

    this.receiptService.SetAlldetails(receipt)
    this.router.navigate(["admin/Receipt/"+ receipt.receiptId])
  }
}





