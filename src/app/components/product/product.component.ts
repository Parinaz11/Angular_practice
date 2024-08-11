import { Component, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { PricePipe } from '../../pipes/price.pipe';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, ConfirmPopupModule, PricePipe, TruncateNamePipe],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
})
export class ProductComponent {


  constructor(private confirmationService: ConfirmationService) {}

  @ViewChild('deleteButton') deleteButton: any;

  // This property is marked as an input, meaning it can receive data from a parent component.
  // The exclamation mark (!) indicates that this property will be initialized later (non-null assertion) 
  @Input() product!: Product;
  // @Output() productOutput: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>(); // instead of the top output
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  // truncateName(name: String){
  //   if (name.length > 16) {
  //     return name.slice(0, 16) + '...';
  //   }
  //   return name;
  // }

  editProduct() {
    this.edit.emit(this.product);
  }

  confirmDelete() {
    console.log("Here1");
    this.confirmationService.confirm({
        target: this.deleteButton.nativeElement,
        message: 'Are you sure you want to delete this product?',
        accept: () => {
            this.deleteProduct();
        },
    });
    console.log("Here2");
  }


  deleteProduct() {
    this.delete.emit(this.product);
  }

  ngOnInit() {
    // This line emits the current product to the parent component as soon as the ProductComponent is initialized.
    // This allows the parent to receive the product data immediately.
    // this.productOutput.emit(this.product);
  }
}

