import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AdministratorProps {
  name: string
  cpf: string
  password: string
}

export class Administrator extends Entity<AdministratorProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  static create(props: AdministratorProps, id?: UniqueEntityID) {
    const administrator = new Administrator(props, id)

    return administrator
  }
}
