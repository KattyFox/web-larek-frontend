class ItemModel{
  public title:string;
  public category:string;
  public description: string;
  public imageUrl:string;
  public price:number;

  constructor(title: string, category: string,description: string, imageUrl: string, price: number) {
    this.title = title;
    this.category = category;
    this.description = description;
    this.imageUrl = imageUrl;
    this.price = price;
  }
}



export {ItemModel};