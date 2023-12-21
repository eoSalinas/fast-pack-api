import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '../../enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface CreateOrderUseCaseRequest {
  recipientId: string
  deliverymanId: string
  latitude: number
  longitude: number
}

interface CreateOrderUseCaseReponse {
  order: Order
}

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    recipientId,
    deliverymanId,
    latitude,
    longitude,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseReponse> {
    const order = Order.create({
      recipientId: new UniqueEntityID(recipientId),
      deliverymanId: new UniqueEntityID(deliverymanId),
      latitude,
      longitude,
    })

    await this.ordersRepository.create(order)

    return {
      order,
    }
  }
}
