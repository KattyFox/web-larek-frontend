class  PageHeaderModel {
  public logoUrl: string;
  public name: string;

  constructor(logoUrl: string, name: string) {
    this.logoUrl = logoUrl;
    this.name = name;
  }
}

export {PageHeaderModel};