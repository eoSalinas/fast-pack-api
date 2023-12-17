import { OrdersRepository } from '../repositories/orders-repository'

interface DeleteOrderUseCaseRequest {
  orderId: string
}

interface DeleteOrderUseCaseReponse {}

export class DeleteOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    orderId,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUseCaseReponse> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new Error('Order not found.')
    }

    await this.ordersRepository.delete(order)

    return {}
  }
}
