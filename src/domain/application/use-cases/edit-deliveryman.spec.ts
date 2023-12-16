import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'
import { InMemoryDeliverymenRepository } from '@/domain/test/repositories/in-memory-deliverymen-repository'
import { EditDeliverymanUseCase } from './edit-deliveryman'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let sut: EditDeliverymanUseCase

describe('Edit Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    sut = new EditDeliverymanUseCase(inMemoryDeliverymenRepository)
  })

  it('should be able to edit a deliveryman', async () => {
    const deliveryman = Deliveryman.create({
      name: 'John Doe',
      cpf: '12312312322',
      password: '123456',
    })

    inMemoryDeliverymenRepository.items.push(deliveryman)

    const deliverymanId = deliveryman.id.toString()

    await sut.execute({
      deliverymanId,
      name: 'Updated name',
      cpf: '12312312322',
      password: 'new-password',
    })

    expect(inMemoryDeliverymenRepository.items).toHaveLength(1)
    expect(inMemoryDeliverymenRepository.items[0]).toMatchObject({
      name: 'Updated name',
      password: 'new-password',
    })
  })
})
