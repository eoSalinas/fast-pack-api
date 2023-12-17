import { Recipient } from '@/domain/enterprise/entities/recipient'
import { InMemoryRecipientsRepository } from '@/domain/test/repositories/in-memory-recipients-repository'
import { GetRecipientByIdUseCase } from './get-recipient-by-id'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: GetRecipientByIdUseCase

describe('Get Recipient by Id', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    sut = new GetRecipientByIdUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to get a recipient by id', async () => {
    const newRecipient = Recipient.create({
      name: 'John Doe',
      cpf: '12312312322',
    })

    inMemoryRecipientsRepository.items.push(newRecipient)

    const recipientId = newRecipient.id.toString()

    const { recipient } = await sut.execute({
      recipientId,
    })

    expect(recipient).toEqual(newRecipient)
    expect(inMemoryRecipientsRepository.items[0].id).toBe(recipient.id)
  })
})
