import { Form } from './Form';
import { OrderModel } from '../models/OrderModel';

class PayView extends Form {
  private input: HTMLInputElement;
  private buttonCash: HTMLElement;
  private buttonCard: HTMLElement;

  constructor(
    template: HTMLTemplateElement,
    model: OrderModel,
    eventDispatcher: HTMLElement
  ) {
    super(template, model, eventDispatcher);
  }

  create(): HTMLElement {
    const instance = super.create() as HTMLElement;

    this.buttonCash = instance.querySelector('.pay_cash') as HTMLElement;
    this.buttonCard = instance.querySelector('.pay_card') as HTMLElement;
    this.input = instance.querySelector('.form__input') as HTMLInputElement;

    this.buttonCard.addEventListener('click', () => {
      this.model.payCash = false;
      this.model.payCard = true;
      this.buttonCard.classList.add('button_alt-active');
      this.buttonCash.classList.remove('button_alt-active');
      this.validate();
    });

    this.buttonCash.addEventListener('click', () => {
      this.model.payCash = true;
      this.model.payCard = false;
      this.buttonCash.classList.add('button_alt-active');
      this.buttonCard.classList.remove('button_alt-active');
      this.validate();
    });

    this.input.addEventListener('input', () => {
      if (this.validate()) {
        this.model.address = this.input.value;
      }
    });

    this.validate();
    return instance;
  }

  protected handleSubmit(): void {
    const payViewDone = new CustomEvent('payViewDone');
    this.eventDispatcher.dispatchEvent(payViewDone);
  }

  protected validate(): boolean {
    let isValid = this.commonValidate();
    isValid = isValid && this.input.validity.valid;
    isValid = isValid && (
      this.buttonCard.classList.contains('button_alt-active') ||
      this.buttonCash.classList.contains('button_alt-active')
    );
    
    this.updateSubmitButton(isValid);
    return isValid;
  }
}

export { PayView };