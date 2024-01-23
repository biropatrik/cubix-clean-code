
const STANDARD_DISCOUNT: number = 5;
const SILVER_DISCOUNT: number = 10;
const GOLD_DISCOUNT: number = 15;
const INCREASE_DISCOUNT: number = 5;

abstract class Subscription {
    abstract getDiscount(): number;
}

class Standard extends Subscription {
    getDiscount(): number {
        return STANDARD_DISCOUNT;
    }
}

class Silver extends Subscription {
    getDiscount(): number {
        return SILVER_DISCOUNT;
    }
}

class Gold extends Subscription {
    getDiscount(): number {
        return GOLD_DISCOUNT + this.increaseDiscount();
    }

    private increaseDiscount() {
        return INCREASE_DISCOUNT;
    }
}

export class Discount {

    readonly subscriptions: { [level: string]: new () => Subscription } = {
        'standard': Standard,
        'silver': Silver,
        'gold': Gold
    }

    private createSubscription(level: string): Subscription | undefined {
        const Subscription = this.subscriptions[level];
        return Subscription ? new Subscription() : undefined;
    }

    public calculateDiscountPercentage(level: string): number {
        const subscription = this.createSubscription(level);
        if (subscription === undefined) {
            return 0;
        }
        return subscription.getDiscount();
    }
}