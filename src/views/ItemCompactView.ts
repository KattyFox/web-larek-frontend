import { BinController } from "../controlers/BinControler";
import { ItemModel } from "../models/ItemModel";

class ItemCompactView {

private template: HTMLTemplateElement;
  eventDispatcher: HTMLElement;

  constructor( template: HTMLTemplateElement,
     eventDispatcher: HTMLElement,
  ) {
    this.template = template;
    this.eventDispatcher = eventDispatcher;
  }

  createCard( model : ItemModel, index:number): HTMLElement {
  const card = this.template.content.cloneNode(true) as HTMLElement;
    
  const price = card.querySelector('.card__price');
  if (price && model.price) {
    price.textContent = `${model.price.toString()} cинапсов`;
  }
  const title = card.querySelector('.card__title');
  if (title) title.textContent = model.title;

  const delButton = card.querySelector('.basket__item-delete');
  if(delButton){
    delButton.addEventListener("click",()=>{
      
        const removeFromBin = new CustomEvent("removeFromBin",{
        detail:model
        })
        this.eventDispatcher.dispatchEvent(removeFromBin);
        })
    };

    const indexSpan = card.querySelector(".basket__item-index");
    if(indexSpan){
      indexSpan.textContent = (index+1).toString();
    }
  
  return card;
}
  
}

export{ItemCompactView}