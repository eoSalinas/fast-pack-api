import { makeDeliveryman } from 'test/factories/make-deliveryman'
import { InMemoryDeliverymenRepository } from 'test/repositories/in-memory-deliverymen-repository'
import { DeleteDeliverymanUseCase } from './delete-deliveryman'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let sut: DeleteDeliverymanUseCase

describe('Delete Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    sut = new DeleteDeliverymanUseCase(inMemoryDeliverymenRepository)
  })

  it('should be able to delete a deliveryman', async () => {
    const deliveryman = makeDeliveryman()

    inMemoryDeliverymenRepository.items.push(deliveryman)

    const deliverymanId = deliveryman.id.toString()

    await sut.execute({
      deliverymanId,
    })

    expect(inMemoryDeliverymenRepository.items).toHaveLength(0)
  })
})
