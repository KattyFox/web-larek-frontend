import './scss/styles.scss';
import { PageBodyView } from './views/PageBodyView';
import { PageBodyModel } from './models/PageBodyModel';
import { PageBodyItemModel } from './models/PageBodyIemModel';
import { PageBodyItemView } from './views/PageBodyItemView';


// Найти попап
const modal = document.querySelector('.modal_active');

// Скрыть
modal.classList.remove('modal_active')
// Или: modal.setAttribute('hidden', '');

// //MODEL
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




const itemTemplate:HTMLTemplateElement = document.querySelector('#card-catalog');
const gallery: HTMLElement = document.querySelector('.gallery');

function createCard(categoryText?: string, priceText?: string, titleText?: string): HTMLElement {
    const card = itemTemplate.content.cloneNode(true) as HTMLElement;
    
    if (categoryText) {
        const category = card.querySelector('.card__category');
        if (category) category.textContent = categoryText;
    }
    
    if (priceText) {
        const price = card.querySelector('.card__price');
       if (price) price.textContent = priceText;
    }
    
    if (titleText) {
       const title = card.querySelector('.card__title');
       if (title) title.textContent = titleText;
    }
    
   return card;
}

// Использование:
gallery.appendChild(createCard()); // карточка по умолчанию
gallery.appendChild(createCard('Истерика', 'Просто поучись в Практикуме', '+3 Инфаркта'));
gallery.appendChild(createCard('Сделать карточку', '500 синапсов', '+1 Скилл'))





// let price = result.querySelector('.card__price);


//<template id="card-catalog">
//		<button class="gallery__item card">
//			<span class="card__category card__category_soft">софт-скил</span>
//			<h2 class="card__title">+1 час в сутках</h2>
//			<img class="card__image" src="<%=require('../images/Subtract.svg')%>" alt="" />
//			<span class="card__price">750 синапсов</span>
//		</button>
//	</template>