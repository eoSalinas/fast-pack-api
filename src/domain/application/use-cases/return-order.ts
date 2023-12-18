import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface ReturnOrderUseCaseRequest {
  orderId: string
}

interface ReturnOrderUseCaseReponse {
  order: Order
}

export class ReturnOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: ReturnOrderUseCaseRequest): Promise<ReturnOrderUseCaseReponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found.')
    }

    order.deliverymanId = null
    order.returnedAt = new Date()

    await this.ordersRepository.save(order)

    return {
      order,
    }
  }
}
