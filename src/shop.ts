class ShoppingCart {
    private items: CartItem[] = [];

    constructor() { }

    addItem(product: string, price: number): void {
        const newItem = new CartItem(product, price);
        this.items.push(newItem);
    }

    calculateTotal(): number {
        let total = 0;
        for (const item of this.items) {
            total += item.getPrice();
        }
        return total;
    }
}

class CartItem {
    private product: string;
    private price: number;

    constructor(product: string, price: number) {
        this.product = product;
        this.price = price;
    }

    public getProduct() {
        return this.product;
    }

    public getPrice() {
        return this.price;
    }

    public setProduct(product: string) {
        this.product = product;
    }

    public setPrice(price: number) {
        this.price = price;
    }
}