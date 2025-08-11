import { BinModel } from "../models/BinModel";
import { ItemModel } from "../models/ItemModel";
import { BinView } from "../views/BinView";

class BinController {

  binView: BinView;
  binModel: BinModel;

  constructor(binView: BinView, binModel: BinModel) {
    this.binView = binView;
    this.binModel = binModel;
  }

  addItem(item: ItemModel) {
    this.binModel.items.push(item);

    const countItems = this.binModel.items.length;
    this.binView.updBinQuantityItems(countItems);

  }

  //TODO - CHANGE METHOD
  removeItem(item: ItemModel) {
    this.binModel.items.pop();

    const countItems = this.binModel.items.length;
    this.binView.updBinQuantityItems(countItems); 
  }


}

export {BinController}; 


