import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'
import { hash } from 'bcrypt'
import { DeliverymenRepository } from '../repositories/deliverymen-repository'

interface RegisterDeliverymanUseCaseRequest {
  name: string
  cpf: string
  password: string
}

interface RegisterDeliverymanUseCaseReponse {
  deliveryman: Deliveryman
}

export class RegisterDeliverymanUseCase {
  constructor(private deliverymenRepository: DeliverymenRepository) {}

  async execute({
    name,
    cpf,
    password,
  }: RegisterDeliverymanUseCaseRequest): Promise<RegisterDeliverymanUseCaseReponse> {
    const deliverymanWithSameCPF =
      await this.deliverymenRepository.findByCPF(cpf)

    if (deliverymanWithSameCPF) {
      throw new Error('Deliveryman already exists.')
    }

    const hashedPassword = await hash(password, 8)

    const deliveryman = Deliveryman.create({
      name,
      cpf,
      password: hashedPassword,
    })

    await this.deliverymenRepository.create(deliveryman)

    return {
      deliveryman,
    }
  }
}
