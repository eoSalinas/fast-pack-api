import { AdministratorsRepository } from '@/domain/application/repositories/adminstrators-repository'
import { Administrator } from '@/domain/enterprise/entities/administrator'

export class InMemoryAdministratorsRepository
  implements AdministratorsRepository
{
  public items: Administrator[] = []

  async findById(id: string): Promise<Administrator | null> {
    const administrator = this.items.find((item) => item.id.toString() === id)

    if (!administrator) {
      return null
    }

    return administrator
  }

  async findByCPF(CPF: string): Promise<Administrator | null> {
    const administrator = this.items.find((item) => item.cpf === CPF)

    if (!administrator) {
      return null
    }

    return administrator
  }

  async save(administrator: Administrator): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => administrator.id === item.id,
    )

    this.items[itemIndex] = administrator
  }
}
