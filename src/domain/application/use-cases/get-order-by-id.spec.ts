import { makeOrder } from '@/domain/test/factories/make-order'
import { InMemoryOrdersRepository } from '@/domain/test/repositories/in-memory-orders-repository'
import { GetOrderByIdUseCase } from './get-order-by-id'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: GetOrderByIdUseCase

describe('Get Order by Id', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new GetOrderByIdUseCase(inMemoryOrdersRepository)
  })

  it('should be able to get a order by id', async () => {
    const newOrder = makeOrder()

    inMemoryOrdersRepository.items.push(newOrder)

    const orderId = newOrder.id.toString()

    const { order } = await sut.execute({
      orderId,
    })

    expect(order).toEqual(newOrder)
    expect(inMemoryOrdersRepository.items).toHaveLength(1)
    expect(inMemoryOrdersRepository.items[0].id).toBe(order.id)
  })
})
