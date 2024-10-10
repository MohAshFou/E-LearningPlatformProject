
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { ReceiptService } from '../../../Services/Receipt/receipt.service';
import { HttpClient } from '@angular/common/http';
import { ReceiptService } from '../../../Services/Admin/receipt-service.service';

@Component({
  selector: 'app-receipt-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './receipt-card.component.html',
  styleUrls: ['./receipt-card.component.css']
})


export class ReceiptCardComponent {

  constructor(private receiptService: ReceiptService, private http: HttpClient) {
    this.receiptId= 1
  }

  @Input() receipt: any = {};

  studentName: string = '';
  gradeLevel: string = '';
  title: string = '';
  feeAmount: number = 0;
  receiptImageLink: string = '';
  receiptId: number = 1;

enrollmentID= 0;

  ngOnInit() {
    console.log('test');
    if (this.receipt) {

      // Map the receipt properties to the component properties
      this.studentName = this.receipt.name   || '';
      this.gradeLevel = this.receipt.gradeLevel || '';
      this.title = this.receipt.title || '';
      this.feeAmount = this.receipt.feeAmount || 0;
      this.receiptImageLink = this.receipt.receiptImageLink || '';
      this.receiptId = this.receipt.receiptId || 1;
      this.enrollmentID = this.receipt.enrollmentID
    }
  }
 state =''
  acceptReceipt: boolean = false;
  rejectReceipt: boolean = false;

  onCheckboxChange(type: string) {
    if (type === 'accept') {
      this.state='accept'
      this.rejectReceipt = false;
    } else if (type === 'reject') {
      this.state='reject'
      this.acceptReceipt = false;
    }
  }

  submitReceiptStatus(e:number , i:number) {
    if (this.acceptReceipt && this.rejectReceipt) {
      alert("You can't accept and reject at the same time!");
      return;
    }

    this.receiptService.UpdateReceipt(e,i,this.state).subscribe({
      next: (d) => {

      },
      error: (e: any) => {

      }
    });


  }
  }

