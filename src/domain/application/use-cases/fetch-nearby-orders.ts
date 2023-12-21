import { Order } from '@/domain/enterprise/entities/order'
import { OrdersRepository } from '../repositories/orders-repository'

interface FetchNearbyOrdersUseCaseRequest {
  deliverymanId: string
  deliverymanLatitude: number
  deliverymanLongitude: number
  page: number
}

interface FetchNearbyOrdersUseCaseReponse {
  orders: Order[]
}

export class FetchNearbyOrdersUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    deliverymanId,
    deliverymanLatitude,
    deliverymanLongitude,
    page,
  }: FetchNearbyOrdersUseCaseRequest): Promise<FetchNearbyOrdersUseCaseReponse> {
    const orders = await this.ordersRepository.findManyNearby(
      deliverymanId,
      { latitude: deliverymanLatitude, longitude: deliverymanLongitude },
      {
        page,
      },
    )

    return {
      orders,
    }
  }
}
