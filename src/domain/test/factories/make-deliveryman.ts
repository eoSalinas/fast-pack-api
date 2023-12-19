import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Deliveryman, DeliverymanProps } from "@/domain/enterprise/entities/deliveryman";
import { faker } from '@faker-js/faker';

export function makeDeliveryman(override: Partial<DeliverymanProps> = {}, id?: UniqueEntityID): Deliveryman {
  const deliveryman = Deliveryman.create({
    cpf: faker.phone.number(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
    ...override
  }, id)

  return deliveryman
}
