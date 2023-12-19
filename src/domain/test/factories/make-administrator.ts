import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Administrator, AdministratorProps } from "@/domain/enterprise/entities/administrator";
import { faker } from '@faker-js/faker';

export function makeAdministrator(override: Partial<AdministratorProps> = {}, id?: UniqueEntityID): Administrator {
  const administrator = Administrator.create({
    cpf: faker.phone.number(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    ...override
  }, id)

  return administrator
}
