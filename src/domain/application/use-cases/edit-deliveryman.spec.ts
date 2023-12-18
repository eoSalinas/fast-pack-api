import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'
import { InMemoryDeliverymenRepository } from '@/domain/test/repositories/in-memory-deliverymen-repository'
import { compare } from 'bcrypt'
import { EditDeliverymanUseCase } from './edit-deliveryman'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let sut: EditDeliverymanUseCase

describe('Edit Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    sut = new EditDeliverymanUseCase(inMemoryDeliverymenRepository)
  })

  it('should be able to edit a deliveryman', async () => {
    const newDeliveryman = Deliveryman.create({
      name: 'John Doe',
      cpf: '12312312322',
      password: '123456',
    })

    inMemoryDeliverymenRepository.items.push(newDeliveryman)

    const deliverymanId = newDeliveryman.id.toString()

    const { deliveryman } = await sut.execute({
      deliverymanId,
      name: 'Updated name',
      cpf: '12312312322',
      password: 'new-password',
    })

    const isHashedAndUpdated = await compare('new-password', deliveryman.password)

    expect(isHashedAndUpdated).toBeTruthy()
    expect(inMemoryDeliverymenRepository.items).toHaveLength(1)
    expect(inMemoryDeliverymenRepository.items[0]).toMatchObject({
      name: 'Updated name',
      password: deliveryman.password,
    })
    expect(deliveryman).toMatchObject({
      name: 'Updated name',
      password: deliveryman.password,
    })
  })
})
