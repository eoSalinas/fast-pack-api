import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface MarkOrderAvailablePickupUseCaseRequest {
  orderId: string
}

interface MarkOrderAvailablePickupUseCaseReponse {
  order: Order
}

export class MarkOrderAvailablePickupUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: MarkOrderAvailablePickupUseCaseRequest): Promise<MarkOrderAvailablePickupUseCaseReponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found.')
    }

    order.availablePickupAt = new Date()

    await this.ordersRepository.save(order)

    return {
      order,
    }
  }
}
