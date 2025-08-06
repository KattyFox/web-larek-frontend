import { PageBodyModel } from "../models/PageBodyModel";
import { PageBodyItemModel } from "../models/PageBodyIemModel";
import { PageBodyItemView } from "./PageBodyItemView";

class PageBodyView {
  model: PageBodyModel;
  template: HTMLTemplateElement;
  itemView: PageBodyItemView;

  constructor(model: PageBodyModel, template: HTMLTemplateElement, itemView: PageBodyItemView ) {
    this.model = model;
    this.template = template;
    this.itemView = itemView;
  }

}