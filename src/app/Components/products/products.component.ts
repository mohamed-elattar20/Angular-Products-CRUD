import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsArr: any;
  constructor(private productServices: ProductService) { }
  ngOnInit(): void {
    this.productServices.getAllproducts().subscribe((response) => this.productsArr = response)
    // console.log(this.productsArr);
  }
  deleteProduct(productId: any) {
    this.productServices.deleteProduct(productId).subscribe((response) => {
      this.productsArr = this.productsArr.filter((product: any) => product.id != productId)
    }
    )
  }
}
