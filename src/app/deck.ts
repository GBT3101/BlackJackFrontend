import {Card} from './card';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

export class Deck {
  private deck: Array<Card>;
  private currentIndex: number;
  private local: boolean;

  constructor() {
    this.local = false;
    this.deck = [];
    this.generateCards();
    this.shuffleDeck();
    this.currentIndex = 0;
  }

  public drawCard() {
      return this.deck[this.currentIndex++];
  }

  public drawCardFromServer(http: Http) {
    return http.get('http://localhost:3100/drawCard').toPromise()
      .then(response => {
        let strength = parseInt(response.json()['strength']);
        let color = parseInt(response.json()['color']);
        return new Card(strength, color);
      }).catch(this.handleError);
  }

  private generateCards() {
    for(let i = 1; i <= 13; i++) {
      for(let j = 0; j < 4; j++) {
        this.deck.push(new Card(i, j));
      }
    }
  }

  private shuffleDeck() {
    let tempCard : Card;
    let randomIndex : number; // random index between 0 and 52
    for(let i = 0; i < 52; i++) {
      randomIndex = parseInt(((Math.random() * 100) / 2).toFixed());
      tempCard = this.deck[i];
      this.deck[i] = this.deck[randomIndex];
      this.deck[randomIndex] = tempCard;
    }
  }

  private handleError(error: any): Promise<any> {
    // alert('Your Server is on? because I cant draw a card.');
    // console.log('Your Server is on? because I cant draw a card.');
     return Promise.reject(error.message || error);
  }

}