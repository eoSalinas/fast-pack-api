import { makeOrder } from 'test/factories/make-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { DeliveryOrderUseCase } from './delivery-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: DeliveryOrderUseCase

describe('Delivery Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new DeliveryOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to delivery an order', async () => {
    const newOrder = makeOrder()

    inMemoryOrdersRepository.items.push(newOrder)

    const orderId = newOrder.id.toString()

    const { order } = await sut.execute({
      orderId,
    })

    expect(order.deliveredAt).toEqual(expect.any(Date))
    expect(inMemoryOrdersRepository.items[0].deliveredAt).toEqual(
      expect.any(Date),
    )
  })
})
