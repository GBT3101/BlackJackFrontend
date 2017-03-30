import { Component, Input } from '@angular/core';
import {Card} from "./card";

//every card should have his strength and image
@Component({
  selector: 'card',
  template: `<div *ngIf="cardObject" style="padding-right: 10px" class="card-container"> 
                <img width="100px" height="150px" src="{{cardObject.path}}" alt="" />
             </div>`
})

export class CardComponent  {
  @Input() cardObject: Card;
}