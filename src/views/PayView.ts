import { OrderModel } from '../models/OrderModel';

class PayView {
	template: HTMLTemplateElement;
	model: OrderModel;
	eventDispatcher: HTMLElement;

	input: HTMLInputElement;
	orderButton: HTMLButtonElement;
	buttonCash: HTMLElement;
	buttonCard: HTMLElement;

	constructor(
		template: HTMLTemplateElement,
		model: OrderModel,
		eventDispatcher: HTMLElement
	) {
		this.template = template;
		this.model = model;
		this.eventDispatcher = eventDispatcher;
	}

	create() {
		const instance = this.template.content.cloneNode(true) as HTMLElement;

		this.buttonCash = instance.querySelector('.pay_cash') as HTMLElement;
		this.buttonCard = instance.querySelector('.pay_card') as HTMLElement;

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

		this.input = instance.querySelector('.form__input') as HTMLInputElement;
		this.input.addEventListener('input', () => {
			if (this.validate()) {
				this.model.address = this.input.value;
			}
		});

		this.orderButton = instance.querySelector(
			'.order__button'
		) as HTMLButtonElement;
		this.orderButton.addEventListener('click', () => {
			const payViewDone = new CustomEvent('payViewDone');
			this.eventDispatcher.dispatchEvent(payViewDone);
		});

		this.validate();
		return instance;
	}

	validate() {
		let isValid = this.input.validity.valid;
		isValid =
			(isValid && this.buttonCard.classList.contains('button_alt-active')) ||
			this.buttonCash.classList.contains('button_alt-active');
		this.orderButton.disabled = !isValid;
		return isValid;
	}
}
export { PayView };
