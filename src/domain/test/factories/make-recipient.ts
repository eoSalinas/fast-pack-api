import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Recipient, RecipientProps } from "@/domain/enterprise/entities/recipient";
import { faker } from '@faker-js/faker';

export function makeRecipient(override: Partial<RecipientProps> = {}, id?: UniqueEntityID): Recipient {
  const recipient = Recipient.create({
    cpf: faker.phone.number(),
    name: faker.person.fullName(),
    ...override
  }, id)

  return recipient
}
