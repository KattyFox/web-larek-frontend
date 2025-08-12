import { OrderModel } from "../models/OrderModel";

class ContactView{
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

    const inputEmail = instance.querySelector(".input_email") as HTMLInputElement;
    inputEmail.addEventListener("input",()=>{
      this.model.email = inputEmail.value;
    });

    const inputPhone = instance.querySelector(".input_phone") as HTMLInputElement;
    inputPhone.addEventListener("input",()=>{
      this.model.phone = inputPhone.value;
    });


    const orderButton = instance.querySelector(".button") as HTMLElement;
    orderButton.addEventListener("click",()=>{      
      const contactViewDone = new CustomEvent("contactViewDone");
      this.eventDispatcher.dispatchEvent(contactViewDone);
    })
    
    return instance;
  }
}
export{ContactView}