import { Api } from '../components/base/api';
import { ItemModel } from '../models/ItemModel';
import { OrderModel } from '../models/OrderModel';
import { ContactView } from '../views/ContactView';
import { OrderDoneView } from '../views/OrderDoneView';
import { PayView } from '../views/PayView';
import { PopupView } from '../views/PopupView';

class OrderController {
	popupView: PopupView;
	payView: PayView;
	contactView: ContactView;
	orderDoneView: OrderDoneView;
	model: OrderModel;
	eventDispatcher: HTMLElement;
	api: Api;

	constructor(
		payView: PayView,
		contactView: ContactView,
		orderDonwView: OrderDoneView,
		model: OrderModel,
		eventDispatcher: HTMLElement,
		popupView: PopupView,
		api: Api
	) {
		this.payView = payView;
		this.contactView = contactView;
		this.orderDoneView = orderDonwView;
		this.model = model;
		this.eventDispatcher = eventDispatcher;
		this.popupView = popupView;
		this.api = api;

		eventDispatcher.addEventListener(
			'startPay',
			(evt: CustomEventInit<ItemModel[]>) => {
				this.startPay(evt.detail);
			}
		);

		eventDispatcher.addEventListener('payViewDone', () => {
			this.startContactView();
		});

		eventDispatcher.addEventListener('contactViewDone', () => {
			this.startOrderDoneView();
		});

		eventDispatcher.addEventListener('orderDone', this.postToServer.bind(this));
	}

	postToServer() {
		try {
			this.api
				.post('/order', {
					payment: this.model.payCard?'online': 'cash',
					email: this.model.email,
					phone: this.model.phone,
					address: this.model.address,
					total: this.model.totalPrice,
					items: this.model.items.map(x=>x.id),
				})
				.then(() => {
					this.oderDone();
				});
		} catch (error) {
			console.error(error);
		}
	}

	startPay(items: ItemModel[]) {
		this.model.reset();
		let totalPrice = 0;
		for (let i = 0; i < items.length; i++) {
			if (items[i].price > 0) {
				totalPrice += items[i].price;
			}
		}
		this.model.totalPrice = totalPrice;
		this.model.items = items;
		this.popupView.show(this.payView.create());
	}

	startContactView() {
		this.popupView.show(this.contactView.create());
	}

	startOrderDoneView() {
		this.popupView.show(this.orderDoneView.create());
	}

	oderDone() {
		this.model.reset();
		this.popupView.hide();
	}
}
export { OrderController };
