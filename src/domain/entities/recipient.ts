import { Entity } from '../../core/entities/entity'

interface RecipientProps {
  name: string
}

export class Recipient extends Entity<RecipientProps> {}
