import { Entity } from '../../core/entities/entity'

interface OrderProps {
  recipientId: string
  deliverymanId: string
}

export class Order extends Entity<OrderProps> {}
