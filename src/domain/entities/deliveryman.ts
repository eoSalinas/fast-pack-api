import { Entity } from '../../core/entities/entity'
import { UniqueEntityID } from '../../core/entities/unique-entity-id'

interface DeliverymanProps {
  name: string
}

export class Deliveryman extends Entity<DeliverymanProps> {
  static create(props: DeliverymanProps, id?: UniqueEntityID) {
    const recipient = new Deliveryman(props, id)

    return recipient
  }
}
