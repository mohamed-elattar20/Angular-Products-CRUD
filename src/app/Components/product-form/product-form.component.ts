import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productId: any
  product: any
  constructor(private productServices: ProductService, private router: Router, private activatdRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.productId = this.activatdRoute.snapshot.paramMap.get("id")
    if (this.productId != 0) {
      this.productServices.getProductById(this.productId).subscribe((response) => {
        this.product = response
        this.getProductName.setValue(this.product?.productName)
        this.getProductPrice.setValue(this.product?.productPrice)
        this.getProductQuantity.setValue(this.product?.productQuantity)
      })
    }
  }
  // Validation Start
  ProductForm = new FormGroup({
    productName: new FormControl("", [Validators.required, Validators.minLength(5)]),
    productPrice: new FormControl("", [Validators.required, Validators.min(10)]),
    productQuantity: new FormControl("", [Validators.required, Validators.min(1)]),
  })

  get getProductName() {
    return this.ProductForm.controls['productName'];
  }
  get getProductPrice() {
    return this.ProductForm.controls['productPrice'];
  }
  get getProductQuantity() {
    return this.ProductForm.controls['productQuantity'];
  }
  handleForm(event: Event) {
    event.preventDefault()
    if (this.ProductForm.status == "VALID") {
      if (this.productId == 0) {
        // console.log(this.ProductForm.value);
        this.productServices.addProduct(this.ProductForm.value).subscribe(() => {
          this.router.navigate(['/products'])
          // this.ProductForm.reset()
        })
      } else {
        this.productServices.editProduct(this.productId, this.ProductForm.value).subscribe(() => this.router.navigate(['/products']))
      }
    } else {
      console.log(`Errors`);
    }
  }
  // Validation End
}
