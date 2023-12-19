import { FakeEncrypter } from '@/domain/test/cryptography/fake-encrypter'
import { makeAdministrator } from '@/domain/test/factories/make-administrator'
import { InMemoryAdministratorsRepository } from '@/domain/test/repositories/in-memory-administrators-repository'
import { AuthenticateAdministratorUseCase } from './authenticate-administrator'

let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository
let fakeIncrypter: FakeEncrypter
let sut: AuthenticateAdministratorUseCase

describe('Authenticate Administrator', () => {
  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()
    fakeIncrypter = new FakeEncrypter()
    sut = new AuthenticateAdministratorUseCase(inMemoryAdministratorsRepository, fakeIncrypter)
  })

  it('should be able to authenticate a administrator', async () => {
    const newAdministrator = makeAdministrator({
      cpf: '12312312322',
      password: '123456',
    })

    inMemoryAdministratorsRepository.items.push(newAdministrator)

    const { accessToken } = await sut.execute({
      cpf: '12312312322',
      password: '123456',
    })

    expect(accessToken).toEqual(expect.any(String))
  })
})
