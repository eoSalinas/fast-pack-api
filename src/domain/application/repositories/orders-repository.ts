import { PaginationParams } from '@/core/repositories/pagination-params'
import { Order } from '../../enterprise/entities/order'

export interface OrdersRepository {
  findById(id: string): Promise<Order | null>
  findManyDeliveriesByDeliverymanId(deliverymanId: string, params: PaginationParams): Promise<Order[]>
  create(order: Order): Promise<void>
  save(order: Order): Promise<void>
  delete(order: Order): Promise<void>
}
