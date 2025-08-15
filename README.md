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

## ShopModel - представляет магазин
- **Содержит**: массив товаров (`items: ItemModel[]`)
- **Связь с ItemModel**: отношение композиции (🞈 на стороне ShopModel)  
  Это означает, что ShopModel владеет ItemModel, и при удалении ShopModel удаляются все связанные ItemModel.

## ItemModel - представляет товар/продукт
**Поля модели:**
- `title` (название)
- `category` (категория)
- `description` (описание)
- `imageUrl` (ссылка на изображение)
- `price` (цена)

## OrderModel - представляет заказ
**Содержит:**
- Способы оплаты:
  - `payCard` (оплата картой)
  - `payCash` (оплата наличными)
- Данные доставки:
  - `address` (адрес)
  - `email` (электронная почта)
  - `phone` (телефон)
- `items: ItemModel[]` (список товаров)
- `totalPrice` (общая стоимость заказа)

**Связь с ItemModel**: отношение композиции.

## PayView - представление для оплаты
**Содержит:**
- `template` (HTML-шаблон)
- `model` (связанная OrderModel)
- `eventDispatcher` (HTMLElement для обработки событий)

**Связь с OrderModel**: обычная ассоциация (→).

## BinModel (корзина покупок)
- **Связь с ItemModel**: отношение композиции (аналогично ShopModel и OrderModel).

<img width="475" height="546" alt="VLBDIWCn4BxdAOOz5dhmce8KVq31Oi7gHJoacs4ta4sM95MAU1GFYZw3ho2AQCLdoBwHsUrFjXOzX66-RpxccvdqhMF6JGf9KbOweHNuP_zIFVdtwW7yfvzLZzMTVmlGVNKB_ij_-zUGpiBx82ILp5euoNKvq1mbN1C0uR2m50v3QC3pYnuXDsHPlCBhsd8obY859vn4QfqHAkj5E6KEC" src="https://github.com/user-attachments/assets/0f5b552f-dda4-4459-9394-b74a16c181a1" />



### **Основные компоненты:**

#### **1. Модели данных:**

###**ItemModel (Товар)**###

typescript

{

title: string; // Название товара

category: string; // Категория

description: string; // Описание

imageUrl: string; // URL изображения

price: number; // Цена

}

Отвечает за:

-   Хранение информации о товаре

-   Единое представление продукта в системе

**ShopModel (Каталог)**

typescript

{

items: ItemModel\[\]; // Все товары магазина

}

Отвечает за:

-   Хранение полного ассортимента

-   Поиск и фильтрацию товаров

**OrderModel (Заказ)**

typescript

{

payCard: boolean; // Способ оплаты

payCash: boolean;

address: string; // Данные доставки

email: string;

phone: string;

items: ItemModel\[\]; // Состав заказа

totalPrice: number; // Итоговая сумма

}

Отвечает за:

-   Оформленные заказы

-   Расчет итоговой стоимости

#### **2. Представление:**

**PayView**

-   Отображает интерфейс оплаты

-   Связано с OrderModel для получения данных

-   Использует HTML-шаблон (template)

### **Ключевые взаимосвязи:**

1.  **Агрегация товаров**:

    -   ShopModel содержит множество ItemModel (1 → \*)

    -   BinModel (корзина) содержит множество ItemModel (1 → \*)

    -   OrderModel содержит множество ItemModel (1 → \*)

2.  **Использование данных**:

    -   PayView использует данные из OrderModel (1 → 1)

### **Особенности архитектуры:**

1.  **Централизованная модель товара**:

    -   ItemModel используется во всех компонентах системы

    -   Единообразное представление продукта

2.  **Разделение ответственности**:

    -   ShopModel - каталог товаров

    -   BinModel - временное хранение выбора

    -   OrderModel - завершенные транзакции

3.  **Гибкость**:

    -   Легкое добавление новых полей в ItemModel

    -   Возможность расширения функционала

### **Паттерны:**

1.  **Композиция**:

    -   Модели высшего уровня содержат коллекции ItemModel

2.  **Singleton** (подразумевается):

    -   ShopModel и BinModel обычно существуют в единственном экземпляре

3.  **Data Transfer Object**:

    -   ItemModel служит для передачи данных между слоями


Эта архитектура обеспечивает:\
✔ Согласованность данных во всей системе\
✔ Легкую интеграцию новых модулей\
✔ Эффективную работу с товарными данными\
✔ Масштабируемость решения


<img width="635" height="816" alt="image" src="https://github.com/user-attachments/assets/bc038ba0-d7f3-4e8a-89b3-257e09695779" />



####  I.I. OrderModel ####

**Взаимодействие Моделей с Отображениями и Контроллерами: ** 

1.  **OrderModel** -- хранит данные заказа:

    -   Способ оплаты (payCard, payCash)

    -   Контактные данные (address, email, phone)

    -   Состав заказа (items, totalPrice)

2.  **PayView** -- отображает форму выбора способа оплаты.

3.  **ContactView** -- форма ввода контактных данных.

4.  **OrderDoneView** -- экран подтверждения успешного оформления
    > заказа.

5.  **OrderController** -- управляет процессом:

    -   Переключает экраны (startPay(), startContactView(),
        > startOrderDoneView()).

    -   Обрабатывает завершение заказа (orderDone()).

#### **Взаимодействие:**

-   **OrderModel** передает данные во все представления (PayView,
    > ContactView, OrderDoneView).

-   **OrderController** координирует переходы между экранами и обработку
    > данных.

-   Представления (PayView, ContactView, OrderDoneView) используют
    > шаблоны (HTMLTemplateElement) для рендеринга и отправляют события
    > через eventDispatcher.

**Процесс:**

1.  Пользователь выбирает способ оплаты (PayView).

2.  Вводит контактные данные (ContactView).

3.  После подтверждения (OrderController.orderDone()) отображается экран
    > успешного заказа (OrderDoneView).

Система обеспечивает четкое разделение данных (OrderModel), отображения
(Views) и логики (OrderController).

<img width="803" height="356" alt="image" src="https://github.com/user-attachments/assets/d4f7ae14-c30f-4dd0-a979-5a44bf835286" />


**II. ItemModel**

#### **Основные компоненты:**

1.  **ItemModel** -- модель данных товара:
    -   title -- название товара.
    -   category -- категория.
    -   description -- описание.
    -   imageUrl -- ссылка на изображение.
    -   price -- цена.

2.  **OrderModel** -- модель заказа (содержит массив ItemModel\[\]).

    -   Также включает данные оплаты (payCard, payCash), контакты
        > (address, email, phone), общую стоимость (totalPrice).
    -   Метод reset() -- очистка данных заказа.

3.  **BinModel** -- модель корзины:

    -   Список товаров (items: ItemModel\[\]).
    -   Метод createCard() -- создает карточку товара в корзине.

4.  **Представления товара:**

    -   **ItemShopView** -- отображение товара в магазине (использует
        > ShopController).
    -   **ItemCompactView** -- компактная карточка товара (например, в
        > списках).
    -   **ItemPopupView** -- всплывающее окно с деталями товара.

#### **Взаимодействие:**

-   **ItemModel** передается в:

    -   ItemShopView, ItemCompactView, ItemPopupView -- для отображения
        > в разных форматах.
    -   BinModel -- для добавления в корзину.
    -   OrderModel -- для формирования заказа.

-   Представления (ItemShopView, ItemCompactView, ItemPopupView)
    > используют **HTML-шаблоны** (HTMLTemplateElement) для рендеринга и
    > могут отправлять события через eventDispatcher.

**Процесс:**

1.  Товар (ItemModel) отображается в магазине (ItemShopView), в
    > компактном виде (ItemCompactView) или во всплывающем окне
    > (ItemPopupView).

2.  При добавлении в корзину (BinModel) товар попадает в список items.

3.  При оформлении заказа (OrderModel) товары из корзины переносятся в
    > заказ.

Система обеспечивает:

-   Гибкое отображение товара в разных интерфейсах.
-   Связь между товарами, корзиной и заказом.
-   Использование шаблонов для единообразия визуального представления.

<img width="865" height="278" alt="image" src="https://github.com/user-attachments/assets/f4c39145-0401-4dce-b006-e4b1ae63a76a" />


###**III. BinModel**###

 **Описание компонентов:**

1.  **BinModel** (Модель):

    -   Хранит состояние корзины: массив товаров (items: ItemModel\[\]).
    -   Метод createCard() (возможно, создает виртуальную \"карту\"
        > заказа).

2.  **BinController** (Контроллер):

    -   Управляет логикой: добавление/удаление товаров (addItem(),
        > removeItem()), проверка наличия (containsItem()).
    -   Координирует обновление представлений:
    -   binIconView (иконка корзины с количеством товаров).
    -   binView (полное отображение корзины).
    -  popupView (всплывающие уведомления).
    -   Использует eventDispatcher (например, кастомные события) для
        > связи между компонентами.

3.  **Представления (View):**

    -   **BinView**:
    -   Рендерит основное содержимое корзины (список товаров через
            > ItemCompactView).
    -   Метод create() генерирует HTML-структуру на основе template.

    -   **BinIconView**:
    -   Отображает иконку корзины (например, в шапке сайта) и
            > обновляет счетчик товаров (updBinQuantityItems()).

### **Взаимодействие:**

-   **Модель (BinModel)** оповещает **Контроллер (BinController)** об
    > изменениях.
-   **Контроллер** обновляет **Представления** (BinView, BinIconView,
    > PopupView).
-   **Представления** могут отправлять события (через eventDispatcher)
    > для обратной связи.

### **Паттерны и особенности:**

-   **Классический MVC** с модификациями (если View слушают Model
    > напрямую).
-   **Event-Driven Architecture** (использование eventDispatcher для
    > слабой связанности).
-   **Reactive Updates** (иконка корзины автоматически обновляется при
    > изменении модели).


<img width="825" height="391" alt="image" src="https://github.com/user-attachments/assets/b8fe753c-f5a0-4866-9e24-bc2a2b73e404" />


**IV. ShopModel**

### **Описание компонентов:**

#### **1. ShopModel (Модель данных)**

-   **Хранит массив товаров (items: ItemModel\[\]).**
-   **Служит источником данных для ShopView и ShopController.**

#### **2. ShopView (Представление каталога)**

-   **Отвечает за отображение товаров на странице.**
-   **Содержит:**
-   **container (HTML-элемент для рендеринга).**
-   **itemShopView (компонент отображения отдельного товара).**

 **Методы:**
-   **appendCard() -- добавляет карточку товара.**
-   **append() -- общий метод для вставки контента (возможно, для
        > пагинации или фильтрации).**

#### **3. ShopController (Контроллер логики)**

-   **Управляет взаимодействием пользователя с каталогом:**
-   **clickOnShopItemToShow() -- открывает детали товара (например,
        > через PopupView).**
-   **clickOnShopItemToAddToBasket() -- добавляет товар в корзину
        > (через binController).**
-   **clickOnShopItemToRemoveToBasket() -- удаляет товар из
        > корзины.**

-   **Использует:**
    -   **popup и itemPopupView для показа деталей товара.**
    -   **binController для связи с корзиной.**
    -   **eventDispatcher для обработки событий (например, кликов).**

### **Взаимодействие:**

-   **Поток данных:\
    > ShopModel → (ShopView \| ShopController) → (Рендеринг или
    > действия).**

-   **Поток событий:\
    > Пользователь кликает на товар → ShopController обрабатывает
    > действие → Обновляет BinController или показывает PopupView.**

### **Особенности архитектуры:**
-   **ShopController делегирует работу с корзиной binController, а
        > не управляет ей напрямую.**
-   **Использование eventDispatcher позволяет гибко обрабатывать
        > события.**

-   **Reactive-подход:**
-   **Если ShopModel изменится (например, фильтрация), ShopView
        > автоматически обновит интерфейс.**


<img width="787" height="470" alt="image" src="https://github.com/user-attachments/assets/7c261dc8-c0fe-465e-a83d-9e898c3c70a6" />


### Итоговая таблица связей: ###

<img width="695" height="457" alt="image" src="https://github.com/user-attachments/assets/cb43d19d-989b-4649-96f5-3357cc1d3dcd" />


Взаимодействие Вьюх и контроллеров\

II.I

### ShopController ###

#### **1. ShopController (Главный контроллер магазина)**

-   **Зависимости**:
    -   ShopModel (данные товаров).
    -   BinController (управление корзиной).
    -   PopupView (всплывающие окна).

-   **Методы**:

    -   clickOnShopItemToShow() -- открывает попап с деталями товара
        > (PopupView + itemPopupView).
    -   clickOnShopItemToAddToBasket() / RemoveToBasket() -- делегирует
        > действия в BinController.

-   **Роль**:

    -   Центральный координатор между каталогом товаров, корзиной и
        > UI-элементами.


<img width="813" height="611" alt="image" src="https://github.com/user-attachments/assets/9f8bcbf5-f917-4d61-86d4-d7b229d5f8af" />



#### **2. BinController (Контроллер корзины)**

-   Управляет:

    -   BinModel (состояние корзины).
    -   BinView / BinIconView (отображение корзины и иконки).
    -   PopupView (уведомления).

-   **Методы**:

    -   addItem() / removeItem() -- изменение состава корзины.
    -   updateIcon() -- обновление счетчика в иконке.

#### **3. ShopModel (Модель данных магазина)**

-   Просто хранит массив товаров (items: ItemModel\[\]).

#### **4. PopupView (Вспомогательное View)**

-   Отвечает за показ/скрытие модальных окон (show(), hide()).

### **Взаимодействие:**

1.  Пользователь кликает на товар в магазине →

    -   ShopController обрабатывает событие:
    -   Показывает детали (PopupView).
    -   Добавляет/удаляет товар через BinController.

2.  BinController обновляет:

    -   Состояние корзины (BinModel).
    -   UI (BinView, BinIconView).

### **Особенности архитектуры:**

-   **Разделение ответственности**:
-   ShopController не управляет корзиной напрямую, а делегирует это
        > BinController.
-   **Использование событий**:
    -   Оба контроллера используют eventDispatcher для коммуникации
        > (слабая связанность).

-   **Переиспользуемые компоненты**:

    -   PopupView используется как для деталей товара, так и для
        > уведомлений корзины.

### **Паттерны:**

1.  **Facade (Фасад)**:

    -   ShopController упрощает сложные взаимодействия (корзина, попапы)
        > для внешнего кода.

2.  **Mediator (Посредник)**:

    -   ShopController согласует работу BinController и PopupView.

3.  **Observer/Event-Driven**:

    -   Общение через eventDispatcher (например, клик → событие →
        > обработка).

<img width="867" height="607" alt="image" src="https://github.com/user-attachments/assets/5b6bf250-2b48-4137-8415-685c50f48d3b" />

###**Orderontroler**###

# OrderController и связанные компоненты


# Управление процессом оформления заказа

Этот модуль реализует логику оформления заказа в приложении: от выбора способа оплаты до завершения покупки и подтверждения пользователю.  
Он построен на взаимодействии контроллера, модели и нескольких представлений (View), каждый из которых отвечает за свою часть процесса.

---

## Архитектура

Процесс оформляется по следующему сценарию:
1. Пользователь инициирует оформление заказа.
2. OrderController управляет последовательным показом экранов:
   - Оплата (PayView)
   - Ввод контактных данных (ContactView)
   - Подтверждение заказа (OrderDoneView)
3. OrderModel хранит все данные заказа.
4. Представления обновляют модель и отправляют события обратно контроллеру.

---

## Классы

### OrderController
Роль: Центральный управляющий компонент. Контролирует переход между этапами заказа, получает события от представлений и обновляет модель.  
Взаимодействует с:
- OrderModel — для чтения и записи данных заказа.
- PayView, ContactView, OrderDoneView — для отображения соответствующих экранов.
- PopupView — для отображения дополнительных всплывающих сообщений.
- eventDispatcher — для передачи событий между компонентами.

Свойства:
- popupView: PopupView — окно с дополнительной информацией или подтверждением.
- payView: PayView — экран выбора и подтверждения оплаты.
- contactView: ContactView — экран ввода контактных данных клиента.
- orderDoneView: OrderDoneView — экран завершения заказа.
- model: OrderModel — данные заказа.
- eventDispatcher: HTMLElement — механизм обмена событиями.

Методы:
- startPay() — запускает процесс выбора и подтверждения способа оплаты.
- startContactView() — переходит к вводу контактных данных.
- startOrderDoneView() — отображает итоговый экран заказа.
- oderDone() — завершает заказ и фиксирует результат.

---

### OrderModel
Роль: Хранилище данных заказа. Содержит информацию о товарах, способе оплаты и контактных данных клиента.  
Взаимодействует с:
- OrderController — получает и передает актуальные данные.
- Представления (PayView, ContactView) — обновляют данные в процессе оформления.

Свойства:
- payCard: boolean — выбран способ оплаты картой.
- payCash: boolean — выбран способ оплаты наличными.
- address: string — адрес доставки.
- email: string — адрес электронной почты клиента.
- phone: string — номер телефона клиента.
- items: ItemModel[] — список выбранных товаров.
- totalPrice: number — итоговая сумма заказа.

---

### PayView
Роль: Отображает форму выбора способа оплаты и передает выбранные данные в модель заказа.  
Взаимодействует с:
- OrderModel — для записи выбранного способа оплаты.
- eventDispatcher — отправляет событие о завершении выбора оплаты контроллеру.

Свойства:
- template: HTMLTemplateElement — HTML-шаблон интерфейса оплаты.
- model: OrderModel — текущий заказ.
- eventDispatcher: HTMLElement — отправка событий в контроллер.

---

### ContactView
Роль: Отвечает за отображение и обработку формы контактных данных клиента. После заполнения передает данные в модель.  
Взаимодействует с:
- OrderModel — для записи контактной информации.
- eventDispatcher — для передачи контроллеру события о завершении ввода данных.

Свойства:
- template: HTMLTemplateElement — HTML-шаблон формы контактов.
- model: OrderModel — текущий заказ.
- eventDispatcher: HTMLElement — отправка событий в контроллер.

Методы:
- create() — инициализирует и отображает форму для ввода контактных данных.

---

## Поток данных

1. OrderController инициализирует процесс оформления заказа.
2. Пользователь выбирает способ оплаты в PayView, данные сохраняются в OrderModel.
3. Пользователь вводит контакты в ContactView, модель обновляется.
4. OrderController вызывает OrderDoneView для финального подтверждения.
5. Процесс завершается методом oderDone().

<img width="1019" height="471" alt="lLFDIWCn4BxlK-JO7le2Mv12AoXOsaFn8XxItS4kP9CbIHKfGWlYrOVm1KGeYjRw2jatwYJPPLFjnOD2VcQ-BydCV4DwIbEfvpcB4bheJ71YdinNkJJFviLycBNvD6zcJHoqBH_CkboLAxCr6uBkFSwbsTJdoaTYNl7YEqxSeoXXL2aoaYd8lk1Q2iP0BY922b7CY_CCRaXCnhNTjGIzj" src="https://github.com/user-attachments/assets/27c42754-3872-4f30-87b4-c48c7b2087ba" />


### **События в проекте**

#### **1. Стандартные события**

<img width="731" height="375" alt="image" src="https://github.com/user-attachments/assets/f2eb439e-ef48-46f8-80f1-16825a1e2026" />


#### **2. Кастомные события**

<img width="756" height="935" alt="image" src="https://github.com/user-attachments/assets/2b12e2c2-0728-4cb2-adc6-aaf95f38ab87" />


### **Как работают кастомные события?**

1.  **Создание события** (new CustomEvent):\
    > ts

eventDispatcher.addEventListener(\"addToBin\", (e) =\> {

console.log(\"Товар добавлен:\", e.detail);

1.  });

### **САММАРИ**

-   **Стандартные события** (click, input) используются для базового
    > взаимодействия с DOM.

-   **Кастомные события** (addToBin, orderDone) обеспечивают связь между
    > модулями (например, между View и Controller).

-   **Паттерн Event Bus**: eventDispatcher (HTMLElement) выступает как
    > центральный шинопровод для событий.

const event = new CustomEvent(\"addToBin\", { detail: item });

**Отправка события** (dispatchEvent):\
ts

this.eventDispatcher.dispatchEvent(event);

**Обработка события** (addEventListener):\
ts
