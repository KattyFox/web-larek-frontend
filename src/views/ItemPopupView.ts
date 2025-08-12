import { ItemModel } from "../models/ItemModel";


// todo: same as ItemShopView
class ItemPopupView{
private template: HTMLTemplateElement;
  private eventDispatcher : HTMLElement;


  constructor( template: HTMLTemplateElement,
     eventDispatcher : HTMLElement
  ) {
    this.template = template;
    this.eventDispatcher = eventDispatcher;
  }

  createCard( model : ItemModel, binContainsItem:boolean ): HTMLElement {
    const card = this.template.content.cloneNode(true) as HTMLElement;
    
  const category = card.querySelector('.card__category');
  if (category) category.textContent = model.category;
  
  const price = card.querySelector('.card__price');
  if (price && model.price) price.textContent = model.price.toString();
    
  const title = card.querySelector('.card__title');
  if (title) title.textContent = model.title;


  const button  = card.querySelector('.card__button');
  if(button)
  {
    if(binContainsItem) {
      button.textContent ="Удалить"
      button.addEventListener('click',()=>{
        const addToBinEvent = new CustomEvent("removeFromBin",{
        detail:model
      })
      this.eventDispatcher.dispatchEvent(addToBinEvent);
      })

    } else{
      button.textContent="В корзину"
      button.addEventListener('click',()=>{
        const addToBinEvent = new CustomEvent("addToBin",{
        detail:model
      })
      this.eventDispatcher.dispatchEvent(addToBinEvent);
      })
    }
  }

  //removeFromBin

  return card;

}
}

export {ItemPopupView}