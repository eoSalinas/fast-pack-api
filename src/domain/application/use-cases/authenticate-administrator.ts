import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { AdministratorsRepository } from '../repositories/adminstrators-repository'

interface AuthenticateAdministratorUseCaseRequest {
  cpf: string
  password: string
}

interface AuthenticateAdministratorUseCaseReponse {
  accessToken: string
}

export class AuthenticateAdministratorUseCase {
  constructor(
    private administratorRepository: AdministratorsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateAdministratorUseCaseRequest): Promise<AuthenticateAdministratorUseCaseReponse> {
    const administrator = await this.administratorRepository.findByCPF(cpf)

    if (!administrator) {
      throw new Error('Invalid credential error.')
    }

    const isPassowordValid = await this.hashComparer.compare(
      password,
      administrator.password,
    )

    if (isPassowordValid) {
      throw new Error('Invalid credential error.')
    }

    const accessToken = await this.encrypter.encrypt({ sub: administrator.id })

    return {
      accessToken,
    }
  }
}
