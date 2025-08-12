import './scss/styles.scss';
import { ItemModel } from './models/ItemModel';
import { Api } from './components/base/api';
import { settings } from './utils/constants';
import { BinModel } from './models/BinModel';
import { BinIconView } from './views/BinIconView';
import { BinController } from './controlers/BinControler';
import { ItemShopView } from './views/ItemShopView';
import { ShopView } from './views/ShopView';
import { PopupView } from './views/PopupView';
import { ItemPopupView } from './views/ItemPopupView';
import { ShopController } from './controlers/ShopController';
import { BinView } from './views/BinView';
import { ItemCompactView } from './views/ItemCompactView';
import { OrderModel } from './models/OrderModel';
import { PayView } from './views/PayView';
import { ContactView } from './views/ContactView';
import { OrderDoneView } from './views/OrderDoneView';
import { OrderController } from './controlers/OrderController';

// EVENTS
const eventDispatcher:HTMLElement = document.createElement("div");
// EVENTS

// POPUP
const popupView = new PopupView( document.querySelector('#modal-container'));
popupView.hide();
// POPUP

/// BIN
const binModel = new BinModel([]);
const binIconView = new BinIconView(document.querySelector(".header__basket"),
eventDispatcher
);
const itemCompactView = new ItemCompactView(
  document.querySelector("#card-basket"),
  eventDispatcher
)
const binView = new BinView(
  document.querySelector("#basket"),
  itemCompactView , eventDispatcher
)
const binController = new BinController(binIconView,binModel,popupView,binView,eventDispatcher);
/// BIN

/// SHOP
const itemPopupView = new ItemPopupView(
  document.querySelector('#card-preview'), eventDispatcher);

const shopController = new ShopController(
  popupView,itemPopupView,binController, eventDispatcher)

const gallery: HTMLElement = document.querySelector('.gallery');
const shopItemTemplate: HTMLTemplateElement =
	document.querySelector('#card-catalog');

const itemShopView = new ItemShopView(shopItemTemplate,shopController);
const shopView = new ShopView( gallery,itemShopView);
/// SHOP

// ORDER
const orderModel = new OrderModel();
const payView = new PayView(document.querySelector("#order"), orderModel,eventDispatcher);
const contactView = new ContactView(document.querySelector("#contacts"), orderModel,eventDispatcher);
const orderDoneView = new OrderDoneView(document.querySelector("#success"), orderModel,eventDispatcher);
const orderController = new OrderController(payView,contactView,orderDoneView,orderModel,eventDispatcher,popupView);
// ORDER

// API REQUEST
let storedItems:Array<ItemModel> = null;
const api = new Api(settings.API_URL);
api.get('/product/')
.then(( res: {items:Array<ItemModel>, total:number} )=> {
    const items:Array<ItemModel> = res.items;
      for(let i =0; i< res.total;i++){
        const card = items[i];
        shopView.appendCard(card);
      }
      storedItems = items;
});
// API REQUEST