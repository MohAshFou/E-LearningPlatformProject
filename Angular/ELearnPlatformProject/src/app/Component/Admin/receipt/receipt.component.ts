
import { Component, OnInit } from '@angular/core';
// import { ReceiptService } from '../../../Services/Receipt/receipt.service';
import { ReceiptCardComponent } from '../receipt-card/receipt-card.component';
import { CommonModule } from '@angular/common';
import { ReceiptService } from '../../../Services/Admin/receipt-service.service';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [ReceiptCardComponent, CommonModule],
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})

export class ReceiptComponent implements OnInit {
  receipts: any[] = [];  // Initialize the array to an empty state

  constructor(private receiptService: ReceiptService) {}

  ngOnInit() {
    console.log('ReceiptComponent initialized');
    this.fetchReceipts();  // Fetch receipts on initialization
  }

  fetchReceipts() {
    console.log('fetchReceipts method called');
    // this.http.get<any[]>(`https://localhost:7217/api/Admin/unapproved`).subscribe
    this.receiptService.getUnapprovedReceipts().subscribe(

      (data) => {
        console.log('Receipts data:', data);
        if (data && data.length > 0) {
          console.log('Valid data received');
          this.receipts = data;
        } else {
          console.error('No receipts returned from the API');
        }
      },
      (error) => {
        console.error('Failed to fetch receipts', error);
      }
    );
  }

  onSubmitReceipt(receiptData: any) {
    console.log('Receipt submitted:', receiptData);
  }

  onAcceptReceipt(receipt: any) {
    console.log('Receipt accepted:', receipt);
  }

  onRejectReceipt(receipt: any) {
    console.log('Receipt rejected:', receipt);
  }
}

