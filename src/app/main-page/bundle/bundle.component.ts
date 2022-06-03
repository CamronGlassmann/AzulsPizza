import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { PREMADES } from 'src/app/premadePizzaList';
import { Pizza } from 'src/app/pizza';
import { OTHERMENU } from 'src/app/OtherMenuItems';
import { from } from 'rxjs';
import {MatSelectModule} from '@angular/material/select';
@Component({
  selector: 'app-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.css']
})
export class BundleComponent implements OnInit {
  tempPizza: Pizza = {id: 0, name:'',toppings: [], cheese :'',sauce: ''
   ,crust:'', img: '', price: 0, desciption:'',fanFav : false};
  tempPizzaDoubleList: Pizza[] = [];

  
  tempPizzaList: Pizza[] = PREMADES;
  toppings: string[] = ["Pepperoni", "Bacon", "Italian Sausage", "Meatball", "Ham", "Beef", "Pork", 
  "Chicken", 'Black Olives', 'Green Olives', 'Pineapple', 'Onions', 'Mushroom', 'BananaPeppers', 'GreenPeppers', 'Jalapenos'];
  
  otherMenu: any[] = OTHERMENU;
  
  pricedOut: number = 0;
  tempPizzaId: number = 0;
  updatedPizzaPopPriceId: number = 0;

  tempPizzaDouble1Id: number = 0;
  tempPizzaDouble2Id: number = 0;
  pricedOutDouble: number = 0;
  doublePopChoice: string = "";
  updatedDoublePriceId: number = 0;

  updatedSinglePriceId: number = 0;
  pricedOutSingleTopping: number = 0;
  toppingChoice: string = "Pepperoni";

    constructor(private shopSer: ShoppingCartService) { }
  
    ngOnInit(): void {
      this.pricedOut = +this.tempPizzaList[0].price + +this.otherMenu[0].price;
      this.tempPizza = this.tempPizzaList[0];
      this.tempPizzaDoubleList[0] = this.tempPizzaList[0]
      this.tempPizzaDoubleList[1] = this.tempPizzaList[0]
      this.pricedOutDouble = this.tempPizzaDoubleList[0].price + this.tempPizzaDoubleList[1].price;
      this.pricedOutSingleTopping = 10;
    }

    ngOnChanges(){}
    
    //Pizza and Pop
    updatePizza(){
      this.tempPizza = this.tempPizzaList[this.tempPizzaId];
      this.pricedOut = +this.otherMenu[this.tempPizzaId].price + +this.tempPizza.price;
    }

    updatePrice(){
      this.pricedOut = +this.otherMenu[this.updatedPizzaPopPriceId].price + +this.tempPizza.price;
    }

    addPizzaPop(){
      var desciption: string = this.tempPizza.name + ", " + this.otherMenu[this.updatedPizzaPopPriceId].name;
      this.shopSer.addItem({desciption: desciption , price: this.pricedOut, name: "Pizza Pop Bundle: "});
    }

    //Double Pizza Card
    updateDoublePrice(){
      this.pricedOut = +this.otherMenu[this.updatedDoublePriceId].price + +this.tempPizza.price;
    }

    updatePizzaDouble(){
      this.tempPizzaDoubleList[0] = this.tempPizzaList[this.tempPizzaDouble1Id];
      this.tempPizzaDoubleList[1] = this.tempPizzaList[this.tempPizzaDouble2Id];
      this.doublePopChoice = this.otherMenu[this.updatedDoublePriceId].name;
      if(this.tempPizzaDoubleList.length = 2){
        this.pricedOutDouble = +this.otherMenu[this.updatedDoublePriceId].price + +this.tempPizzaDoubleList[0].price + +this.tempPizzaDoubleList[1].price - 2;
      }
      else{
      this.pricedOutDouble = +this.otherMenu[this.updatedDoublePriceId].price + +this.tempPizzaDoubleList[0].price + +this.tempPizzaDoubleList[1].price;
      }
    }

    addDoublePizza(){
      var desciption: string = "Pizzas: " + this.tempPizzaDoubleList[0].name + ", " + this.tempPizzaDoubleList[1].name + ", " + "Beverage: " +  this.otherMenu[this.updatedDoublePriceId].name;
      this.shopSer.addItem({desciption: desciption , price: this.pricedOutDouble, name: "2x Pizza Bundle: "});
    }

    //Single Topping Card
    updatePizzaTopping(){

    }

    updateSingleToppingPrice(){
      console.log(this.updatedSinglePriceId)
      if(this.updatedSinglePriceId == 100){
        this.pricedOutSingleTopping = 10;
      }
      else{
      this.pricedOutSingleTopping = +this.otherMenu[this.updatedSinglePriceId].price + 10;
      }
      return this.pricedOutSingleTopping
    }

    addSingleToppingPizza(){
      var desciption: string = "Cheese Pizza with " + this.toppingChoice + " added, " +  "Beverage: " + this.otherMenu[this.updatedSinglePriceId].name;
      this.shopSer.addItem({desciption: desciption , price: this.pricedOutSingleTopping, name: "Single Topping Pizza: "});
    }
  }
