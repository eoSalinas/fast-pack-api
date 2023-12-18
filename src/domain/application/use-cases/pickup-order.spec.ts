import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@/domain/test/repositories/in-memory-orders-repository'
import { PickupOrderUseCase } from './pickup-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: PickupOrderUseCase

describe('Pickup Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new PickupOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to pickup an order', async () => {
    const newOrder = Order.create({
      recipientId: new UniqueEntityID('recipient-01'),
      deliverymanId: new UniqueEntityID('deliveryman-01'),
    })

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
