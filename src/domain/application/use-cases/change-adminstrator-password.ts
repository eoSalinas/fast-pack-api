import { Administrator } from '@/domain/enterprise/entities/administrator'
import { hash } from 'bcrypt'
import { AdministratorsRepository } from '../repositories/adminstrators-repository'

interface ChangeAdministratorPasswordUseCaseRequest {
  administratorId: string
  password: string
}

interface ChangeAdministratorPasswordUseCaseReponse {
  administrator: Administrator
}

export class ChangeAdministratorPasswordUseCase {
  constructor(private administratorsRepository: AdministratorsRepository) {}

  async execute({
    administratorId,
    password,
  }: ChangeAdministratorPasswordUseCaseRequest): Promise<ChangeAdministratorPasswordUseCaseReponse> {
    const administrator = await this.administratorsRepository.findById(administratorId)

    if (!administrator) {
      throw new Error('Administrator not found.')
    }

    const hashedPassword = await hash(password, 8)

    administrator.password = hashedPassword

    await this.administratorsRepository.save(administrator)

    return {
      administrator,
    }
  }
}
