import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order, OrderProps } from '@/domain/enterprise/entities/order'
import { faker } from '@faker-js/faker'

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
): Order {
  const order = Order.create(
    {
      recipientId: new UniqueEntityID(),
      deliverymanId: new UniqueEntityID(),
      createdAt: new Date(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  )

  return order
}
