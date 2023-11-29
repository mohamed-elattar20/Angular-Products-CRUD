import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-product-detailes',
  templateUrl: './product-detailes.component.html',
  styleUrls: ['./product-detailes.component.css']
})
export class ProductDetailesComponent implements OnInit {
  product: any
  productId !: string | null;
  constructor(private activatedRoute: ActivatedRoute, private productServices: ProductService) { }
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get("id")
    this.productServices.getProductById(this.productId).subscribe((response) => this.product = response
    )
  }
}
