import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@/domain/test/repositories/in-memory-orders-repository'
import { DeliveryOrderUseCase } from './delivery-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: DeliveryOrderUseCase

describe('Delivery Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new DeliveryOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to delivery an order', async () => {
    const newOrder = Order.create({
      recipientId: new UniqueEntityID('recipient-01'),
      deliverymanId: new UniqueEntityID('deliveryman-01'),
    })

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
