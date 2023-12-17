import { Recipient } from '@/domain/enterprise/entities/recipient'

export interface RecipientsRepository {
  findById(id: string): Promise<Recipient | null>
  create(recipient: Recipient): Promise<void>
}
