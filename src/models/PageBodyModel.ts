import { PageBodyItemModel } from "./PageBodyIemModel";


class PageBodyModel {
  bodyItems: PageBodyItemModel[];

  constructor(bodyItems: PageBodyItemModel[]) {
    this.bodyItems = bodyItems;
  }
}

export {PageBodyModel};
