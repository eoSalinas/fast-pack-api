import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'
import { InMemoryDeliverymenRepository } from '@/domain/test/repositories/in-memory-deliverymen-repository'
import { compare } from 'bcrypt'
import { ChangeDeliverymanPasswordUseCase } from './change-deliveryman-password'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let sut: ChangeDeliverymanPasswordUseCase

describe('Change Deliveryman Password', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    sut = new ChangeDeliverymanPasswordUseCase(inMemoryDeliverymenRepository)
  })

  it('should be able to change deliveryman password', async () => {
    const newDeliveryman = Deliveryman.create({
      name: 'John Doe',
      cpf: '12312312322',
      password: '123456',
    })

    inMemoryDeliverymenRepository.items.push(newDeliveryman)

    const deliverymanId = newDeliveryman.id.toString()

    const { deliveryman } = await sut.execute({
      deliverymanId,
      password: 'new-password',
    })

    const isHashedAndUpdated = await compare('new-password', deliveryman.password)

    expect(isHashedAndUpdated).toBeTruthy()
  })
})
