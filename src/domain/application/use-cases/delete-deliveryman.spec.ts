import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'
import { InMemoryDeliverymenRepository } from '@/domain/test/repositories/in-memory-deliverymen-repository'
import { DeleteDeliverymanUseCase } from './delete-deliveryman'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let sut: DeleteDeliverymanUseCase

describe('Delete Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    sut = new DeleteDeliverymanUseCase(inMemoryDeliverymenRepository)
  })

  it('should be able to delete a deliveryman', async () => {
    const deliveryman = Deliveryman.create({
      name: 'John Doe',
      cpf: '12312312322',
      password: '123456',
    })

    inMemoryDeliverymenRepository.items.push(deliveryman)

    const deliverymanId = deliveryman.id.toString()

    await sut.execute({
      deliverymanId,
    })

    expect(inMemoryDeliverymenRepository.items).toHaveLength(0)
  })
})
