import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from'../../shopping-cart.service';
import {PREMADES} from '../../premadePizzaList'
import {Pizza} from '../../pizza'
import { MatButtonToggleModule, MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatFormFieldControl } from '@angular/material/form-field';


@Component({
  selector: 'app-shopping-cart-card',
  templateUrl: './shopping-cart-card.component.html',
  styleUrls: ['./shopping-cart-card.component.css'],
  
})
export class ShoppingCartCardComponent implements OnInit {
  cartList: any[]= [];
  testaddItem:Pizza []= PREMADES;
  subtotal:number=0.00;
  tax:number=0.00;
  total:number=0.00;
  displayNoPizza: boolean = true;
  displayPizza: boolean = true;
  displayCheckout: boolean = false;
  cashOrCard: string = "";
  deliveryOrPickup: string = "";
  delivery: boolean = false;
  address: string = "";
  city: string = "";
  state: string = "";
  zip: string = "";
  done: boolean = false;

  constructor(private cartListService:ShoppingCartService) { }

  ngOnInit(): void {
    this.cartList = this.cartListService.getCartList();
   this.cartLengh();
    for(let l=0;l<this.cartList.length;l++){ //gernerating subtotals
      this.AddToTotal(this.cartList[l].price);
    }
  }
  cartLengh(){
    if (this.cartList.length < 1){
      this.displayNoPizza = false;
     }
     else{
       this.displayNoPizza = true
     }
  }
  AddToTotal(newNum:number){
    (this.subtotal = this.subtotal + newNum);
    (this.tax += newNum * .07);
    this.total= this.tax + this.subtotal;
  }
  removeItem(remItem:any){
    this.subtotal = this.subtotal - remItem.price;
    this.total = this.total - remItem.price;
    this.cartListService.removeItem(remItem);
    this.total = this.total -(remItem.price * .07);
    this.tax = this.tax - (remItem.price * .07);
    
    this.cartLengh();

  }
  checkout(){
    this.displayPizza = false;
    this.displayCheckout = true;
  }

  submit(){
    if(this.cashOrCard.length == 0 || this.deliveryOrPickup.length == 0){
      alert("Error: one of the information fields is empty")
    }
    else if(this.deliveryOrPickup.startsWith('D')){    
      this.delivery = true;
    }
    else{
      this.reset()
    }
  }
  submitDel(){
   
    if (this.address != '' && this.city != ''&& this.state != '' && this.zip != ''){
      this.reset(); //checks to see if field are empty
    }else
    {
      alert("Error: one of the delivery information field is empty")
    }
    
  }
  reset(){
    if(this.deliveryOrPickup.startsWith('D')){
    alert("Thank you for your purchase, your pizza will be delivered in about 45 minutes")
    }
    else{
      alert("Thank you for your purchase, your pizza will be ready for pickup in about 15 minutes")
    }
    this.cartList = []
    this.cartListService.resetCart();
    this.displayPizza =true;
    this.displayCheckout =false;
    this.delivery =false;
    this.subtotal = 0.00;
      this.tax = 0.00;
      this.total = 0.00;
    this.address ='';
    this.city = '';
    this.state  ='';
    this.zip ='';
  }
}
