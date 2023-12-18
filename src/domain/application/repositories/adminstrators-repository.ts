import { Administrator } from '@/domain/enterprise/entities/administrator'

export interface AdministratorsRepository {
  findByCPF(CPF: string): Promise<Administrator | null>
}
