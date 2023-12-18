import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface RecipientProps {
  name: string
  cpf: string
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get cpf() {
    return this.props.cpf
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf
  }

  static create(props: RecipientProps, id?: UniqueEntityID) {
    const recipient = new Recipient(props, id)

    return recipient
  }
}
