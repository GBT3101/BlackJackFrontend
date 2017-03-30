import { Component, Input } from '@angular/core';
import { CardComponent } from './card.component';

// For loop to render all cards inside cards
@Component({
  selector: 'cards-list',
  template: `
             <div class="cards-list">
               <div *ngFor="let cardObject of cards"> 
                  <card [cardObject]="cardObject"></card>
               </div>
             </div>`
})

export class CardsListComponent  {
  @Input() cards: Array<CardComponent>;
}