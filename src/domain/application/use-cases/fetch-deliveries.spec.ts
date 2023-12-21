import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeDeliveryman } from '@/domain/test/factories/make-deliveryman'
import { makeOrder } from '@/domain/test/factories/make-order'
import { InMemoryOrdersRepository } from '@/domain/test/repositories/in-memory-orders-repository'
import { FetchDeliveriesUseCase } from './fetch-deliveries'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: FetchDeliveriesUseCase

describe('Fetch Deliveries', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new FetchDeliveriesUseCase(inMemoryOrdersRepository)
  })

  it('should be able to fetch deliveries by deliveryman id', async () => {
    const deliveryman = makeDeliveryman()

    const order1 = makeOrder({
      deliverymanId: deliveryman.id,
      recipientId: new UniqueEntityID('recipient-01'),
      deliveredAt: new Date(),
    })

    const order2 = makeOrder({
      deliverymanId: deliveryman.id,
      recipientId: new UniqueEntityID('recipient-01'),
      deliveredAt: null,
    })

    const order3 = makeOrder({
      deliverymanId: deliveryman.id,
      recipientId: new UniqueEntityID('recipient-03'),
      deliveredAt: new Date(),
    })

    inMemoryOrdersRepository.items.push(order1)
    inMemoryOrdersRepository.items.push(order2)
    inMemoryOrdersRepository.items.push(order3)

    const deliverymanId = deliveryman.id.toString()

    const { orders } = await sut.execute({
      deliverymanId,
      page: 1,
    })

    expect(orders).toHaveLength(2)
    expect(orders).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: order1.id,
          deliverymanId: deliveryman.id,
          deliveredAt: expect.any(Date),
        }),
        expect.objectContaining({
          id: order3.id,
          deliverymanId: deliveryman.id,
          deliveredAt: expect.any(Date),
        }),
      ]),
    )
  })

  it('should be able to fetch paginated deliveries', async () => {
    const deliveryman = makeDeliveryman()

    for (let i = 1; i <= 22; i++) {
      inMemoryOrdersRepository.items.push(
        makeOrder({
          deliverymanId: deliveryman.id,
          recipientId: new UniqueEntityID('recipient-01'),
          deliveredAt: new Date(),
        }),
      )
    }

    const deliverymanId = deliveryman.id.toString()

    const { orders } = await sut.execute({
      deliverymanId,
      page: 2,
    })

    expect(orders).toHaveLength(2)
  })
})
