import { Either, left, right } from '@/core/either'
import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { AdministratorsRepository } from '../repositories/adminstrators-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateAdministratorUseCaseRequest {
  cpf: string
  password: string
}

type AuthenticateAdministratorUseCaseReponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

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
      return left(new WrongCredentialsError())
    }

    const isPassowordValid = await this.hashComparer.compare(
      password,
      administrator.password,
    )

    if (isPassowordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({ sub: administrator.id })

    return right({
      accessToken,
    })
  }
}
