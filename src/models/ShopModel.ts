import { ItemModel } from "./ItemModel";

class ShopModel {
  items: ItemModel[];

  constructor(items: ItemModel[]) {
    this.items = items;
  }
}

export {ShopModel};