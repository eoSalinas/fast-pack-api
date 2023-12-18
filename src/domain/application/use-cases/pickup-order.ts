import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface PickupOrderUseCaseRequest {
  orderId: string
}

interface PickupOrderUseCaseReponse {
  order: Order
}

export class PickupOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: PickupOrderUseCaseRequest): Promise<PickupOrderUseCaseReponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found.')
    }

    order.pickupdAt = new Date()

    await this.ordersRepository.save(order)

    return {
      order,
    }
  }
}
