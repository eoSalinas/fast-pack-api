import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface EditOrderUseCaseRequest {
  orderId: string
  recipientId: string
  deliverymanId: string
  availablePickupAt: Date | null
  pickupdAt: Date | null
  deliveredAt: Date | null
  returnedAt: Date | null
  latitude: number
  longitude: number
}

interface EditOrderUseCaseReponse {
  order: Order
}

export class EditOrderUseCase {
  constructor(private ordersDelivery: OrdersRepository) {}

  async execute({
    orderId,
    recipientId,
    deliverymanId,
    availablePickupAt,
    pickupdAt,
    deliveredAt,
    returnedAt,
    latitude,
    longitude,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseReponse> {
    const order = await this.ordersDelivery.findById(orderId)

    if (!order) {
      throw new Error('Order not found.')
    }

    order.recipientId = new UniqueEntityID(recipientId)
    order.deliverymanId = new UniqueEntityID(deliverymanId)
    order.availablePickupAt = availablePickupAt
    order.pickupdAt = pickupdAt
    order.deliveredAt = deliveredAt
    order.returnedAt = returnedAt
    order.latitude = latitude
    order.longitude = longitude

    await this.ordersDelivery.save(order)

    return {
      order,
    }
  }
}
