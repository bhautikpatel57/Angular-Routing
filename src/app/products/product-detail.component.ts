import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  // constructor(private productService: ProductService, private route: ActivatedRoute) {
  //  }

  // ProductResolved is a type
  constructor(private route: ActivatedRoute) {
    const resData: ProductResolved = this.route.snapshot.data['resolvedData'];
    this.errorMessage = resData.error;
    this.onProductRetrieved(resData.product);
  }

  ngOnInit(){
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.getProduct(id);

  }

  // getProduct(id: number): void {
  //   this.productService.getProduct(id).subscribe({
  //     next: product => this.onProductRetrieved(product),
  //     error: err => this.errorMessage = err
  //   });
  // }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
