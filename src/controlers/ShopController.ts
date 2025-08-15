import { ItemModel } from "../models/ItemModel";
import { ItemPopupView } from "../views/ItemPopupView";
import { PopupView } from "../views/PopupView";
import { BinController } from "./BinControler";

class ShopController {
  popup:PopupView;
  itemPopupView: ItemPopupView;
  binController:BinController;
  eventDispatcher : HTMLElement;

  constructor(
  popup:PopupView,
  itemPopupView: ItemPopupView,
  binController:BinController,
   eventDispatcher : HTMLElement
  ){
      this.popup = popup;
      this.itemPopupView = itemPopupView;
      this.binController = binController;
      this.eventDispatcher = eventDispatcher;
      this.eventDispatcher.addEventListener("addToBin",(event:CustomEventInit<ItemModel>)=>{
        this.clickOnShopItemToAddToBasket(event.detail);
        popup.hide();
      })

      this.eventDispatcher.addEventListener("removeFromBin",(event:CustomEventInit<ItemModel>)=>{
        this.clickOnShopItemToRemoveToBasket(event.detail);
      })

  }

  clickOnShopItemToShow(model:ItemModel){
    const binContainsItem = this.binController.containsItem(model);
    const view = this.itemPopupView.createCard(model, binContainsItem);
    this.popup.show(view);
  }

  clickOnShopItemToAddToBasket(model:ItemModel){
    this.binController.addItem(model);
  }

   clickOnShopItemToRemoveToBasket(model:ItemModel){
    this.binController.removeItem(model);
  }
}

export{ShopController}