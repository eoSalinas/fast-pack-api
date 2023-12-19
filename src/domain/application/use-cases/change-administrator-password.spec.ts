import { makeAdministrator } from '@/domain/test/factories/make-administrator'
import { InMemoryAdministratorsRepository } from '@/domain/test/repositories/in-memory-administrators-repository'
import { compare } from 'bcrypt'
import { ChangeAdministratorPasswordUseCase } from './change-adminstrator-password'

let inMemoryAdministratorsRepository: InMemoryAdministratorsRepository
let sut: ChangeAdministratorPasswordUseCase

describe('Change Administrator Password', () => {
  beforeEach(() => {
    inMemoryAdministratorsRepository = new InMemoryAdministratorsRepository()
    sut = new ChangeAdministratorPasswordUseCase(inMemoryAdministratorsRepository)
  })

  it('should be able to change administrator password', async () => {
    const newAdministrator = makeAdministrator()

    inMemoryAdministratorsRepository.items.push(newAdministrator)

    const administratorId = newAdministrator.id.toString()

    const { administrator } = await sut.execute({
      administratorId,
      password: 'new-password',
    })

    const isHashedAndUpdated = await compare('new-password', administrator.password)

    expect(isHashedAndUpdated).toBeTruthy()
  })
})
