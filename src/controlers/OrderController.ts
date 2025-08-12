import { ItemModel } from "../models/ItemModel";
import { OrderModel } from "../models/OrderModel";
import { ContactView } from "../views/ContactView";
import { OrderDoneView } from "../views/OrderDoneView";
import { PayView } from "../views/PayView"
import { PopupView } from "../views/PopupView";

class OrderController{
  popupView : PopupView;
  payView: PayView;
  contactView:ContactView;
  orderDoneView:OrderDoneView;
  model:OrderModel;
  eventDispatcher: HTMLElement;

  constructor(
  payView: PayView,
  contactView:ContactView,
  orderDonwView:OrderDoneView,
  model:OrderModel,
  eventDispatcher: HTMLElement,
   popupView : PopupView,
  ){
    this.payView = payView;
    this.contactView = contactView;
    this.orderDoneView = orderDonwView;
    this.model = model;
    this.eventDispatcher = eventDispatcher;
    this.popupView = popupView;

    eventDispatcher.addEventListener("startPay",(evt:CustomEventInit<ItemModel[]>)=>{
      this.startPay(evt.detail);
    })

    eventDispatcher.addEventListener("payViewDone",()=>{
      this.startContactView();
    });

    eventDispatcher.addEventListener("contactViewDone",()=>{
      this.startOrderDoneView();
    });

    eventDispatcher.addEventListener("orderDone",()=>{
      this.oderDone();
    });
  }

  startPay(items:ItemModel[]){
    this.model.reset();
    let totalPrice =0;
    for(let i = 0 ; i < items.length ; i++){
      if(items[i].price>0){
        totalPrice+=items[i].price;
      }
    }
    this.model.totalPrice = totalPrice;
    this.model.items = items;
    this.popupView.show(this.payView.create());
  }

  startContactView(){
    this.popupView.show(this.contactView.create());
  }

  startOrderDoneView(){
    this.popupView.show(this.orderDoneView.create());
  }

  oderDone(){
    console.log("SEND ORDER TO SERVER" , this.model);
    this.model.reset();
    this.popupView.hide();
  }
}
export {OrderController}