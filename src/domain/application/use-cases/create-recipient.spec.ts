import { InMemoryRecipientsRepository } from 'test/repositories/in-memory-recipients-repository'
import { CreateRecipientUseCase } from './create-recipient'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: CreateRecipientUseCase

describe('Create Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    sut = new CreateRecipientUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to create a recipient', async () => {
    const { recipient } = await sut.execute({
      name: 'John Doe',
      cpf: '123123123122',
    })

    expect(recipient.id).toBeTruthy()
    expect(inMemoryRecipientsRepository.items).toHaveLength(1)
    expect(inMemoryRecipientsRepository.items[0]).toEqual(recipient)
  })
})
