import { Form } from './Form';
import { OrderModel } from '../models/OrderModel';

class ContactView extends Form {
  private emailInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;

  constructor(
    template: HTMLTemplateElement,
    model: OrderModel,
    eventDispatcher: HTMLElement
  ) {
    super(template, model, eventDispatcher);
  }

  create(): HTMLElement {
    const instance = super.create() as HTMLElement;

    this.emailInput = instance.querySelector('.input_email') as HTMLInputElement;
    this.phoneInput = instance.querySelector('.input_phone') as HTMLInputElement;

    this.emailInput.addEventListener('input', () => {
      this.model.email = this.emailInput.value;
      this.validate();
    });

    this.phoneInput.addEventListener('input', () => {
      this.model.phone = this.phoneInput.value;
      this.validate();
    });

    this.validate();
    return instance;
  }

  protected handleSubmit(): void {
    const contactViewDone = new CustomEvent('contactViewDone');
    this.eventDispatcher.dispatchEvent(contactViewDone);
  }

  protected validate(): boolean {
    let isValid = this.commonValidate();
    isValid = isValid && this.emailInput.validity.valid;
    isValid = isValid && this.phoneInput.validity.valid;
    
    this.updateSubmitButton(isValid);
    return isValid;
  }
}

export { ContactView };