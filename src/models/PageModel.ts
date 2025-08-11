import { ItemModel } from "./ItemModel";


class PageModel {
  bodyItems: ItemModel[];

  constructor(bodyItems: ItemModel[]) {
    this.bodyItems = bodyItems;
  } 
}

export {PageModel};
