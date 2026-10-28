import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { ProductService }
from '../../business-management/products/services/product.service';

import { ProductResponse }
from '../../business-management/products/models/product-response.model';

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

  product?: ProductResponse;

  isLoading = true;

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    

    this.productService
      .getProductById(id)
      .subscribe({

        next: product => {

          this.product = product;

          this.isLoading = false;

          

        },

        error: () => {

          this.errorMessage =
            'Produkt nicht gefunden.';

          this.isLoading = false;
        }
      });
  }
}