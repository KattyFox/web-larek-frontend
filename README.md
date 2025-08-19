https://github.com/KattyFox/web-larek-frontend

ссыль на запись экрана, как работает приложение https://drive.google.com/file/d/1QoVRHyf6SdjQTg_1Nwpwc1Nwsay-e9kG/view?usp=sharing


# Проектная работа "Веб-ларек"



Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```


# Описание взаимосвязи основных компонентов

# 🛒 Проект интернет-магазина — Полная документация (MVC + Events)

## 📌 Описание ##

Проект реализует мини-магазин: каталог товаров, корзина, оформление заказа и интеграция с API.  
Архитектура — **MVC** с событийной шиной (**CustomEvent через `eventDispatcher`**), что обеспечивает слабую связанность компонентов, тестируемость и расширяемость.

### Ключевые модули###

- **Shop** — каталог, карточки товара, попап с деталями.
- **Bin** — корзина, иконка, компактные карточки.
- **Order** — процесс оформления заказа (оплата → контакты → «заказ оформлен»).
- **Event System** — центральная шина событий (`HTMLElement` как Event Bus).
- **API** — обёртка над `fetch`.

---

### 📦 Модели (Models)###

### ItemModel — товар###

**Поля:**  
- `title: string` — название товара  
- `category: string` — категория товара  
- `description: string` — описание товара  
- `price: number` — цена товара (может быть `0` → UI показывает «Бесценно.»)  
- `image: string` — относительный путь к изображению на CDN  
- `id: string` — идентификатор товара (используется при отправке заказа)

**Роль:**  
Хранит данные о товаре.

**Используется в:**
- `ShopModel.items`  
- `BinModel.items`  
- `OrderModel.items`  
- `ItemShopView`  
- `ItemPopupView`  
- `ItemCompactView`  

**Инварианты:**
- `id` — уникален в пределах ассортимента.  
- `price >= 0`  
  - если цена отсутствует или равна `0`, трактуется как **«Бесценно»**.  
- `image` — относительный путь; в UI автоматически склеивается с `CDN_URL`.


### ShopModel — каталог###

**Поля:**  
- `items: ItemModel[]` — список всех товаров магазина  

**Конструктор:**  
- `constructor(items: ItemModel[])` — инициализирует магазин с переданным списком товаров

**Роль:**  
Хранит список доступных товаров в магазине.

###BinModel — корзина###

**Поля:**  
- `items: ItemModel[]` — список товаров в корзине  

**Роль:**  
Хранит текущий состав корзины.

**Конструктор:**  
- `constructor(items: ItemModel[])` — инициализирует корзину с переданным списком товаров

**Изменяется через:**  
- `BinController.addItem()`  
- `BinController.removeItem()`  

**Очищается при событии:**  
- `orderDone`

###OrderModel — заказ###
**Роль:**  
Хранит данные о заказе.

**Поля:**  
- `payCard: boolean` — оплата картой  
- `payCash: boolean` — оплата наличными  
- `address: string` — адрес доставки  
- `email: string` — электронная почта  
- `phone: string` — телефон  
- `items: ItemModel[]` — список товаров  
- `totalPrice: number` — общая стоимость заказа  

**Методы:**  
- `reset()` — сброс данных заказа

**Роль:**  
Единое хранилище данных по заказу на протяжении всего процесса.

**Заполняется через:**  
- `OrderController.startPay()` — копирует `items` из корзины, рассчитывает `totalPrice`  
- `PayView` — записывает `payCard` / `payCash` и `address`  
- `ContactView` — записывает `email` / `phone`  

**Очищается через:**  
- `OrderController.orderDone()`






## 🖼 Представления (Views)

### **PopupView — универсальное модальное окно**
**Поля:**
- `modal: HTMLElement` — корневой узел модального окна.

**Методы:**
- `show(newContent: HTMLElement)` — вставляет новый контент в `.modal__content`, добавляет `modal_active`.
- `hide()` — снимает `modal_active`.

**События (DOM):**
- Клик по `.modal__close` → `hide()`.
- Клик по оверлею (`this.modal`) → `hide()`.

**Взаимодействие:**
- Используется **ShopController**, **BinController**, **OrderController** для отображения вложенных экранов.
- Не хранит данных, только обёртка.

---

### **ShopView — контейнер каталога**
**Поля:**
- `container: HTMLElement` — корневой контейнер `.gallery`.
- `itemShopView: ItemShopView` — вспомогательное представление карточки.

**Методы:**
- `append(card: HTMLElement)` — добавляет готовую карточку в DOM.
- `appendCard(model: ItemModel)` — вызывает `itemShopView.createCard(model)` и вставляет результат.

**События:**
- Сам `ShopView` событий не диспатчит — события идут через карточки (`ItemShopView`).

**Взаимодействие:**
- Читает список товаров из `ShopModel`.
- Работает под управлением **ShopController**.

---

### **ItemShopView — карточка товара в каталоге**
**Поля:**
- `template: HTMLTemplateElement` — шаблон карточки.
- `shopController: ShopController` — ссылка на контроллер.

**Методы:**
- `createCard(model: ItemModel): HTMLElement`  
  Создаёт карточку с заполненными:  
  - `.card__category`,  
  - `.card__price` (если `price == 0` → «Бесценно.»),  
  - `.card__title`,  
  - `.card__image` (через `CDN_URL + model.image`).  

**События (DOM):**
- Клик по `.gallery__item` → вызывает `shopController.clickOnShopItemToShow(model)`.

**Взаимодействие:**
- Читает `ItemModel`.  
- Делегирует управление в **ShopController**.

---

### **ItemPopupView — карточка товара в попапе**
**Поля:**
- `template: HTMLTemplateElement` — шаблон.  
- `eventDispatcher: HTMLElement` — шина событий.

**Методы:**
- `createCard(model: ItemModel, binContainsItem: boolean): HTMLElement`.

**События (кастомные):**
- Если товар уже в корзине → кнопка «Удалить» → `dispatch("removeFromBin", { detail: model })`.  
- Если товара нет → кнопка «В корзину» → `dispatch("addToBin", { detail: model })`.

**Взаимодействие:**
- Читает `ItemModel`.  
- Отправляет события для **ShopController** (обрабатывает клики), которые затем идут в **BinController**.

---

### **BinIconView — иконка корзины**
**Поля:**
- `htmlBinElement: HTMLElement` — DOM-элемент иконки.  
- `eventDispatcher: HTMLElement` — шина событий.

**Методы:**
- `updBinQuantityItems(quantity: number)` — обновляет `.header__basket-counter`.

**События (кастомные):**
- Клик по `.header__basket` → `dispatch("showBin")`.

**Взаимодействие:**
- Отображает данные из `BinModel.items.length`.  
- Управляется **BinController**.

---

### **BinView — окно корзины**
**Поля:**
- `template: HTMLTemplateElement` — шаблон корзины.  
- `itemCompactView: ItemCompactView` — для отрисовки каждой позиции.  
- `eventDispatcher: HTMLElement`.  
- `button: HTMLButtonElement`.

**Методы:**
- `create(models: ItemModel[])` — создаёт список товаров (`.basket__list`), считает сумму (`.basket__price`).  
- `validate(models: ItemModel[])` — включает кнопку «Оформить заказ» при наличии товаров.

**События (кастомные):**
- Клик по `.basket__button` → `dispatch("buyButtonBin")`.

**Взаимодействие:**
- Читает `BinModel.items`.  
- Работает под управлением **BinController.showBin()**.  
- Передаёт управление в **OrderController**.

---

### **ItemCompactView — компактная карточка товара в корзине**
**Поля:**
- `template: HTMLTemplateElement`.  
- `eventDispatcher: HTMLElement`.

**Методы:**
- `createCard(model: ItemModel, index: number): HTMLElement`.  
  - Заполняет `.card__title`, `.card__price`, `.basket__item-index`.  
  - Добавляет обработчик удаления.

**События (кастомные):**
- Клик по `.basket__item-delete` → `dispatch("removeFromBin", { detail: model })`.

**Взаимодействие:**
- Читает `ItemModel`.  
- Отправляет события для **BinController**.

---

### **PayView — экран оплаты и адреса**
**Поля:**
- `template: HTMLTemplateElement`.  
- `model: OrderModel`.  
- `eventDispatcher: HTMLElement`.  
- `input: HTMLInputElement` — адрес.  
- `orderButton: HTMLButtonElement`.  
- `buttonCash: HTMLElement`, `buttonCard: HTMLElement`.

**Методы:**
- `create()` — формирует DOM, навешивает обработчики на выбор cash/card, ввод адреса.  
- `validate()` — адрес валиден + выбран cash/card → активирует кнопку.

**События (кастомные):**
- Клик по `.order__button` (валидно) → `dispatch("payViewDone")`.

**Взаимодействие:**
- Заполняет `OrderModel.payCash`, `OrderModel.payCard`, `OrderModel.address`.  
- Работает под управлением **OrderController.startPay()**.

---

### **ContactView — экран контактов**
**Поля:**
- `template: HTMLTemplateElement`.  
- `model: OrderModel`.  
- `eventDispatcher: HTMLElement`.  
- `emailInput: HTMLInputElement`.  
- `phoneInput: HTMLInputElement`.  
- `button: HTMLButtonElement`.

**Методы:**
- `create()` — собирает DOM, навешивает обработчики на email/phone.  
- `validate()` — проверяет HTML5 validity email и phone.

**События (кастомные):**
- Клик по `.button` (валидно) → `dispatch("contactViewDone")`.

**Взаимодействие:**
- Заполняет `OrderModel.email`, `OrderModel.phone`.  
- Работает под управлением **OrderController.startContactView()**.

---

### **OrderDoneView — экран успешного оформления**
**Поля:**
- `template: HTMLTemplateElement`.  
- `.order-success__description`.  
- `.order-success__close`.

**Методы:**
- `create()` — отображает сообщение «Списано {totalPrice} синапсов.».

**События (кастомные):**
- Клик по `.order-success__close` → `dispatch("orderDone")`.

**Взаимодействие:**
- Читает `OrderModel.totalPrice`.  
- Работает под управлением **OrderController.startOrderDoneView()**.  
- Диспатчит событие для **OrderController** и **BinController**.




## 🎮 Controllers

### 🧩 BinController

**Слушает события:**  
- `showBin`  
- `buyButtonBin`  
- `orderDone`  
- `addToBin`  
- `removeFromBin`  

**Методы:**  
- `addItem(item: ItemModel)` — добавить товар, обновить иконку  
- `removeItem(item: ItemModel)` — удалить товар, обновить корзину и иконку  
- `showBin()` — `popupView.show(binView.create(items))`  
- `updateIcon()` — синхронизация счетчика



### 🧩 ShopController

**Слушает события:**  
- `addToBin`  
- `removeFromBin`  

**Методы:**  
- `clickOnShopItemToShow(model)` — строит `ItemPopupView` и показывает popup  
- `clickOnShopItemToAddToBasket(model)` — делегирует `BinController.addItem`  
- `clickOnShopItemToRemoveToBasket(model)` — делегирует `BinController.removeItem`  

**Шпаргалка:**  
Событие → Метод → Результат



### 🧩 OrderController

**Слушает события:**  
- `startPay`  
- `payViewDone`  
- `contactViewDone`  
- `orderDone`  

**Методы:**  
- `startPay(items)` — `reset` модели, копирование `items`, подсчёт `totalPrice`, показ `PayView`  
- `startContactView()` — показ `ContactView`  
- `startOrderDoneView()` — показ `OrderDoneView`  
- `postToServer()` — отправка `POST /order`, затем вызов `orderDone()`  
- `orderDone()` — сброс модели, закрытие `popup`



## 📊 Сводная таблица контроллеров и событий

| Контроллер      | Слушает событие           | Метод контроллера                | Действие / Результат                                                                 |
|-----------------|--------------------------|---------------------------------|-------------------------------------------------------------------------------------|
| **BinController** | showBin                  | showBin()                        | Открывает корзину в PopupView                                                       |
|                 | buyButtonBin               | — (dispatch startPay)            | Передает список товаров в OrderController                                          |
|                 | orderDone                  | —                               | Очищает BinModel.items, обновляет иконку                                           |
|                 | addToBin                   | addItem(item)                     | Добавляет товар, обновляет счетчик                                                |
|                 | removeFromBin              | removeItem(item)                  | Удаляет товар, перерисовывает корзину, обновляет счетчик                           |
| **ShopController** | addToBin                | clickOnShopItemToAddToBasket(model) | Товар добавлен через BinController                                                 |
|                 | removeFromBin              | clickOnShopItemToRemoveToBasket(model) | Товар удален через BinController                                                 |
|                 | клик по карточке           | clickOnShopItemToShow(model)     | Показывает попап товара с корректной кнопкой                                        |
| **OrderController** | startPay               | startPay(items)                  | Инициализация OrderModel, показ PayView                                            |
|                 | payViewDone                | startContactView()               | Переход к экрану ContactView                                                       |
|                 | contactViewDone            | startOrderDoneView()             | Переход к экрану OrderDoneView                                                     |
|                 | orderDone                  | postToServer() → orderDone()     | POST /order, сброс модели, закрытие попапа                                         |

### 🔔 Примечания к таблице

- **Методы без явного вызова** (`—`) означают, что событие диспатчится, а обработка идёт в другом контроллере.  
- Все события происходят через `eventDispatcher` (HTMLElement) → централизованная шина событий.  
- Таблица объединяет **DOM-события и кастомные события** для всех контроллеров.  

---


## ✅ Валидация и поведение UI

- `BinView.validate` — кнопка **«Оформить заказ»** активна только при наличии товаров  
- `PayView.validate` — проверка валидного адреса + выбран способ оплаты  
- `ContactView.validate` — проверка валидных `email` и телефона  
- `OrderDoneView` — показывает сообщение: **«Списано {totalPrice} синапсов.»**  
- `ItemShopView` — если `price === 0` → отображается **«Бесценно.»**  
- `BinIconView` — синхронизирован с `BinModel.items` через `BinController.updateIcon()`



## 🔄 Потоки пользователя (User Flows)

### 1) Каталог → Попап товара → Добавление/Удаление

**Цель:**  
Посмотреть детали товара и добавить/убрать из корзины.

**Точки входа:**  
Клик по карточке (`ItemShopView → .gallery__item`)

**Ход:**

- `ShopController.clickOnShopItemToShow(model)` открывает попап через `PopupView`, собирая карточку в `ItemPopupView`.  
- В попапе кнопки:  
  - **«В корзину»** → событие `addToBin` → `BinController.addItem(model)` → попап закрыт, счётчик +1  
  - **«Удалить»** → событие `removeFromBin` → `BinController.removeItem(model)` → попап закрыт, счётчик -1  
- Попап можно закрыть по **X** или клику вне окна  

**Изменения:**  
- `BinModel.items` (добавление/удаление)  
- обновление счётчика корзины  

---

### 2) Просмотр корзины

**Цель:**  
Увидеть содержимое и сумму заказа, удалить позиции или перейти к оформлению.

**Точки входа:**  
Клик по иконке корзины (`BinIconView`)

**Ход:**

- Событие `showBin` → `BinController.showBin()` рендерит `BinView`  
- В списке можно удалить товар (`removeFromBin`), корзина перерисовывается  
- Кнопка **«Оформить заказ»** (`buyButtonBin`) активна, если корзина не пуста → запускает оформление  

**Изменения:**  
- При удалении обновляется `BinModel.items`, сумма и состояние кнопки  

---

### 3) Оформление заказа (Pay → Contact → Done)

**Цель:**  
Выбрать способ оплаты, адрес и контакты, отправить заказ.

**Точки входа:**  
**«Оформить заказ»** в корзине

**Шаг A — PayView**

- `startPay` → `OrderController.startPay()` → показывается форма оплаты  
- Выбор `cash`/`card` и ввод адреса  
- **«Далее»** (`payViewDone`) при валидности → переход к контактам  

**Шаг B — ContactView**

- Ввод `email` и `phone`  
- **«Далее»** (`contactViewDone`) при валидности → переход к финалу  

**Шаг C — OrderDoneView**

- Показывается итог: списание `totalPrice`  
- Кнопка **«Закрыть»** → событие `orderDone` → `OrderController.postToServer()`, очистка моделей, закрытие попапа  

**Изменения:**  
- `OrderModel` заполняется (`items`, `totalPrice`, `address`, `pay*`, `email`, `phone`)  
- После успешного заказа: `OrderModel.reset()`, `BinModel.items = []`


## 🌐 Архитектура проекта — визуальная схема

```text
   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
   │  ShopModel  │       │ BinModel    │       │  OrderModel │
   └──────┬──────┘       └──────┬──────┘       └──────┬──────┘
          │ items               │ items               │ данные заказа
          ▼                     ▼                     ▼
   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
   │ ShopView    │       │ BinView     │       │ PayView     │
   │ ItemShopView│       │ BinIconView │       └─────────────┘
   │ ItemPopupView│      │ ItemCompact │       ┌─────────────┐
   └──────┬──────┘       └──────┬──────┘       │ContactView  │
          │ click              │ click         └──────┬──────┘
          ▼                    ▼                   validate
   ┌─────────────┐       ┌─────────────┐            ▼
   │ShopController│      │BinController│       ┌─────────────┐
   └──────┬──────┘       └──────┬──────┘       │OrderDoneView│
          │ addToBin/removeFromBin │ orderDone └─────────────┘
          └────────────────────────┘
                события



