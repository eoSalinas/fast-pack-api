import { Recipient } from '@/domain/enterprise/entities/recipient'

export interface RecipientsRepository {
  create(recipient: Recipient): Promise<void>
}
