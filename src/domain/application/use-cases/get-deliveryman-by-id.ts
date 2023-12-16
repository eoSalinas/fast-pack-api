import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'
import { DeliverymenRepository } from '../repositories/deliverymen-repository'

interface GetDeliverymanByIdUseCaseRequest {
  deliverymanId: string
}

interface GetDeliverymanByIdUseCaseReponse {
  deliveryman: Deliveryman
}

export class GetDeliverymanByIdUseCase {
  constructor(private deliverymenRepository: DeliverymenRepository) {}

  async execute({
    deliverymanId,
  }: GetDeliverymanByIdUseCaseRequest): Promise<GetDeliverymanByIdUseCaseReponse> {
    const deliveryman = await this.deliverymenRepository.findById(deliverymanId)

    if (!deliveryman) {
      throw new Error('Deliveryman not found.')
    }

    return {
      deliveryman,
    }
  }
}
