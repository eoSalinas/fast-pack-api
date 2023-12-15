import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface AdministratorProps {
  name: string
}

export class Administrator extends Entity<AdministratorProps> {
  get name() {
    return this.props.name
  }

  static create(props: AdministratorProps, id?: UniqueEntityID) {
    const administrator = new Administrator(props, id)

    return administrator
  }
}
