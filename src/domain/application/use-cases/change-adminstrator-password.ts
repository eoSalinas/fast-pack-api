import { Administrator } from '@/domain/enterprise/entities/administrator'
import { HashGenerator } from '../cryptography/hash-generator'
import { AdministratorsRepository } from '../repositories/adminstrators-repository'

interface ChangeAdministratorPasswordUseCaseRequest {
  administratorId: string
  password: string
}

interface ChangeAdministratorPasswordUseCaseReponse {
  administrator: Administrator
}

export class ChangeAdministratorPasswordUseCase {
  constructor(
    private administratorsRepository: AdministratorsRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    administratorId,
    password,
  }: ChangeAdministratorPasswordUseCaseRequest): Promise<ChangeAdministratorPasswordUseCaseReponse> {
    const administrator =
      await this.administratorsRepository.findById(administratorId)

    if (!administrator) {
      throw new Error('Administrator not found.')
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    administrator.password = hashedPassword

    await this.administratorsRepository.save(administrator)

    return {
      administrator,
    }
  }
}
