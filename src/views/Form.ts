import { OrderModel } from '../models/OrderModel';

abstract class Form {
  protected template: HTMLTemplateElement;
  protected model: OrderModel;
  protected eventDispatcher: HTMLElement;
  protected formElement: HTMLFormElement;
  protected submitButton: HTMLButtonElement;

  constructor(
    template: HTMLTemplateElement,
    model: OrderModel,
    eventDispatcher: HTMLElement
  ) {
    this.template = template;
    this.model = model;
    this.eventDispatcher = eventDispatcher;
  }

  protected initializeForm(instance: HTMLElement): void {
    this.formElement = instance.querySelector('form') as HTMLFormElement;
    this.submitButton = instance.querySelector('button[type="submit"]') as HTMLButtonElement;
    
    this.formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  protected abstract handleSubmit(): void;
  protected abstract validate(): boolean;

  protected commonValidate(): boolean {
    return this.formElement.checkValidity();
  }

  protected updateSubmitButton(isValid: boolean): void {
    this.submitButton.disabled = !isValid;
  }

  create(): HTMLElement {
    const instance = this.template.content.cloneNode(true) as HTMLElement;
    this.initializeForm(instance);
    return instance;
  }
}

export { Form };