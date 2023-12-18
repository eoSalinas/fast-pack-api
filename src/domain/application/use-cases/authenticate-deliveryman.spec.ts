import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'
import { InMemoryDeliverymenRepository } from '@/domain/test/repositories/in-memory-deliverymen-repository'
import { AuthenticateDeliverymanUseCase } from './authenticate-deliveryman'

let inMemoryDeliverymenRepository: InMemoryDeliverymenRepository
let sut: AuthenticateDeliverymanUseCase

describe('Authenticate Deliveryman', () => {
  beforeEach(() => {
    inMemoryDeliverymenRepository = new InMemoryDeliverymenRepository()
    sut = new AuthenticateDeliverymanUseCase(inMemoryDeliverymenRepository)
  })

  it('should be able to authenticate a deliveryman', async () => {
    const newDeliveryman = Deliveryman.create({
      name: 'John Doe',
      cpf: '12312312322',
      password: '123456',
    })

    inMemoryDeliverymenRepository.items.push(newDeliveryman)

    const { deliveryman } = await sut.execute({
      cpf: '12312312322',
      password: '123456',
    })

    expect(inMemoryDeliverymenRepository.items[0].id).toEqual(deliveryman.id)
  })
})
