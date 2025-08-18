import { ItemModel } from "../models/ItemModel";
import { ItemCompactView } from "./ItemCompactView";

class BinView{
  template: HTMLTemplateElement;
  itemCompactView :ItemCompactView;
  evenDispatcher: HTMLElement;
  button :HTMLButtonElement;

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

    this.button = instance.querySelector(".basket__button") as HTMLButtonElement;
    if(this.button){
      this.button.addEventListener("click",()=>{
        const showBinEvent = new CustomEvent("buyButtonBin");
        this.evenDispatcher.dispatchEvent(showBinEvent);
      })
    }

    this.validate(models);
    return instance;
  }

  validate(models:ItemModel[]){
    const isValid =  models.length >0;
    this.button.disabled = !isValid;
    return isValid;
  }
}

export{BinView}