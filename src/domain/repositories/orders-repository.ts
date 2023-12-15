import { Order } from '../entities/order'

export interface OrdersRepository {
  create(order: Order): Promise<void>
}
