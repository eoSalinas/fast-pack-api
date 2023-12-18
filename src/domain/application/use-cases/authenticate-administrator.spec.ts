import { Administrator } from '@/domain/enterprise/entities/administrator'
import { FakeEncrypter } from '@/domain/test/cryptography/fake-encrypter'
import { InMemoryDeliverymenRepository } from '@/domain/test/repositories/in-memory-deliverymen-repository'
import { AuthenticateAdministratorUseCase } from './authenticate-administrator'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let fakeIncrypter: FakeEncrypter
let sut: AuthenticateAdministratorUseCase

describe('Authenticate Administrator', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    fakeIncrypter = new FakeEncrypter()
    sut = new AuthenticateAdministratorUseCase(inMemoryDeliverymenRepository, fakeIncrypter)
  })

  it('should be able to authenticate a administrator', async () => {
    const newAdministrator = Administrator.create({
      name: 'John Doe',
      cpf: '12312312322',
      password: '123456',
    })

    inMemoryDeliverymenRepository.items.push(newAdministrator)

    const { accessToken } = await sut.execute({
      cpf: '12312312322',
      password: '123456',
    })

    expect(accessToken).toEqual(expect.any(String))
  })
})
