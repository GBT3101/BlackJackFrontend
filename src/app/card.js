"use strict";
var Card = (function () {
    // colors: 0 - tiltan, 1 - leaf, 2 - diamond, 3 - heart
    function Card(strength, color) {
        this.strength = strength > 10 ? 10 : strength;
        this.path = "images/" + strength + "c" + color + ".png";
    }
    return Card;
}());
exports.Card = Card;
//# sourceMappingURL=card.js.map