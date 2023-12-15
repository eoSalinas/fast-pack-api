import { Entity } from '../../core/entities/entity'
import { UniqueEntityID } from '../../core/entities/unique-entity-id'

interface OrderProps {
  recipientId: UniqueEntityID
  deliverymanId: UniqueEntityID
  createdAt: Date
  availablePickupAt?: Date
  withdrawedAt?: Date
  deliveredAt?: Date
  returnedAt?: Date
}

export class Order extends Entity<OrderProps> {}
