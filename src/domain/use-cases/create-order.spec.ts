import { InMemoryOrdersRepository } from '../test/repositories/in-memory-orders-repository'
import { CreateOrderUseCase } from './create-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: CreateOrderUseCase

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new CreateOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to create a order', async () => {
    const { order } = await sut.execute({
      recipientId: 'recipient-1',
      deliverymanId: 'deliveryman-1',
    })

    expect(order.id).toBeTruthy()
    expect(inMemoryOrdersRepository.items).toHaveLength(1)
    expect(inMemoryOrdersRepository.items[0]).toEqual(order)
  })
})
