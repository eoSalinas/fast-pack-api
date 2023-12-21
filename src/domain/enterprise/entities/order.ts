import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface OrderProps {
  recipientId: UniqueEntityID
  deliverymanId: UniqueEntityID | null
  createdAt: Date
  availablePickupAt?: Date | null
  pickupdAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
  latitude: number
  longitude: number
}

export class Order extends Entity<OrderProps> {
  get recipientId() {
    return this.props.recipientId
  }

  set recipientId(recipientId: UniqueEntityID) {
    this.props.recipientId = recipientId
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

  set availablePickupAt(availablePickupAt: Date | undefined | null) {
    this.props.availablePickupAt = availablePickupAt
  }

  get pickupdAt() {
    return this.props.pickupdAt
  }

  set pickupdAt(pickupdAt: Date | undefined | null) {
    this.props.pickupdAt = pickupdAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  set deliveredAt(deliveredAt: Date | undefined | null) {
    this.props.deliveredAt = deliveredAt
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  set returnedAt(returnedAt: Date | undefined | null) {
    this.props.returnedAt = returnedAt
  }

  get latitude() {
    return this.props.latitude
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
  }

  get longitude() {
    return this.props.longitude
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
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
