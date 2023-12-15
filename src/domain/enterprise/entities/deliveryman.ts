import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface DeliverymanProps {
  name: string
  cpf: string
  password: string
}

export class Deliveryman extends Entity<DeliverymanProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  static create(props: DeliverymanProps, id?: UniqueEntityID) {
    const recipient = new Deliveryman(props, id)

    return recipient
  }
}
