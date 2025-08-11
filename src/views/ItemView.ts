import { ShopModel } from "../models/ShopModel";
import { ItemModel } from "../models/ItemModel";
//import { ItemView } from "./ItemView";
import { PageView } from "./PageView";

class ItemView {
  // private model: PageBodyModel;
  private template: HTMLTemplateElement;
  // private itemView: PageBodyItemView;
  private container:HTMLElement;

  constructor(
    // model: PageBodyModel,
    template: HTMLTemplateElement, 
    container :HTMLElement
    // itemView: PageBodyItemView 
  ) {
    // this.model = model;
    this.template = template;
    // this.itemView = itemView;
    this.container = container;
  }

  addCardToBody(card:HTMLElement){
      this.container.appendChild(card);
  }

  createCard(categoryText?: string, priceText?: string, titleText?: string): HTMLElement {
    const card = this.template.content.cloneNode(true) as HTMLElement;
    
  if (categoryText) {
        const category = card.querySelector('.card__category');
  if (category) category.textContent = categoryText;
  }
    
  if (priceText) {
      const price = card.querySelector('.card__price');
  if (price) price.textContent = priceText;
  }
    
  if (titleText) {
    const title = card.querySelector('.card__title');
    if (title) title.textContent = titleText;
  }  
  return card;
}
}


export {ItemView};