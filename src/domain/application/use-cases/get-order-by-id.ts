import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface GetOrderByIdUseCaseRequest {
  orderId: string
}

interface GetOrderByIdUseCaseReponse {
  order: Order
}

export class GetOrderByIdUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: GetOrderByIdUseCaseRequest): Promise<GetOrderByIdUseCaseReponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found.')
    }

    return {
      order,
    }
  }
}
