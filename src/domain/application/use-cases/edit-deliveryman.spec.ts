import { FakeHasher } from '@/domain/test/cryptography/fake-hasher'
import { makeDeliveryman } from '@/domain/test/factories/make-deliveryman'
import { InMemoryDeliverymenRepository } from '@/domain/test/repositories/in-memory-deliverymen-repository'
import { EditDeliverymanUseCase } from './edit-deliveryman'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let fakeHasher: FakeHasher
let sut: EditDeliverymanUseCase

describe('Edit Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    fakeHasher = new FakeHasher()
    sut = new EditDeliverymanUseCase(inMemoryDeliverymenRepository, fakeHasher)
  })

  it('should be able to edit a deliveryman', async () => {
    const newDeliveryman = makeDeliveryman()

    inMemoryDeliverymenRepository.items.push(newDeliveryman)

    const deliverymanId = newDeliveryman.id.toString()

    const { deliveryman } = await sut.execute({
      deliverymanId,
      name: 'Updated name',
      cpf: newDeliveryman.cpf,
      password: 'new-password',
    })

    const isHashedAndUpdated = await fakeHasher.compare(
      'new-password',
      deliveryman.password,
    )

    expect(isHashedAndUpdated).toBeTruthy()
    expect(inMemoryDeliverymenRepository.items).toHaveLength(1)
    expect(inMemoryDeliverymenRepository.items[0]).toMatchObject({
      name: 'Updated name',
      password: deliveryman.password,
    })
    expect(deliveryman).toMatchObject({
      name: 'Updated name',
      password: deliveryman.password,
    })
  })
})
