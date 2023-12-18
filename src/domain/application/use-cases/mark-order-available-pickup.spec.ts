import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@/domain/test/repositories/in-memory-orders-repository'
import { MarkOrderAvailablePickupUseCase } from './mark-order-available-pickup'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: MarkOrderAvailablePickupUseCase

describe('Mark Order Available to Pickup', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new MarkOrderAvailablePickupUseCase(inMemoryOrdersRepository)
  })

  it('should be able to mark an order as available to pickup', async () => {
    const newOrder = Order.create({
      recipientId: new UniqueEntityID('recipient-01'),
      deliverymanId: new UniqueEntityID('deliveryman-01'),
    })

    inMemoryOrdersRepository.items.push(newOrder)

    const orderId = newOrder.id.toString()

    const { order } = await sut.execute({
      orderId,
    })

    expect(order.availablePickupAt).toEqual(expect.any(Date))
    expect(inMemoryOrdersRepository.items[0].availablePickupAt).toEqual(
      expect.any(Date),
    )
  })
})
