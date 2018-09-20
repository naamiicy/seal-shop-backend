export class Product{
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    cetegory: string;

    constructor(id,title,cetegory:string, price:number ,imageUrl){
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.cetegory = cetegory;
    }
}