import { Injectable, EventEmitter } from '@angular/core';
import {Pizza} from './pizza'

@Injectable({
  providedIn: 'root'
})

// to inject service into a component 
//import {ShoppingCartService} from './shopping-cart.service'
//and add it as a providers[ShoppingCartService] in the component section
// constructor(private serShopping: ShoppingCartService) { }
//then you can call the service methods
export class ShoppingCartService {
  shoppingCartList: any[]=[];
  total: number =0.00;
  constructor() { }
  TotalUpdater = new EventEmitter<number>();

  getCartList(){
    return this.shoppingCartList;
  }
  getCartLengh(){
    return this.shoppingCartList.length;
  }
  addItem(newAny:any){
    this.shoppingCartList.push(newAny);
    console.log(this.getCartList());
    this.total = this.total+ newAny.price;
    this.total = (this.total+ (newAny.price*.07));
    this.TotalUpdater.emit(this.total);
  }
 
  removeItem(remItem:any){
    const index = this.shoppingCartList.indexOf(remItem, 0);
      if (index > -1) {
        this.shoppingCartList.splice(index, 1);
        this.total = this.total - remItem.price;
        this.total = (this.total - (remItem.price*.07));
        this.TotalUpdater.emit(this.total);
    }
  }
      
  resetCart(){
    this.shoppingCartList = [];
    this.TotalUpdater.emit(this.total = 0);
  }
}
