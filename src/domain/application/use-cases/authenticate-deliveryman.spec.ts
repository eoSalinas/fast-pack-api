import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'
import { FakeEncrypter } from '@/domain/test/cryptography/fake-encrypter'
import { InMemoryDeliverymenRepository } from '@/domain/test/repositories/in-memory-deliverymen-repository'
import { AuthenticateDeliverymanUseCase } from './authenticate-deliveryman'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let fakeIncrypter: FakeEncrypter
let sut: AuthenticateDeliverymanUseCase

describe('Authenticate Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    fakeIncrypter = new FakeEncrypter()
    sut = new AuthenticateDeliverymanUseCase(inMemoryDeliverymenRepository, fakeIncrypter)
  })

  it('should be able to authenticate a deliveryman', async () => {
    const newDeliveryman = Deliveryman.create({
      name: 'John Doe',
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
