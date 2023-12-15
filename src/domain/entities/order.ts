import { Entity } from '../../core/entities/entity'
import { UniqueEntityID } from '../../core/entities/unique-entity-id'
import { Optional } from '../../core/types/optional'

interface OrderProps {
  recipientId: UniqueEntityID
  deliverymanId: UniqueEntityID
  createdAt: Date
  availablePickupAt?: Date
  withdrawedAt?: Date
  deliveredAt?: Date
  returnedAt?: Date
}

export class Order extends Entity<OrderProps> {
  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID) {
    const order = new Order(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return order
  }
}
