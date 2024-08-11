import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { ProductsService } from '../services/products.service';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor (
    // anything that is initialized before loading the component
    private productService: ProductsService
  ) { }

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id){
      return;
    }
    this.deleteProduct(product.id);
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0
  };

  onConfirmEdit(product: Product) {
    // this.editProduct(product, this.selectedProduct.id ?? 0); // If it exists, otherwise zero
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  // Everytime we change the page an event is emmited to this custom function and we can fetch the page and number of rows per page
  // And then change it based on them
  onPageChange(event: any){
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator(){
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number) {
    // this.productService.getProducts('http://localhost:3000/clothes', {page, perPage}).subscribe((products: Products) => {
    //   this.products = products.items;
    //   this.totalRecords = products.total; // total amount of products based on the backend response
    //   console.log(products.items)
    // })

    this.productService.getProducts('http://localhost:3000/clothes', {page, perPage}).subscribe({
      next: (data: Products) => {
        this.products = data.items;
        this.totalRecords = data.total;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editProduct(product: Product, id: number) {
    console.log(product, 'Edit');
    this.productService.editProduct('http://localhost:3000/clothes/${id}', product).subscribe(
      {
        next: (data) => {
          console.log(data)
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => console.log(error)
      }
      
    );
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct('http://localhost:3000/clothes/${id}').subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  addProduct(product: Product) {
    console.log(product, 'Add');
    this.productService.addProduct('http://localhost:3000/clothes', product).subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  // When the component is first initialized, this method is called
  // The URL we envoked to communicate with the endpoint that we created on the backend
  ngOnInit(){
    this.fetchProducts(0, this.rows);
    this.resetPaginator(); 
  }
}

