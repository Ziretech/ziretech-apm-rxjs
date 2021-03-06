import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, combineLatest, Subject } from 'rxjs';
import { catchError, tap, map, shareReplay } from 'rxjs/operators';

import { Product } from './product';
import { Supplier } from '../suppliers/supplier';
import { SupplierService } from '../suppliers/supplier.service';
import { ProductCategoryService } from '../product-categories/product-category.service';
import { ProductCategory } from '../product-category/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  private suppliersUrl = this.supplierService.suppliersUrl;

  products$: Observable<Product[]> = this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(data => console.log('Products: ', JSON.stringify(data))),
        catchError(this.handleError)
      );

  categorizedProducts$: Observable<ProductCategory[]> = combineLatest([this.products$, this.categoryService.categories$])
    .pipe(
      map(([products, categories]) => products.map(prod => (
        {
          ...prod, 
          price: prod.price * 1.5,
          category: categories.find(c => c.id === prod.categoryId).name})) ),
      shareReplay(1)
    );

  private selectedProductIdSubject = new Subject<number>();
  selectedProductId$ = this.selectedProductIdSubject.asObservable();

  selectedProduct$ = combineLatest([this.categorizedProducts$, this.selectedProductId$])
    .pipe(map(([products, selectedId]) => products.find(product => product.id === selectedId)));

  constructor(private http: HttpClient,
              private categoryService: ProductCategoryService,
              private supplierService: SupplierService) { }

  selectProduct(id) {
    this.selectedProductIdSubject.next(id);
  }

  private fakeProduct() {
    return {
      id: 42,
      productName: 'Another One',
      productCode: 'TBX-0042',
      description: 'Our new product',
      price: 8.9,
      categoryId: 3,
      category: 'Toolbox',
      quantityInStock: 30
    };
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
