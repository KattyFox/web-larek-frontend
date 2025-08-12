import { BinController } from "../controlers/BinControler";

class BinIconView {
	htmlBinElement: HTMLElement;
	evenDispatcher: HTMLElement;

	constructor(htmlBinElement: HTMLElement,
		evenDispatcher : HTMLElement
	) {
		this.htmlBinElement = htmlBinElement;
		this.evenDispatcher = evenDispatcher;

		this.htmlBinElement.addEventListener("click",()=>{
 			const showBinEvent = new CustomEvent("showBin");
      this.evenDispatcher.dispatchEvent(showBinEvent);
		})
	}

	updBinQuantityItems(quantity: number) {
		this.htmlBinElement.querySelector(".header__basket-counter").textContent = quantity.toString();
	}
}

export {BinIconView};
