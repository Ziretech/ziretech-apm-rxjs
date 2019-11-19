import { Component, OnDestroy } from '@angular/core';

import { Subscription, Observable, EMPTY, of, combineLatest } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$ = this.productService.categorizedProducts$    
    .pipe(catchError(error => {
      this.errorMessage = error;
      return of([]);
    }));

  constructor(private productService: ProductService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
