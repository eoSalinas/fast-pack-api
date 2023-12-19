import { makeRecipient } from '@/domain/test/factories/make-recipient'
import { InMemoryRecipientsRepository } from '@/domain/test/repositories/in-memory-recipients-repository'
import { DeleteRecipientUseCase } from './delete-recipient'

let inMemoryRecipientsRepository: InMemoryRecipientsRepository
let sut: DeleteRecipientUseCase

describe('Delete Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository()
    sut = new DeleteRecipientUseCase(inMemoryRecipientsRepository)
  })

  it('should be able to delete a recipient', async () => {
    const recipient = makeRecipient()

    inMemoryRecipientsRepository.items.push(recipient)

    const recipientId = recipient.id.toString()

    await sut.execute({
      recipientId,
    })

    expect(inMemoryRecipientsRepository.items).toHaveLength(0)
  })
})
