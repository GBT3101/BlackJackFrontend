"use strict";
var card_1 = require("./card");
require("rxjs/add/operator/toPromise");
var Deck = (function () {
    function Deck() {
        this.local = false;
        this.deck = [];
        this.generateCards();
        this.shuffleDeck();
        this.currentIndex = 0;
    }
    Deck.prototype.drawCard = function () {
        return this.deck[this.currentIndex++];
    };
    Deck.prototype.drawCardFromServer = function (http) {
        return http.get('http://localhost:3100/drawCard').toPromise()
            .then(function (response) {
            var strength = parseInt(response.json()['strength']);
            var color = parseInt(response.json()['color']);
            return new card_1.Card(strength, color);
        }).catch(this.handleError);
    };
    Deck.prototype.generateCards = function () {
        for (var i = 1; i <= 13; i++) {
            for (var j = 0; j < 4; j++) {
                this.deck.push(new card_1.Card(i, j));
            }
        }
    };
    Deck.prototype.shuffleDeck = function () {
        var tempCard;
        var randomIndex; // random index between 0 and 52
        for (var i = 0; i < 52; i++) {
            randomIndex = parseInt(((Math.random() * 100) / 2).toFixed());
            tempCard = this.deck[i];
            this.deck[i] = this.deck[randomIndex];
            this.deck[randomIndex] = tempCard;
        }
    };
    Deck.prototype.handleError = function (error) {
        // alert('Your Server is on? because I cant draw a card.');
        // console.log('Your Server is on? because I cant draw a card.');
        return Promise.reject(error.message || error);
    };
    return Deck;
}());
exports.Deck = Deck;
//# sourceMappingURL=deck.js.map