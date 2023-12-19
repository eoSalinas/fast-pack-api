import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliverymenRepository } from '../repositories/deliverymen-repository'

interface EditDeliverymanUseCaseRequest {
  deliverymanId: string
  name: string
  cpf: string
  password: string
}

interface EditDeliverymanUseCaseReponse {
  deliveryman: Deliveryman
}

export class EditDeliverymanUseCase {
  constructor(
    private deliverymenRepository: DeliverymenRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    deliverymanId,
    name,
    cpf,
    password,
  }: EditDeliverymanUseCaseRequest): Promise<EditDeliverymanUseCaseReponse> {
    const deliveryman = await this.deliverymenRepository.findById(deliverymanId)

    if (!deliveryman) {
      throw new Error('Deliveryman not found.')
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    deliveryman.name = name
    deliveryman.cpf = cpf
    deliveryman.password = hashedPassword

    await this.deliverymenRepository.save(deliveryman)

    return {
      deliveryman,
    }
  }
}
