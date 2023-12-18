import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@/domain/test/repositories/in-memory-orders-repository'
import { EditOrderUseCase } from './edit-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: EditOrderUseCase

describe('Edit Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new EditOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to edit a order', async () => {
    const newOrder = Order.create({
      recipientId: new UniqueEntityID('recipient-01'),
      deliverymanId: new UniqueEntityID('deliveryman-01'),
    })

    inMemoryOrdersRepository.items.push(newOrder)

    const orderId = newOrder.id.toString()

    const { order } = await sut.execute({
      orderId,
      recipientId: 'recipient-01',
      deliverymanId: 'deliveryman-02',
      availablePickupAt: new Date(),
      pickupdAt: null,
      deliveredAt: null,
      returnedAt: null,
    })

    expect(inMemoryOrdersRepository.items[0]).toEqual(expect.objectContaining({
      deliverymanId: new UniqueEntityID('deliveryman-02'),
      availablePickupAt: expect.any(Date),
      pickupdAt: null
    }))
    expect(order).toEqual(expect.objectContaining({
      deliverymanId: new UniqueEntityID('deliveryman-02'),
      availablePickupAt: expect.any(Date),
      pickupdAt: null
    }))
  })
})
