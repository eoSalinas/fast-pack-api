import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeAdministrator } from 'test/factories/make-administrator'
import { InMemoryAdministratorsRepository } from 'test/repositories/in-memory-administrators-repository'
import { ChangeAdministratorPasswordUseCase } from './change-adminstrator-password'

let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository
let fakeHasher: FakeHasher
let sut: ChangeAdministratorPasswordUseCase

describe('Change Administrator Password', () => {
  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()
    fakeHasher = new FakeHasher()
    sut = new ChangeAdministratorPasswordUseCase(
      inMemoryAdministratorsRepository,
      fakeHasher,
    )
  })

  it('should be able to change administrator password', async () => {
    const newAdministrator = makeAdministrator()

    inMemoryAdministratorsRepository.items.push(newAdministrator)

    const administratorId = newAdministrator.id.toString()

    const { administrator } = await sut.execute({
      administratorId,
      password: 'new-password',
    })

    const isHashedAndUpdated = await fakeHasher.compare(
      'new-password',
      administrator.password,
    )

    expect(isHashedAndUpdated).toBeTruthy()
  })
})
