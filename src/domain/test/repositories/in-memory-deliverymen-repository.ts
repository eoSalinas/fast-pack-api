import { DeliverymenRepository } from '@/domain/application/repositories/deliverymen-repository'
import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'

export class InMemoryDeliverymenRepository implements DeliverymenRepository {
  public items: Deliveryman[] = []

  async findById(id: string): Promise<Deliveryman | null> {
    const deliveryman = this.items.find((item) => item.id.toString() === id)

    if (!deliveryman) {
      return null
    }

    return deliveryman
  }

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

  async delete(deliveryman: Deliveryman): Promise<void> {
    const itemIndex = this.items.findIndex((item) => deliveryman.id === item.id)

    this.items.splice(itemIndex, 1)
  }
}
