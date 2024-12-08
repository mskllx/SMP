// Основний тип для товарів
type ProductBase = {
    id: number;
    title: string;
    cost: number;
};

// Тип для електроніки
type Gadget = ProductBase & {
    type: 'gadget';
    guarantee: string;
};

// Тип для одягу
type Apparel = ProductBase & {
    type: 'apparel';
    dimensions: string;
    fabric: string;
};

// Функція для пошуку товару за ID
function getProductById<T extends ProductBase>(items: T[], productId: number): T | undefined {
    if (!Array.isArray(items) || typeof productId !== 'number') {
        throw new Error("Некоректні вхідні дані");
    }
    return items.find(item => item.id === productId);
}

// Функція для фільтрації товарів за ціною
function filterProductsByCost<T extends ProductBase>(items: T[], maxCost: number): T[] {
    if (!Array.isArray(items) || typeof maxCost !== 'number') {
        throw new Error("Некоректні вхідні дані");
    }
    return items.filter(item => item.cost <= maxCost);
}

// Тип для елементів кошика
type BasketItem<T> = {
    item: T;
    amount: number;
};

// Функція для додавання товару до кошика
function insertToBasket<T extends ProductBase>(
    basket: BasketItem<T>[],
    item: T,
    count: number
): BasketItem<T>[] {
    if (!Array.isArray(basket) || typeof count !== 'number') {
        throw new Error("Некоректні вхідні дані");
    }

    const existing = basket.find(basketItem => basketItem.item.id === item.id);
    if (existing) {
        existing.amount += count;
    } else {
        basket.push({ item, amount: count });
    }
    return basket;
}

// Функція для підрахунку загальної вартості кошика
function computeBasketTotal<T extends ProductBase>(basket: BasketItem<T>[]): number {
    if (!Array.isArray(basket)) {
        throw new Error("Некоректні вхідні дані");
    }

    return basket.reduce((sum, basketItem) => sum + basketItem.item.cost * basketItem.amount, 0);
}

// Приклади даних для електроніки
const gadgets: Gadget[] = [
    { id: 101, title: "Смартфон", cost: 15000, type: 'gadget', guarantee: "3 роки" }
];

// Приклади даних для одягу
const apparels: Apparel[] = [
    { id: 202, title: "Куртка", cost: 2000, type: 'apparel', dimensions: "L", fabric: "бавовна" }
];

// Пошук товару за ID
const smartphone = getProductById(gadgets, 101);

// Кошик покупок
const shoppingBasket: BasketItem<Gadget | Apparel>[] = [];
insertToBasket(shoppingBasket, smartphone as Gadget, 2);

// Розрахунок загальної вартості
const totalCost = computeBasketTotal(shoppingBasket);
console.log("Загальна сума:", totalCost);
