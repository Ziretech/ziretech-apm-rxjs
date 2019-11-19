import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable, EMPTY, of } from 'rxjs';

import { catchError, } from 'rxjs/operators';

import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$ = this.productService.products$
  .pipe(catchError(error => {
    this.errorMessage = error;
    return of([]);
  }));

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
      //.subscribe(
      //  error => this.errorMessage = error
      //);
  }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
