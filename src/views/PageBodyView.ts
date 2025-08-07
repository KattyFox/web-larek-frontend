import { PageBodyModel } from "../models/PageBodyModel";
import { PageBodyItemModel } from "../models/PageBodyIemModel";
import { PageBodyItemView } from "./PageBodyItemView";

class PageBodyView {
  private model: PageBodyModel;
  private template: HTMLTemplateElement;
  private itemView: PageBodyItemView;

  constructor(model: PageBodyModel, template: HTMLTemplateElement, itemView: PageBodyItemView ) {
    this.model = model;
    this.template = template;
    this.itemView = itemView;
  }


  
  render(newModel: PageBodyModel ): HTMLElement {
    
  const itemTemplate:HTMLTemplateElement = document.querySelector('#card-catalog');
  const gallery: HTMLElement = document.querySelector('.gallery')
    

  // Clear existing content
    //gallery.innerHTML = '';
    
    
  function createCard(categoryText?: string, priceText?: string, titleText?: string): HTMLElement {
    const card = itemTemplate.content.cloneNode(true) as HTMLElement;
    
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

// карточка по умолчанию}
  gallery.appendChild(createCard()); 

  //const defaultCard = createCard('Категория', '100 ₽', 'Название товара');
  //gallery.appendChild(defaultCard);
    
    return gallery;
  }  

}



export {PageBodyView};