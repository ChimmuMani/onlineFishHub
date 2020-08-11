import{Fish} from './fish.model';
export class CartItem {
    id: string;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;
    constructor(fish:Fish){
        this.id = fish.id;
        this.name =fish.name;
        this.imageUrl = fish.imageUrl;
        this.unitPrice = fish.unitPrice;
        this.quantity = 1
    }

}
