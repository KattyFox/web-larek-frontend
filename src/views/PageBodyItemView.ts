import { PageBodyItemModel } from "../models/PageBodyIemModel";


class PageBodyItemView {
  model: PageBodyItemModel;
  
  logoId:string;

  constructor(model:PageBodyItemModel, logoId: string) {
    this.model = model;
    this.logoId = `bodyTemplate-item-img`
  }
}

export {PageBodyItemView}; 
