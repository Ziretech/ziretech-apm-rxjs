import { Component, OnDestroy } from '@angular/core';

import { Subscription, Observable, EMPTY, of, combineLatest } from 'rxjs';

import { catchError } from 'rxjs/operators';

import { ProductService } from './product.service';
import { Product } from './product';

import { ProductCategoryService } from '../product-categories/product-category.service';

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

  categories$ = this.categoryService.categories$;

  constructor(private productService: ProductService,
              private categoryService: ProductCategoryService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
