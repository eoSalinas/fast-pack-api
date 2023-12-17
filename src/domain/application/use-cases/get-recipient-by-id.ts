import { Recipient } from '@/domain/enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients-repository'

interface GetRecipientByIdUseCaseRequest {
  recipientId: string
}

interface GetRecipientByIdUseCaseReponse {
  recipient: Recipient
}

export class GetRecipientByIdUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    recipientId,
  }: GetRecipientByIdUseCaseRequest): Promise<GetRecipientByIdUseCaseReponse> {
    const recipient = await this.recipientsRepository.findById(recipientId)

    if (!recipient) {
      throw new Error('Recipient not found.')
    }

    return {
      recipient,
    }
  }
}
