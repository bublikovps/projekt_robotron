import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { CatalogService }
from '../services/catalog.service';

import { CatalogProductResponse }
from '../models/catalog-product-response.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent
implements OnInit {

  product?: CatalogProductResponse;

  isLoading = true;

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.catalogService
      .getProductById(id)
      .subscribe({

        next: product => {


        this.product = product;

        this.isLoading = false;

      },

        error: err => {

          this.errorMessage =
            'Produkt nicht gefunden.';

          this.isLoading = false;
        }
      });
  }
}