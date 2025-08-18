import { OrderModel } from "../models/OrderModel";

class ContactView{
  template :HTMLTemplateElement;
  model : OrderModel;
  eventDispatcher: HTMLElement;
  
  
  button : HTMLButtonElement;
  emailInput:HTMLInputElement;
  phoneInput:HTMLInputElement;

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

    this.emailInput = instance.querySelector(".input_email") as HTMLInputElement;
    this.emailInput.addEventListener("input",()=>{
      this.model.email = this.emailInput.value;
      this.validate();
    });

    this.phoneInput= instance.querySelector(".input_phone") as HTMLInputElement;
    this.phoneInput.addEventListener("input",()=>{
      this.model.phone = this.phoneInput.value;
      this.validate();
    });


      this.button = instance.querySelector(".button") as HTMLButtonElement;
      this.button.addEventListener("click",()=>{      
        const contactViewDone = new CustomEvent("contactViewDone");
        this.eventDispatcher.dispatchEvent(contactViewDone);
      })

      this.validate();
      
      return instance;
    }

    validate(){
      let isValid = this.emailInput.validity.valid;
      isValid =  isValid && this.phoneInput.validity.valid;
      this.button.disabled = !isValid;
      return isValid;
  }
}
export{ContactView}