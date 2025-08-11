class BinView {
	htmlBinElement: HTMLElement;

	constructor(htmlBinElement: HTMLElement) {
		this.htmlBinElement = htmlBinElement;
	}

	updBinQuantityItems(quantity: number) {
		this.htmlBinElement.textContent = quantity.toString();
	}
}

export {BinView};
