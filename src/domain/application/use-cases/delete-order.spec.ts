import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Order } from '@/domain/enterprise/entities/order'
import { InMemoryOrdersRepository } from '@/domain/test/repositories/in-memory-orders-repository'
import { DeleteOrderUseCase } from './delete-order'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: DeleteOrderUseCase

describe('Delete Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new DeleteOrderUseCase(inMemoryOrdersRepository)
  })

  it('should be able to delete a order', async () => {
    const order = Order.create({
      deliverymanId: new UniqueEntityID('deliveryman-01'),
      recipientId: new UniqueEntityID('recipient-01'),
    })

    inMemoryOrdersRepository.items.push(order)

    const orderId = order.id.toString()

    await sut.execute({
      orderId,
    })

    expect(inMemoryOrdersRepository.items).toHaveLength(0)
  })
})
