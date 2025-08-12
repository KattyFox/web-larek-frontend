import { ItemModel } from "../models/ItemModel";
import { ItemCompactView } from "./ItemCompactView";

class BinView{
  template: HTMLTemplateElement;
  itemCompactView :ItemCompactView;
  evenDispatcher: HTMLElement;

	constructor(element: HTMLTemplateElement, itemCompactView:ItemCompactView,
    eventDispatcher : HTMLElement
  ) {
		this.template = element;
    this.itemCompactView = itemCompactView;
    this.evenDispatcher = eventDispatcher;
  }

  public create( models:ItemModel[]){
    const instance = this.template.content.cloneNode(true) as HTMLElement;
    const basket = instance.querySelector(".basket__list") as HTMLHtmlElement;

    const totalPriceLabel = instance.querySelector(".basket__price");
    let totalPrice = 0;
    models.forEach((model, index) => {
      const modelView = this.itemCompactView.createCard(model,index);
      basket.appendChild(modelView)
      if(model.price>0){
        totalPrice+=model.price;
      }
    });
    totalPriceLabel.textContent = totalPrice.toString() + " Синапсов";

    const buyButton = instance.querySelector(".basket__button") as HTMLHtmlElement;
    if(buyButton){
      buyButton.addEventListener("click",()=>{
        const showBinEvent = new CustomEvent("buyButtonBin");
        this.evenDispatcher.dispatchEvent(showBinEvent);
      })
    }

    return instance;
  }
}

export{BinView}