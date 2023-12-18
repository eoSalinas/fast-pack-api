import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface DeliveryOrderUseCaseRequest {
  orderId: string
}

interface DeliveryOrderUseCaseReponse {
  order: Order
}

export class DeliveryOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: DeliveryOrderUseCaseRequest): Promise<DeliveryOrderUseCaseReponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found.')
    }

    order.deliveredAt = new Date()

    await this.ordersRepository.save(order)

    return {
      order,
    }
  }
}
