import { RecipientsRepository } from '@/domain/application/repositories/recipients-repository'
import { Recipient } from '@/domain/enterprise/entities/recipient'

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = []

  async findById(id: string): Promise<Recipient | null> {
    const order = this.items.find((item) => item.id.toString() === id)

    if (!order) {
      return null
    }

    return order
  }

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }
  
  async save(recipient: Recipient): Promise<void> {
    const itemIndex = this.items.findIndex((item) => recipient.id === item.id)

    this.items[itemIndex] = recipient
  }

  async delete(recipient: Recipient): Promise<void> {
    const itemIndex = this.items.findIndex((item) => recipient.id === item.id)

    this.items.splice(itemIndex, 1)
  }
}
