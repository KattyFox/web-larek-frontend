import './scss/styles.scss';
import { ShopModel } from './models/ShopModel';
//import { PageBodyModel } from './models/PageBodyModel';
import { ItemModel } from './models/ItemModel';
import { ItemView } from './views/ItemView';
import { Api } from './components/base/api';
import { settings } from './utils/constants';
import { BinModel } from './models/BinModel';
import { BinView } from './views/BinView';
import { BinController } from './controlers/BinControler';

// Найти попап
const modal = document.querySelector('.modal_active');

// Скрыть
modal.classList.remove('modal_active');
// Или: modal.setAttribute('hidden', '');

const gallery: HTMLElement = document.querySelector('.gallery');
const itemTemplate: HTMLTemplateElement =
	document.querySelector('#card-catalog');

const pageBodyView = new ItemView(itemTemplate, gallery);
//const title = 'gvhvhj';
//const category = 'yhyu';
//const description = 'yhyu';
//const image = 'yhyu';
//const price = 'll444';
//const newCard = pageBodyView.createCard(category, price, title);
//const newCardSecond = pageBodyView.createCard(
//	'Истерика',
//	'Просто поучись в Практикуме',
//	'+3 Инфаркта'
//);



// gallery.appendChild(newCard);
// gallery.appendChild(newCardSecond);

// const items :PageBodyItemModel[] = [];
// const model = new PageBodyModel(items);

// //TEMPLATE
// //title
// const title = "gvhvhj";
// //categoty
// const category = "yhyu";
// //description
// const description = "yhyu";
// //image
// const image = "yhyu";
// //price
// const price = 34567;
// //TEMPLATE
// const template = new (#card-catalog);

// //itemView

// const modelView = ;
// const logoId = "ggggg";

// const itemView = new PageBodyItemView (modelView, logoId);

// const pageBodyView = new PageBodyView(model, template, itemView);

// const itemTemplate:HTMLTemplateElement = document.querySelector('#card-catalog');
// const gallery: HTMLElement = document.querySelector('.gallery');

// function createCard(categoryText?: string, priceText?: string, titleText?: string): HTMLElement {
//     const card = itemTemplate.content.cloneNode(true) as HTMLElement;

//     if (categoryText) {
//         const category = card.querySelector('.card__category');
//         if (category) category.textContent = categoryText;
//     }

//     if (priceText) {
//         const price = card.querySelector('.card__price');
//        if (price) price.textContent = priceText;
//     }

//     if (titleText) {
//        const title = card.querySelector('.card__title');
//        if (title) title.textContent = titleText;
//     }

//    return card;
// }

// // Использование:
// gallery.appendChild(createCard()); // карточка по умолчанию
// gallery.appendChild(createCard('Истерика', 'Просто поучись в Практикуме', '+3 Инфаркта'));
// gallery.appendChild(createCard('Сделать карточку', '500 синапсов', '+1 Скилл'))

// let price = result.querySelector('.card__price);

//<template id="card-catalog">
//		</button class="gallery__item card">
//			<span class="card__category card__category_soft">софт-скил</span>
//			<h2 class="card__title">+1 час в сутках</h2>
//			<img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
//			<span class="card__price">750 синапсов</span>
//		</button>
//	</template>

console.log('abc');
const api = new Api(settings.API_URL);
api.get('/product/').then(( res: {items:[{category:string, price:string,title:string}], total:number} )=> {
    console.log(res);

    const items:[{category:string, price:string,title:string}] = res.items;
      for(let i =0; i< res.total;i++){
        const card = items[i];
        gallery.appendChild(pageBodyView.createCard(card.category, card.price, card.title));
      }

});


const binModel = new BinModel([]);
const binView = new BinView(document.querySelector(".header__basket-counter"));
const binController = new BinController(binView,binModel);

document.addEventListener("keypress",(evt)=>{
if(evt.key === "+" )
{
  binController.addItem(new ItemModel("a","b","c","d",1))
}

if(evt.key === "-" )
{
  binController.removeItem(new ItemModel("a","b","c","d",1))
}

});
