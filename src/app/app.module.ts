import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BundleComponent } from './main-page/bundle/bundle.component';
import { PizzaBuilderComponent } from './main-page/pizza-builder/pizza-builder.component';
import { PizzaCardComponent } from './main-page/pizza-card/pizza-card.component';
import { ShoppingCartCardComponent } from './main-page/shopping-cart-card/shopping-cart-card.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    BundleComponent,
    PizzaBuilderComponent,
    PizzaCardComponent,
    ShoppingCartCardComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
