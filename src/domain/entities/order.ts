export class Order {
  public id: string
  public recipientId: string
  public deliverymanId: string

  constructor(id: string, recipientId: string, deliverymanId: string) {
    this.id = id
    this.recipientId = recipientId
    this.deliverymanId = deliverymanId
  }
}
