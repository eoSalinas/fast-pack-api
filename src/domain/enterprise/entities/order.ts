import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface OrderProps {
  recipientId: UniqueEntityID
  deliverymanId: UniqueEntityID | null
  createdAt: Date
  availablePickupAt?: Date
  withdrawedAt?: Date
  deliveredAt?: Date
  returnedAt?: Date
}

export class Order extends Entity<OrderProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get deliverymanId() {
    return this.props.deliverymanId
  }

  set deliverymanId(deliverymanId: UniqueEntityID | null) {
    this.props.deliverymanId = deliverymanId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get availablePickupAt() {
    return this.props.availablePickupAt
  }

  set availablePickupAt(availablePickupAt: Date | undefined) {
    this.props.availablePickupAt = availablePickupAt
  }

  get withdrawedAt() {
    return this.props.withdrawedAt
  }

  set withdrawedAt(withdrawedAt: Date | undefined) {
    this.props.withdrawedAt = withdrawedAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  set deliveredAt(deliveredAt: Date | undefined) {
    this.props.deliveredAt = deliveredAt
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  set returnedAt(returnedAt: Date | undefined) {
    this.props.returnedAt = returnedAt
  }

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
