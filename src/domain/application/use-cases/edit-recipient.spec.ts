import { makeRecipient } from '@/domain/test/factories/make-recipient'
import { InMemoryRecipientsRepository } from '@/domain/test/repositories/in-memory-recipients-repository'
import { EditRecipientUseCase } from './edit-recipient'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: EditRecipientUseCase

describe('Edit Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    sut = new EditRecipientUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to edit a recipient', async () => {
    const newRecipient = makeRecipient()

    inMemoryRecipientsRepository.items.push(newRecipient)

    const recipientId = newRecipient.id.toString()

    const { recipient } = await sut.execute({
      recipientId,
      name: 'New Name',
      cpf: newRecipient.cpf,
    })

    expect(recipient).toEqual(expect.objectContaining({
      name: 'New Name',
    }))
  })
})
