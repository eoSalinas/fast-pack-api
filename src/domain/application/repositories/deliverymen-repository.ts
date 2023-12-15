import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'

export interface DeliverymenRepository {
  findByCPF(CPF: string): Promise<Deliveryman | null>
  create(deliveryman: Deliveryman): Promise<void>
}
