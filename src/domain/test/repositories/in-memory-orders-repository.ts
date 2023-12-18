import { PaginationParams } from '@/core/repositories/pagination-params'
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

  async findManyDeliveriesByDeliverymanId(deliverymanId: string, { page }: PaginationParams): Promise<Order[]> {
    const orders = 
      this.items.filter(
        (item) => item.deliverymanId?.toString() === deliverymanId && !!item.deliveredAt !== false)
        .slice((page - 1) * 20, page * 20)

    return orders
  }

  async create(order: Order): Promise<void> {
    this.items.push(order)
  }

  async save(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => order.id === item.id)

    this.items[itemIndex] = order
  }

  async delete(order: Order): Promise<void> {
    const itemIndex = this.items.findIndex((item) => order.id === item.id)

    this.items.splice(itemIndex, 1)
  }
}
