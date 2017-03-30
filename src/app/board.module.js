"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var board_component_1 = require("./board.component");
var card_component_1 = require("./card.component");
var cards_list_component_1 = require("./cards-list.component");
var http_1 = require("@angular/http");
var BoardModule = (function () {
    function BoardModule() {
    }
    return BoardModule;
}());
BoardModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule],
        declarations: [board_component_1.BoardComponent, card_component_1.CardComponent, cards_list_component_1.CardsListComponent],
        bootstrap: [board_component_1.BoardComponent]
    })
], BoardModule);
exports.BoardModule = BoardModule;
//# sourceMappingURL=board.module.js.map