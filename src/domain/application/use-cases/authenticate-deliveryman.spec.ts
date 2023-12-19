import { FakeEncrypter } from '@/domain/test/cryptography/fake-encrypter'
import { FakeHasher } from '@/domain/test/cryptography/fake-hasher'
import { makeDeliveryman } from '@/domain/test/factories/make-deliveryman'
import { InMemoryDeliverymenRepository } from '@/domain/test/repositories/in-memory-deliverymen-repository'
import { AuthenticateDeliverymanUseCase } from './authenticate-deliveryman'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let fakeHasher: FakeHasher
let fakeIncrypter: FakeEncrypter
let sut: AuthenticateDeliverymanUseCase

describe('Authenticate Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    fakeHasher = new FakeHasher()
    fakeIncrypter = new FakeEncrypter()
    sut = new AuthenticateDeliverymanUseCase(
      inMemoryDeliverymenRepository,
      fakeHasher,
      fakeIncrypter,
    )
  })

  it('should be able to authenticate a deliveryman', async () => {
    const newDeliveryman = makeDeliveryman({
      cpf: '12312312322',
      password: '123456',
    })

    inMemoryDeliverymenRepository.items.push(newDeliveryman)

    const { accessToken } = await sut.execute({
      cpf: '12312312322',
      password: '123456',
    })

    expect(accessToken).toEqual(expect.any(String))
  })
})
