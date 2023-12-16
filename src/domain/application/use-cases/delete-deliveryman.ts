import { DeliverymenRepository } from '../repositories/deliverymen-repository'

interface DeleteDeliverymanUseCaseRequest {
  deliverymanId: string
}

interface DeleteDeliverymanUseCaseReponse {}

export class DeleteDeliverymanUseCase {
  constructor(private deliverymenRepository: DeliverymenRepository) {}

  async execute({
    deliverymanId,
  }: DeleteDeliverymanUseCaseRequest): Promise<DeleteDeliverymanUseCaseReponse> {
    const deliveryman = await this.deliverymenRepository.findById(deliverymanId)

    if (!deliveryman) {
      throw new Error('Deliveryman not found.')
    }

    await this.deliverymenRepository.delete(deliveryman)

    return {}
  }
}
