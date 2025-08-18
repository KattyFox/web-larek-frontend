class ItemModel{
  public title:string;
  public category:string;
  public description: string;
  public price:number;
  public image:string;
  public id:string;

  constructor(title: string, category: string,description: string, price: number, image :string , id:string) {
    this.title = title;
    this.category = category;
    this.description = description;
    this.price = price;
    this.image = image;
    this.id = id;
  }
}



export {ItemModel};