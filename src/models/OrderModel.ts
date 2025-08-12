import { ItemModel } from "./ItemModel";

class OrderModel{
  payCard:boolean;
  payCash:boolean;
  address:string;
  email:string;
  phone:string;
  items:ItemModel[];
  totalPrice:number;

  reset(){
    this.payCash = false;
    this.payCard = false;
    this.address ="";
    this.email ="";
    this.phone ="";
    this.items = [];
    this.totalPrice = 0;
  }
}

export {OrderModel}