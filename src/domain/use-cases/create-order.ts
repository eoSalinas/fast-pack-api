import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '../entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface CreateOrderUseCaseRequest {
  recipientId: string
  deliverymanId: string
}

interface CreateOrderUseCaseReponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    recipientId,
    deliverymanId,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseReponse> {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
      deliverymanId: new UniqueEntityID(deliverymanId),
    })

    await this.ordersRepository.create(order)

    return {
      order,
    }
  }
}
