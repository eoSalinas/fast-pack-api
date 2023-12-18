import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'
import { compare } from 'bcrypt'
import { DeliverymenRepository } from '../repositories/deliverymen-repository'

interface AuthenticateDeliverymanUseCaseRequest {
  cpf: string
  password: string
}

interface AuthenticateDeliverymanUseCaseReponse {
  deliveryman: Deliveryman // TODO: should return JWT
}

export class AuthenticateDeliverymanUseCase {
  constructor(private deliverymenRepository: DeliverymenRepository) {}

  async execute({
    cpf,
    password,
  }: AuthenticateDeliverymanUseCaseRequest): Promise<AuthenticateDeliverymanUseCaseReponse> {
    const deliveryman = await this.deliverymenRepository.findByCPF(cpf)

    if (!deliveryman) {
      throw new Error('Invalid credential error.')
    }

    const isPassowordValid = await compare(password, deliveryman.password)

    if (isPassowordValid) {
      throw new Error('Invalid credential error.')
    }

    return {
      deliveryman,
    }
  }
}
