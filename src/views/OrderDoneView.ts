import { OrderModel } from "../models/OrderModel";

class OrderDoneView{
  template :HTMLTemplateElement;
  model : OrderModel;
  eventDispatcher: HTMLElement;

  constructor(
     template :HTMLTemplateElement,
  model : OrderModel,
  eventDispatcher: HTMLElement,
  )
  {
    this.template = template;
    this.model = model;
    this.eventDispatcher = eventDispatcher;
  }

  create(){
    const instance = this.template.content.cloneNode(true) as HTMLElement;
    const spendLabel = instance.querySelector(".order-success__description") as HTMLInputElement;
    if(spendLabel){
      spendLabel.textContent = `Списано ${this.model.totalPrice} синапсов.`;
    }

    const buttonDone = instance.querySelector(".order-success__close") as HTMLInputElement; 
    if(buttonDone){
      buttonDone.addEventListener("click",()=>{
        const orderDone = new CustomEvent("orderDone");
        this.eventDispatcher.dispatchEvent(orderDone);
      })
    }

    return instance;
  }
}
export {OrderDoneView}