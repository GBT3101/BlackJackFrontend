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
// For loop to render all cards inside cards
var CardsListComponent = (function () {
    function CardsListComponent() {
    }
    return CardsListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], CardsListComponent.prototype, "cards", void 0);
CardsListComponent = __decorate([
    core_1.Component({
        selector: 'cards-list',
        template: "\n             <div class=\"cards-list\">\n               <div *ngFor=\"let cardObject of cards\"> \n                  <card [cardObject]=\"cardObject\"></card>\n               </div>\n             </div>"
    })
], CardsListComponent);
exports.CardsListComponent = CardsListComponent;
//# sourceMappingURL=cards-list.component.js.map