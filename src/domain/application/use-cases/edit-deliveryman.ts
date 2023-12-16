import { DeliverymenRepository } from '../repositories/deliverymen-repository'

interface EditDeliverymanUseCaseRequest {
  deliverymanId: string
  name: string
  cpf: string
  password: string
}

interface EditDeliverymanUseCaseReponse {}

export class EditDeliverymanUseCase {
  constructor(private deliverymenRepository: DeliverymenRepository) {}

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

    deliveryman.name = name
    deliveryman.cpf = cpf
    deliveryman.password = password

    await this.deliverymenRepository.save(deliveryman)

    return {}
  }
}
