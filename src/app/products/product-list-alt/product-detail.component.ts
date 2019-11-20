import { Component } from '@angular/core';

import { ProductService } from '../product.service';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  pageTitle = 'Product Detail';
  errorMessage = '';
  selectedProduct$ = this.productService.selectedProduct$
    .pipe(tap(m => console.log(m)));

  constructor(private productService: ProductService) { }

}
