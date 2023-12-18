import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface FetchDeliveriesUseCaseRequest {
  deliverymanId: string
  page: number
}

interface FetchDeliveriesUseCaseReponse {
  orders: Order[]
}

export class FetchDeliveriesUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    deliverymanId,
    page
  }: FetchDeliveriesUseCaseRequest): Promise<FetchDeliveriesUseCaseReponse> {
    const orders = await this.ordersRepository.findManyDeliveriesByDeliverymanId(deliverymanId, { page })

    return {
      orders,
    }
  }
}
