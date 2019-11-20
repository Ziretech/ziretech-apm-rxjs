import { Component, OnDestroy } from '@angular/core';

import { Subscription, Observable, EMPTY, of, combineLatest, BehaviorSubject } from 'rxjs';

import { catchError, tap, map } from 'rxjs/operators';

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

  private selectedCategorySubject = new BehaviorSubject<number>(0);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  products$ = combineLatest([this.productService.categorizedProducts$, this.selectedCategory$])
    .pipe(map(([products, selectedCategoryId]) => {
      return products.filter(product => product.categoryId === selectedCategoryId || selectedCategoryId === 0);
    }))
    .pipe(catchError(error => {
      this.errorMessage = error;
      return of([]);
    }));

  categories$ = this.categoryService.categories$;

  combo$ = combineLatest([this.products$, this.selectedCategory$])
    .subscribe(m => console.log(m));

  constructor(private productService: ProductService,
              private categoryService: ProductCategoryService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.selectedCategorySubject.next(+categoryId);
  }
}
