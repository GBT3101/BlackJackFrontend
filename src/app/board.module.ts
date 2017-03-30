import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BoardComponent }  from './board.component';
import {CardComponent} from "./card.component";
import {CardsListComponent} from "./cards-list.component";
import {HttpModule} from "@angular/http";

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ BoardComponent, CardComponent, CardsListComponent ],
  bootstrap:    [ BoardComponent ]
})
export class BoardModule { }
