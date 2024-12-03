export class Order {
  id: string;
  buyerId: string; // ID of the buyer (User)
  bookId: string; // ID of the book being ordered
  amount: number;
}
