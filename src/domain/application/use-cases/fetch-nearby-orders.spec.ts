import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeDeliveryman } from '@/domain/test/factories/make-deliveryman'
import { makeOrder } from '@/domain/test/factories/make-order'
import { InMemoryOrdersRepository } from '@/domain/test/repositories/in-memory-orders-repository'
import { FetchNearbyOrdersUseCase } from './fetch-nearby-orders'

let inMemoryOrdersRepository: InMemoryOrdersRepository
let sut: FetchNearbyOrdersUseCase

describe('Fetch Deliveries', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository()
    sut = new FetchNearbyOrdersUseCase(inMemoryOrdersRepository)
  })

  it('should be able to fetch nearby orders', async () => {
    const deliveryman = makeDeliveryman()

    const order1 = makeOrder({
      deliverymanId: deliveryman.id,
      recipientId: new UniqueEntityID('recipient-01'),
      pickupdAt: new Date(),
      latitude: -23.984224,
      longitude: -46.200421,
    })

    const order2 = makeOrder({
      deliverymanId: deliveryman.id,
      recipientId: new UniqueEntityID('recipient-01'),
      pickupdAt: new Date(),
    })

    inMemoryOrdersRepository.items.push(order1)
    inMemoryOrdersRepository.items.push(order2)

    const deliverymanId = deliveryman.id.toString()

    const { orders } = await sut.execute({
      deliverymanId,
      deliverymanLatitude: -23.984224,
      deliverymanLongitude: -46.200421,
      page: 1,
    })

    expect(orders).toHaveLength(1)
  })
})
