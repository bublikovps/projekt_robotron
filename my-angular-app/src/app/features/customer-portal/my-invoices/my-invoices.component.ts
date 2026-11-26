import {
  Component,
  OnInit,
  ChangeDetectorRef,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  HttpClient
} from '@angular/common/http';



interface MyInvoice {

  invoiceNumber: string;

  orderNumber: string;

  totalGross: number;

  createdAt: string;

}

@Component({
  selector: 'app-my-invoices',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './my-invoices.component.html',

  styleUrls: [
    './my-invoices.component.css'
  ]
})
export class MyInvoicesComponent
implements OnInit {

  private readonly http =
    inject(HttpClient);

  private readonly cdr =
  inject(ChangeDetectorRef);

  invoices: MyInvoice[] = [];

  isLoading = true;

  ngOnInit(): void {

    this.loadInvoices();

  }

  loadInvoices(): void {

    this.http
      .get<MyInvoice[]>(
        '/api/documents/my-invoices',
        {
          withCredentials: true
        }
      )
      .subscribe({

        next: invoices => {

          this.invoices =
            invoices;

          this.isLoading =
            false;

          this.cdr.detectChanges();

        },

        error: error => {

          console.error(error);

          this.isLoading =
            false;

          this.cdr.detectChanges();

        }

      });

  }

  downloadInvoice(
    invoiceNumber: string
  ): void {

    window.open(
      `/api/documents/invoices/${invoiceNumber}/pdf`,
      '_blank'
    );

  }

}