import { Order } from '../../enterprise/entities/order'

export interface OrdersRepository {
  findById(id: string): Promise<Order | null>
  create(order: Order): Promise<void>
  delete(order: Order): Promise<void>
}
