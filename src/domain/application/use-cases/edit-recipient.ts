import { Recipient } from '@/domain/enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients-repository'

interface EditRecipientUseCaseRequest {
  recipientId: string
  name: string
  cpf: string
}

interface EditRecipientUseCaseReponse {
  recipient: Recipient
}

export class EditRecipientUseCase {
  constructor(private recipientsDelivery: RecipientsRepository) {}

  async execute({
    recipientId,
    name,
    cpf,
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseReponse> {
    const recipient = await this.recipientsDelivery.findById(recipientId)

    if (!recipient) {
      throw new Error('Recipient not found.')
    }

    recipient.name = name
    recipient.cpf = cpf

    await this.recipientsDelivery.save(recipient)

    return {
      recipient,
    }
  }
}
