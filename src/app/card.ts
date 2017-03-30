export class Card {
  public strength: number;
  public path: string;

  // colors: 0 - tiltan, 1 - leaf, 2 - diamond, 3 - heart
  constructor(strength: number, color: number) {
    this.strength = strength > 10 ? 10 : strength;
    this.path = `images/${strength}c${color}.png`;
  }
}
