import { Entity } from '../../core/entities/entity'

interface AdministratorProps {
  name: string
}

export class Administrator extends Entity<AdministratorProps> {}
