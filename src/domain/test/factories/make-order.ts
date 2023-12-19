import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Order, OrderProps } from "@/domain/enterprise/entities/order";

export function makeOrder(override: Partial<OrderProps> = {}, id?: UniqueEntityID): Order {
  const order = Order.create({
    recipientId: new UniqueEntityID(),
    deliverymanId: new UniqueEntityID(),
    createdAt: new Date(),
    ...override
  }, id)

  return order
}
