import { ItemModel } from "./ItemModel";

class BinModel {
  items:ItemModel[];

  constructor(items:ItemModel[]){
    this.items = items;
  }
}

export {BinModel};