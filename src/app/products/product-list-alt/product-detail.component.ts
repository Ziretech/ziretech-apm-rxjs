import { Component } from '@angular/core';

import { ProductService } from '../product.service';

import { tap, catchError } from 'rxjs/operators';
import { Subject, EMPTY } from 'rxjs';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  selectedProduct$ = this.productService.selectedProduct$
    .pipe(catchError(error => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    }));

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private productService: ProductService) { }

}
