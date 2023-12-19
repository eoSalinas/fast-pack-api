import { FakeHasher } from '@/domain/test/cryptography/fake-hasher'
import { makeDeliveryman } from '@/domain/test/factories/make-deliveryman'
import { InMemoryDeliverymenRepository } from '@/domain/test/repositories/in-memory-deliverymen-repository'
import { ChangeDeliverymanPasswordUseCase } from './change-deliveryman-password'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let fakeHasher: FakeHasher
let sut: ChangeDeliverymanPasswordUseCase

describe('Change Deliveryman Password', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    fakeHasher = new FakeHasher()
    sut = new ChangeDeliverymanPasswordUseCase(
      inMemoryDeliverymenRepository,
      fakeHasher,
    )
  })

  it('should be able to change deliveryman password', async () => {
    const newDeliveryman = makeDeliveryman()

    inMemoryDeliverymenRepository.items.push(newDeliveryman)

    const deliverymanId = newDeliveryman.id.toString()

    const { deliveryman } = await sut.execute({
      deliverymanId,
      password: 'new-password',
    })

    const isHashedAndUpdated = await fakeHasher.compare(
      'new-password',
      deliveryman.password,
    )

    expect(isHashedAndUpdated).toBeTruthy()
  })
})
