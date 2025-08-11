import { ItemModel } from "../models/ItemModel";


class ShopView {
  model: ItemModel;
  
  logoId:string;

  constructor(model:ItemModel, logoId: string) {
    this.model = model;
    this.logoId = `bodyTemplate-item-img`
  }
}

export {ShopView}; 
