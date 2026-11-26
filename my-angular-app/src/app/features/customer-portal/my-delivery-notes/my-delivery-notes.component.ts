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

interface MyDeliveryNote {

  deliveryNumber: string;

  orderNumber: string;

  trackingNumber: string;

  createdAt: string;

}

@Component({
  selector: 'app-my-delivery-notes',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './my-delivery-notes.component.html',

  styleUrls: [
    './my-delivery-notes.component.css'
  ]
})
export class MyDeliveryNotesComponent
implements OnInit {

  private readonly http =
    inject(HttpClient);

  private readonly cdr =
  inject(ChangeDetectorRef);

  deliveryNotes:
    MyDeliveryNote[] = [];

  isLoading = true;

  ngOnInit(): void {

    this.loadDeliveryNotes();

  }

  loadDeliveryNotes(): void {

    this.http
      .get<MyDeliveryNote[]>(
        '/api/documents/my-delivery-notes',
        {
          withCredentials: true
        }
      )
      .subscribe({

        next: notes => {

          this.deliveryNotes =
            notes;

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

  downloadDeliveryNote(
    deliveryNumber: string
  ): void {

    window.open(
      `/api/documents/delivery-notes/${deliveryNumber}/pdf`,
      '_blank'
    );

  }

}