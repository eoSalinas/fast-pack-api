import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'
import { hash } from 'bcrypt'
import { DeliverymenRepository } from '../repositories/deliverymen-repository'

interface ChangeDeliverymanPasswordUseCaseRequest {
  deliverymanId: string
  password: string
}

interface ChangeDeliverymanPasswordUseCaseReponse {
  deliveryman: Deliveryman
}

export class ChangeDeliverymanPasswordUseCase {
  constructor(private deliverymenRepository: DeliverymenRepository) {}

  async execute({
    deliverymanId,
    password,
  }: ChangeDeliverymanPasswordUseCaseRequest): Promise<ChangeDeliverymanPasswordUseCaseReponse> {
    const deliveryman = await this.deliverymenRepository.findById(deliverymanId)

    if (!deliveryman) {
      throw new Error('Deliveryman not found.')
    }

    const hashedPassword = await hash(password, 8)

    deliveryman.password = hashedPassword

    await this.deliverymenRepository.save(deliveryman)

    return {
      deliveryman,
    }
  }
}
