import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@/domain/test/repositories/in-memory-orders-repository'
import { ReturnOrderUseCase } from './return-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: ReturnOrderUseCase

describe('Return Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new ReturnOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to return an order', async () => {
    const newOrder = Order.create({
      recipientId: new UniqueEntityID('recipient-01'),
      deliverymanId: new UniqueEntityID('deliveryman-01'),
    })

    inMemoryOrdersRepository.items.push(newOrder)

    const orderId = newOrder.id.toString()

    const { order } = await sut.execute({
      orderId,
    })

    expect(order.returnedAt).toEqual(expect.any(Date))
    expect(order.deliverymanId).toBeFalsy()
    expect(inMemoryOrdersRepository.items[0].returnedAt).toEqual(
      expect.any(Date),
    )
    expect(inMemoryOrdersRepository.items[0].deliverymanId).toBeFalsy()
  })
})
