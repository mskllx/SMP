import {
    getProductById,
    filterProductsByCost,
    insertToBasket,
    computeBasketTotal,
    ProductBase,
    Gadget,
    BasketItem
} from '../index';

describe("getProductById", () => {
    it("повинно повертати товар з вказаним ID", () => {
        const items: Gadget[] = [
            { id: 101, title: "Смартфон", cost: 15000, type: "gadget", guarantee: "3 роки" },
            { id: 102, title: "Ноутбук", cost: 50000, type: "gadget", guarantee: "2 роки" }
        ];
        const result = getProductById(items, 101);
        expect(result).toEqual(items[0]);
    });

    it("повинно повертати undefined, якщо товар не знайдено", () => {
        const items: Gadget[] = [];
        const result = getProductById(items, 999);
        expect(result).toBeUndefined();
    });
});

describe("filterProductsByCost", () => {
    it("повинно повертати товари у межах заданої ціни", () => {
        const items: ProductBase[] = [
            { id: 101, title: "Смартфон", cost: 15000 },
            { id: 102, title: "Футболка", cost: 500 },
            { id: 103, title: "Ноутбук", cost: 50000 }
        ];
        const result = filterProductsByCost(items, 15000);
        expect(result).toEqual([items[0], items[1]]);
    });
});

describe("insertToBasket", () => {
    it("повинно додавати новий товар у кошик", () => {
        const basket: BasketItem<Gadget>[] = [];
        const item: Gadget = { id: 101, title: "Смартфон", cost: 15000, type: "gadget", guarantee: "3 роки" };
        const result = insertToBasket(basket, item, 1);
        expect(result).toHaveLength(1);
        expect(result[0].amount).toBe(1);
    });

    it("повинно збільшувати кількість, якщо товар вже у кошику", () => {
        const item: Gadget = { id: 101, title: "Смартфон", cost: 15000, type: "gadget", guarantee: "3 роки" };
        const basket: BasketItem<Gadget>[] = [{ item, amount: 1 }];
        const result = insertToBasket(basket, item, 1);
        expect(result[0].amount).toBe(2);
    });
});

describe("computeBasketTotal", () => {
    it("повинно розраховувати загальну суму кошика", () => {
        const basket: BasketItem<ProductBase>[] = [
            { item: { id: 101, title: "Смартфон", cost: 15000 }, amount: 2 },
            { item: { id: 102, title: "Футболка", cost: 500 }, amount: 3 }
        ];
        const total = computeBasketTotal(basket);
        expect(total).toBe(31500); // 15000 * 2 + 500 * 3
    });
});
