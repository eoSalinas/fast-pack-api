import { makeDeliveryman } from '@/domain/test/factories/make-deliveryman'
import { InMemoryDeliverymenRepository } from '@/domain/test/repositories/in-memory-deliverymen-repository'
import { GetDeliverymanByIdUseCase } from './get-deliveryman-by-id'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let sut: GetDeliverymanByIdUseCase

describe('Get Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    sut = new GetDeliverymanByIdUseCase(inMemoryDeliverymenRepository)
  })

  it('should be able to get a deliveryman by id', async () => {
    const newDeliveryman = makeDeliveryman()

    inMemoryDeliverymenRepository.items.push(newDeliveryman)

    const deliverymanId = newDeliveryman.id.toString()

    const { deliveryman } = await sut.execute({
      deliverymanId,
    })

    expect(deliveryman).toEqual(newDeliveryman)
  })
})
