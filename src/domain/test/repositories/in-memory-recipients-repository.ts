import { RecipientsRepository } from '@/domain/application/repositories/recipients-repository'
import { Recipient } from '@/domain/enterprise/entities/recipient'

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }
}
