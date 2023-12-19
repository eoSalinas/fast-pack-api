import { FakeHasher } from '@/domain/test/cryptography/fake-hasher'
import { makeDeliveryman } from '@/domain/test/factories/make-deliveryman'
import { InMemoryDeliverymenRepository } from '@/domain/test/repositories/in-memory-deliverymen-repository'
import { RegisterDeliverymanUseCase } from './register-deliveryman'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let fakeHasher: FakeHasher
let sut: RegisterDeliverymanUseCase

describe('Register Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterDeliverymanUseCase(
      inMemoryDeliverymenRepository,
      fakeHasher,
    )
  })

  it('should be able to register a deliveryman', async () => {
    const { deliveryman } = await sut.execute({
      name: 'John Doe',
      cpf: '12312312322',
      password: '123456',
    })

    expect(deliveryman.id).toBeTruthy()
    expect(inMemoryDeliverymenRepository.items).toHaveLength(1)
    expect(inMemoryDeliverymenRepository.items[0]).toEqual(deliveryman)
  })

  it('should hash deliveryman password upon registration', async () => {
    const { deliveryman } = await sut.execute({
      name: 'John Doe',
      cpf: '12312312322',
      password: '123456',
    })

    const isPassowordHashed = await fakeHasher.compare(
      '123456',
      deliveryman.password,
    )

    expect(isPassowordHashed).toBeTruthy()
  })

  it('should not be able to register a deliveryman with CPF already existing', async () => {
    const newDeliveryman = makeDeliveryman({
      cpf: '12312312322',
    })

    inMemoryDeliverymenRepository.items.push(newDeliveryman)

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        cpf: '12312312322',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
