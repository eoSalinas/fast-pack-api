import { Recipient } from '@/domain/enterprise/entities/recipient'
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
    const newRecipient = Recipient.create({
      name: 'John Doe',
      cpf: '12312312322'
    })

    inMemoryRecipientsRepository.items.push(newRecipient)

    const recipientId = newRecipient.id.toString()

    const { recipient } = await sut.execute({
      recipientId,
      name: 'New Name',
      cpf: '12312312322',
    })

    expect(recipient).toEqual(expect.objectContaining({
      name: 'New Name',
      cpf: '12312312322',
    }))
  })
})
