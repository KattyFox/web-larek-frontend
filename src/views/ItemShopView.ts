import { ShopController } from '../controlers/ShopController';
import { ItemModel } from '../models/ItemModel';
import { CDN_URL } from '../utils/constants';

class ItemShopView {
	private template: HTMLTemplateElement;
	private shopController: ShopController;

	constructor(template: HTMLTemplateElement, shopController: ShopController) {
		this.template = template;
		this.shopController = shopController;
	}

	createCard(model: ItemModel): HTMLElement {
		const card = this.template.content.cloneNode(true) as HTMLElement;

		const category = card.querySelector('.card__category');
		if (category) category.textContent = model.category;

		const price = card.querySelector('.card__price');
		if (price ) {
      if( model.price){
					price.textContent = `${model.price.toString()} cинапсов`;
      } else {
              price.textContent = "Бесценно";   
      }
    }

		const title = card.querySelector('.card__title');
		if (title) title.textContent = model.title;

		const showButton = card.querySelector('.gallery__item');
		if (showButton) {
			showButton.addEventListener('click', () => {
				this.shopController.clickOnShopItemToShow(model);
			});
		}

		const image: HTMLImageElement = card.querySelector('.card__image');
		if (image) {
			image.src = `${CDN_URL}${model.image}`;
		}

		return card;
	}
}

export { ItemShopView };
