import { OrdersRepository } from '@/domain/application/repositories/orders-repository'
import { Order } from '@/domain/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

  async delete(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => order.id === item.id)

    this.items.splice(itemIndex, 1)
  }
}
