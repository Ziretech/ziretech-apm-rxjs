import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription, Observable, EMPTY, of } from 'rxjs';

import { catchError, map } from 'rxjs/operators';

import { ProductService } from './product.service';
import { Product } from './product';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  errorMessage = '';
  categories;

  products$ = this.productService.products$
    .pipe(map((products: Product[]) => products.map(prod => ({...prod, price: prod.price * 1.5})) ))
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
