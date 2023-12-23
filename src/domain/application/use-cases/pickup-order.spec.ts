import { makeOrder } from 'test/factories/make-order'
import { InMemoryOrdersRepository } from 'test/repositories/in-memory-orders-repository'
import { PickupOrderUseCase } from './pickup-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: PickupOrderUseCase

describe('Pickup Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new PickupOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to pickup an order', async () => {
    const newOrder = makeOrder()

    inMemoryOrdersRepository.items.push(newOrder)

    const orderId = newOrder.id.toString()

    const { order } = await sut.execute({
      orderId,
    })

    expect(order.pickupdAt).toEqual(expect.any(Date))
    expect(inMemoryOrdersRepository.items[0].pickupdAt).toEqual(
      expect.any(Date),
    )
  })
})
