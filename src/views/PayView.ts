import { OrderModel } from "../models/OrderModel";

class PayView{
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

    const buttonCash = instance.querySelector(".pay_cash") as HTMLElement;
    const buttonCard = instance.querySelector(".pay_card") as HTMLElement;

    buttonCard.addEventListener("click",()=>{
      this.model.payCash= false;
      this.model.payCard = true;
      buttonCard.classList.add("button_alt-active");
      buttonCash.classList.remove("button_alt-active");
  });
    
    buttonCash.addEventListener("click",()=>{
      this.model.payCash = true;
      this.model.payCard = false;
      buttonCash.classList.add("button_alt-active");
      buttonCard.classList.remove("button_alt-active");
    });

    const input = instance.querySelector(".form__input") as HTMLInputElement;
    input.addEventListener("input",()=>{
      this.model.address = input.value;
    });

    const orderButton = instance.querySelector(".order__button") as HTMLElement;
    orderButton.addEventListener("click",()=>{
      
      const payViewDone = new CustomEvent("payViewDone");
      this.eventDispatcher.dispatchEvent(payViewDone);

    })

    return instance;
  }
}
export{PayView}