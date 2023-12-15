import { DeliverymenRepository } from '@/domain/application/repositories/deliverymen-repository'
import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'

export class InMemoryDeliverymenRepository implements DeliverymenRepository {
  public items: Deliveryman[] = []

  async findByCPF(CPF: string): Promise<Deliveryman | null> {
    const deliveryman = this.items.find((item) => item.cpf === CPF)

    if (!deliveryman) {
      return null
    }

    return deliveryman
  }

  async create(deliveryman: Deliveryman): Promise<void> {
    this.items.push(deliveryman)
  }
}
