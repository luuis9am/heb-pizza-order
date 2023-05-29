export interface PlacedPizzaOrder {
  Crust: string;
  Flavor: string;
  Order_ID: number;
  Size: string;
  Table_No: number;
  Timestamp: string;
}

export interface NewPizzaOrder {
  Crust: string;
  Flavor: string;
  Size: string;
  Table_No: number;
}
