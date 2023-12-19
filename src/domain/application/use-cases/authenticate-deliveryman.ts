import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { DeliverymenRepository } from '../repositories/deliverymen-repository'

interface AuthenticateDeliverymanUseCaseRequest {
  cpf: string
  password: string
}

interface AuthenticateDeliverymanUseCaseReponse {
  accessToken: string
}

export class AuthenticateDeliverymanUseCase {
  constructor(
    private deliverymenRepository: DeliverymenRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    cpf,
    password,
  }: AuthenticateDeliverymanUseCaseRequest): Promise<AuthenticateDeliverymanUseCaseReponse> {
    const deliveryman = await this.deliverymenRepository.findByCPF(cpf)

    if (!deliveryman) {
      throw new Error('Invalid credential error.')
    }

    const isPassowordValid = await this.hashComparer.compare(
      password,
      deliveryman.password,
    )

    if (isPassowordValid) {
      throw new Error('Invalid credential error.')
    }

    const accessToken = await this.encrypter.encrypt({ sub: deliveryman.id })

    return {
      accessToken,
    }
  }
}
