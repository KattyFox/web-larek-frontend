import { BinModel } from "../models/BinModel";
import { ItemModel } from "../models/ItemModel";
import { BinIconView } from "../views/BinIconView";
import { BinView } from "../views/BinView";
import { PopupView } from "../views/PopupView";

class BinController {

  binIconView: BinIconView;
  binModel: BinModel;
  binView:BinView;
  popupView: PopupView;
  eventDispatcher: HTMLElement;

  constructor(binIconView: BinIconView, binModel: BinModel,
    popupView: PopupView,
    binView : BinView,
    eventDispatcher: HTMLElement,
  ) {
    this.binIconView = binIconView;
    this.binModel = binModel;
    this.popupView = popupView;
    this.binView = binView;
    this.eventDispatcher = eventDispatcher;

    this.eventDispatcher.addEventListener("showBin",()=>{
      this.showBin();
    })

    this.eventDispatcher.addEventListener("buyButtonBin",()=>{
        const startPayEvent = new CustomEvent("startPay",{detail:this.binModel.items});
        this.eventDispatcher.dispatchEvent(startPayEvent);
    })

    eventDispatcher.addEventListener("orderDone",()=>{
      this.binModel.items = [];
      this.updateIcon();
    });
  }

  addItem(item: ItemModel) {
    this.binModel.items.push(item);

    const countItems = this.binModel.items.length;
    this.binIconView.updBinQuantityItems(countItems);

  }

  containsItem (model:ItemModel):boolean{
    const index = this.binModel.items.findIndex(x=>x == model);
    return index!==-1;
  }

  removeItem(item: ItemModel) {
    const indexToRemove = this.binModel.items.findIndex(x=>x == item);
    if(indexToRemove == -1 ){
        console.log("Error");
    }
    this.binModel.items.splice(indexToRemove,1);
    this.showBin();
    
    this.updateIcon();
  
  }

  showBin(){
    this.popupView.show(this.binView.create(this.binModel.items));
  }

  updateIcon(){
  const countItems = this.binModel.items.length;
    this.binIconView.updBinQuantityItems(countItems); 
  }

}

export {BinController}; 


