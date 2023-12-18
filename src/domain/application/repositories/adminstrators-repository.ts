import { Administrator } from '@/domain/enterprise/entities/administrator'

export interface AdministratorsRepository {
  findById(id: string): Promise<Administrator | null>
  findByCPF(CPF: string): Promise<Administrator | null>
  save(administrator: Administrator): Promise<void>
}
