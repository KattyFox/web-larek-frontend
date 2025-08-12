import { ShopModel } from '../models/ShopModel';
import { ItemModel } from '../models/ItemModel';
import { ItemShopView } from './ItemShopView';

class ShopView {

	private container: HTMLElement;
	private itemShopView: ItemShopView;

	constructor(container: HTMLElement, itemShopView: ItemShopView) {
		this.container = container;
    this.itemShopView = itemShopView;
	}

  appendCard(model:ItemModel){
    this.append(this.itemShopView.createCard(model));
  }

	append(card: HTMLElement) {
		this.container.appendChild(card);
	}
}

export { ShopView };
