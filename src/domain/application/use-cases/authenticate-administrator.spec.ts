import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeAdministrator } from 'test/factories/make-administrator'
import { InMemoryAdministratorsRepository } from 'test/repositories/in-memory-administrators-repository'
import { AuthenticateAdministratorUseCase } from './authenticate-administrator'

let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository
let fakeHasher: FakeHasher
let fakeIncrypter: FakeEncrypter
let sut: AuthenticateAdministratorUseCase

describe('Authenticate Administrator', () => {
  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()
    fakeHasher = new FakeHasher()
    fakeIncrypter = new FakeEncrypter()
    sut = new AuthenticateAdministratorUseCase(
      inMemoryAdministratorsRepository,
      fakeHasher,
      fakeIncrypter,
    )
  })

  it('should be able to authenticate a administrator', async () => {
    const newAdministrator = makeAdministrator({
      cpf: '12312312322',
      password: '123456',
    })

    inMemoryAdministratorsRepository.items.push(newAdministrator)

    const result = await sut.execute({
      cpf: '12312312322',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
