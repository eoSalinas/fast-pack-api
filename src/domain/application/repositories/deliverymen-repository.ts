import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'

export interface DeliverymenRepository {
  findById(id: string): Promise<Deliveryman | null>
  findByCPF(CPF: string): Promise<Deliveryman | null>
  create(deliveryman: Deliveryman): Promise<void>
  save(deliveryman: Deliveryman): Promise<void>
  delete(deliveryman: Deliveryman): Promise<void>
}
