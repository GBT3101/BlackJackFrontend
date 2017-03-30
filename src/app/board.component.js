"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var deck_1 = require("./deck");
var http_1 = require("@angular/http");
var BoardComponent = (function () {
    function BoardComponent(http) {
        this.http = http;
        this.local = false;
        this.init();
    }
    BoardComponent.prototype.drawCard = function () {
        return this.gameDeck.drawCard();
    };
    BoardComponent.prototype.drawCardFromServer = function () {
        return Promise.resolve(this.gameDeck.drawCardFromServer(this.http));
    };
    BoardComponent.prototype.requestCard = function () {
        if (this.gameGoes) {
            if (this.local) {
                this.drawCardForYouLocal();
            }
            else {
                this.drawCardForYouServer();
            }
        }
        else {
            this.init();
        }
    };
    BoardComponent.prototype.drawCardForYouServer = function () {
        var _this = this;
        this.drawCardFromServer().then(function (drawnCard) {
            _this.yourHand.push(drawnCard);
            if (_this.calculateHandStrength(_this.yourHand) >= 21) {
                _this.submitHand();
            }
        }).catch(this.handleError);
    };
    BoardComponent.prototype.drawCardForYouLocal = function () {
        this.yourHand.push(this.drawCard());
        if (this.calculateHandStrength(this.yourHand) >= 21) {
            this.submitHand();
        }
    };
    BoardComponent.prototype.drawCardForDealer = function () {
        if (this.local) {
            this.drawCardForDealerLocal();
        }
        else {
            this.drawCardForDealerServer();
        }
    };
    BoardComponent.prototype.drawCardForDealerServer = function () {
        var _this = this;
        this.drawCardFromServer().then(function (drawnCard) { return _this.dealerHand.push(drawnCard); });
    };
    BoardComponent.prototype.drawCardForDealerLocal = function () {
        this.dealerHand.push(this.drawCard());
    };
    BoardComponent.prototype.submitHand = function () {
        if (this.gameGoes) {
            this.dealerMakePlay();
            this.didYouWin();
        }
        else {
            this.init();
        }
    };
    BoardComponent.prototype.dealerMakePlay = function () {
        // when local:
        var stillPlay = true;
        this.drawCardForDealerLocal();
        while (stillPlay) {
            if (this.checkIfDealerShouldDrawMoreCard()) {
                this.drawCardForDealerLocal();
                if (this.calculateHandStrength(this.dealerHand) > this.calculateHandStrength(this.yourHand)) {
                    stillPlay = false;
                }
            }
            else {
                stillPlay = false;
            }
        }
    };
    BoardComponent.prototype.didYouWin = function () {
        this.gameGoes = false;
        if (this.calculateHandStrength(this.dealerHand) <= 21 && this.calculateHandStrength(this.yourHand) <= 21) {
            if (this.calculateHandStrength(this.dealerHand) >= this.calculateHandStrength(this.yourHand)) {
                this.endingText = 'Dealer just won your kids.\n with tears, you asked for another match';
                this.http.post('http://localhost:3100/postWinner', { winner: 'dealer' }).toPromise();
            }
            else {
                this.endingText = 'You won! But this feeling made you obsessed, your wife left you because of this addiction.';
                this.http.post('http://localhost:3100/postWinner', { winner: 'player' }).toPromise();
            }
        }
        else {
            if (this.calculateHandStrength(this.yourHand) > 21) {
                this.endingText = 'You just lost your house because your ego writes checks YOUR BODY CANT AFFORD!';
                this.http.post('http://localhost:3100/postWinner', { winner: 'dealer' }).toPromise();
            }
            else {
                if (this.calculateHandStrength(this.dealerHand) > 21) {
                    this.endingText = 'You won since the Dealer thought he is gever but passed 21';
                    this.http.post('http://localhost:3100/postWinner', { winner: 'player' }).toPromise();
                }
            }
        }
    };
    BoardComponent.prototype.calculateHandStrength = function (hand) {
        var sum = 0;
        hand.forEach(function (card) {
            sum += card.strength;
        });
        return sum;
    };
    BoardComponent.prototype.checkIfDealerShouldDrawMoreCard = function () {
        return this.calculateHandStrength(this.dealerHand) <= 16;
    };
    BoardComponent.prototype.init = function () {
        this.endingText = "";
        this.gameGoes = true;
        this.dealerHand = [];
        this.yourHand = [];
        this.gameDeck = new deck_1.Deck();
        this.drawCardForDealer();
        this.requestCard();
        this.requestCard();
    };
    BoardComponent.prototype.handleError = function (error) {
        alert('Your Server is on? because I cant draw a card.');
        console.log('Your Server is on? because I cant draw a card.');
        return Promise.reject(error.message || error);
    };
    return BoardComponent;
}());
BoardComponent = __decorate([
    core_1.Component({
        selector: 'game-board',
        template: "\n<div class=\"board\">\n    <div class=\"hand\">\n        <div class=\"name-label\">Dealer: {{calculateHandStrength(dealerHand)}}</div>\n        <cards-list [cards]=\"dealerHand\"></cards-list>\n    </div>\n    <div class=\"hand\">\n        <div class=\"name-label\">You: {{calculateHandStrength(yourHand)}}</div>\n        <cards-list [cards]=\"yourHand\"></cards-list>\n    </div>\n</div>\n<div class=\"actions-container\">\n    <button (click)=\"requestCard()\" class=\"action\">Hit Me!</button>\n    <div class=\"ending-message\">{{endingText}}</div>\n    <button (click)=\"submitHand()\" class=\"action\">Submit Hand</button>\n</div>\n"
    }),
    __metadata("design:paramtypes", [http_1.Http])
], BoardComponent);
exports.BoardComponent = BoardComponent;
//# sourceMappingURL=board.component.js.map