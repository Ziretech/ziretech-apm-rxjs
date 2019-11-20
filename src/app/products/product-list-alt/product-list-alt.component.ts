import { Component } from '@angular/core';

import { Subscription, EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list-alt.component.html'
})
export class ProductListAltComponent {
  pageTitle = 'Products';
  errorMessage = '';
  
  products$ = this.productService.categorizedProducts$
    .pipe(catchError(error => {
      this.errorMessage = error;
      return EMPTY;
    }));

  constructor(private productService: ProductService) { }

  onSelected(productId: number): void {
    console.log('Not yet implemented');
  }
}
