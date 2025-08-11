import { IRender } from "./IRender";

class PageView implements IRender{
  headerView: IRender;
  bodyView: IRender;

  constructor(headerView: IRender, bodyView: IRender) {
    this.headerView = headerView;
    this.bodyView = bodyView;
  }
  render(model?: any): HTMLElement {
  throw new Error("Method not implemented.");
  }

}

export {PageView}; 