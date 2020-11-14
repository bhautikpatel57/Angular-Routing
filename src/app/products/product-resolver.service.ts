import { map, catchError } from 'rxjs/operators';
import { ProductService } from './product.service';
import { ProductResolved } from './product';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<ProductResolved> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved>{ 
    const id = route.paramMap.get('id');
    // do this if "id" is not a number
    if(isNaN(+id)){
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return of ({product: null, error: message })
    }
    // do this if "id" is a number
    return this.productService.getProduct(+id)
    .pipe(
      map(productt => ({product: productt})),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of ({product: null, error: message});
      })
    )
  }
}
