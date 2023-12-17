import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients-repository'

interface CreateRecipientUseCaseRequest {
  name: string
  cpf: string
}

interface CreateRecipientUseCaseReponse {
  recipient: Recipient
}

export class CreateRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    name,
    cpf,
  }: CreateRecipientUseCaseRequest): Promise<CreateRecipientUseCaseReponse> {
    const recipient = Recipient.create({
      name,
      cpf,
    })

    await this.recipientsRepository.create(recipient)

    return {
      recipient,
    }
  }
}
