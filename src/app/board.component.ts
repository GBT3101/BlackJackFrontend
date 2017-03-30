import { Component, NgZone, ApplicationRef } from '@angular/core';
import {Deck} from "./deck";
import {Card} from "./card";
import {Http} from "@angular/http";

@Component({
  selector: 'game-board',
  template: `
<div class="board">
    <div class="hand">
        <div class="name-label">Dealer: {{calculateHandStrength(dealerHand)}}</div>
        <cards-list [cards]="dealerHand"></cards-list>
    </div>
    <div class="hand">
        <div class="name-label">You: {{calculateHandStrength(yourHand)}}</div>
        <cards-list [cards]="yourHand"></cards-list>
    </div>
</div>
<div class="actions-container">
    <button (click)="requestCard()" class="action">Hit Me!</button>
    <div class="ending-message">{{endingText}}</div>
    <button (click)="submitHand()" class="action">Submit Hand</button>
</div>
`
})

export class BoardComponent  {
  public dealerHand: Array<Card>;
  public yourHand: Array<Card>;
  public endingText: string;
  private gameDeck: Deck;
  private gameGoes: boolean;
  private local: boolean;

  constructor(private http: Http) {
    this.local = false;
    this.init();
  }

  private drawCard(): Card {
    return this.gameDeck.drawCard();
  }

  private drawCardFromServer(): Promise<Card> {
    return Promise.resolve(this.gameDeck.drawCardFromServer(this.http));
  }

  public requestCard() {
    if(this.gameGoes) {
      if(this.local) {
        this.drawCardForYouLocal();
      } else {
        this.drawCardForYouServer();
      }
    } else {
      this.init();
    }
  }

  private drawCardForYouServer() {
    this.drawCardFromServer().then(drawnCard => {
      this.yourHand.push(drawnCard);
      if (this.calculateHandStrength(this.yourHand) >= 21) {
        this.submitHand();
      }
    }).catch(this.handleError);
  }

  private drawCardForYouLocal() {
    this.yourHand.push(this.drawCard());
    if (this.calculateHandStrength(this.yourHand) >= 21) {
      this.submitHand();
    }
  }

  public drawCardForDealer() {
    if(this.local) {
      this.drawCardForDealerLocal();
    } else {
      this.drawCardForDealerServer();
    }
  }

  private drawCardForDealerServer() {
    this.drawCardFromServer().then(drawnCard => this.dealerHand.push(drawnCard));
  }

  private drawCardForDealerLocal() {
    this.dealerHand.push(this.drawCard());
  }

  private submitHand() {
    if(this.gameGoes) {
      this.dealerMakePlay();
      this.didYouWin();
    } else {
      this.init();
    }
  }

  private dealerMakePlay() {
    // when local:
    let stillPlay : boolean = true;
    this.drawCardForDealerLocal();
    while(stillPlay) {
      if (this.checkIfDealerShouldDrawMoreCard()) {
        this.drawCardForDealerLocal();
           if(this.calculateHandStrength(this.dealerHand) > this.calculateHandStrength(this.yourHand)) {
             stillPlay = false;
           }
      } else {
        stillPlay = false;
      }
    }
  }

  private didYouWin() {
    this.gameGoes = false;
    if(this.calculateHandStrength(this.dealerHand) <= 21 && this.calculateHandStrength(this.yourHand) <= 21){
      if(this.calculateHandStrength(this.dealerHand) >= this.calculateHandStrength(this.yourHand)) {
        this.endingText = 'Dealer just won your kids.\n with tears, you asked for another match';
        this.http.post('http://localhost:3100/postWinner', {winner: 'dealer'}).toPromise();
      } else {
        this.endingText = 'You won! But this feeling made you obsessed, your wife left you because of this addiction.';
        this.http.post('http://localhost:3100/postWinner', {winner: 'player'}).toPromise();
      }
    } else {
      if(this.calculateHandStrength(this.yourHand) > 21) {
        this.endingText = 'You just lost your house because your ego writes checks YOUR BODY CANT AFFORD!';
        this.http.post('http://localhost:3100/postWinner', {winner: 'dealer'}).toPromise();
      } else {
        if(this.calculateHandStrength(this.dealerHand) > 21) {
          this.endingText = 'You won since the Dealer thought he is gever but passed 21';
          this.http.post('http://localhost:3100/postWinner', {winner: 'player'}).toPromise();
        }
      }
    }
  }

  public calculateHandStrength(hand: Array<Card>) {
    let sum: number = 0;
    hand.forEach(card => {
      sum += card.strength;
    });
    return sum;
  }

  private checkIfDealerShouldDrawMoreCard() {
    return this.calculateHandStrength(this.dealerHand) <= 16;
  }

  private init() {
    this.endingText = "";
    this.gameGoes = true;
    this.dealerHand = [];
    this.yourHand = [];
    this.gameDeck = new Deck();
    this.drawCardForDealer();
    this.requestCard();
    this.requestCard();
  }

  private handleError(error: any): Promise<any> {
    alert('Your Server is on? because I cant draw a card.');
    console.log('Your Server is on? because I cant draw a card.');
    return Promise.reject(error.message || error);
  }
}
