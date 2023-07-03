import { PrismaUsersRepository } from '@/repository/prisma/prisma-users-repository'
import { describe, it } from 'vitest'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
    it('isso deve dar um hast da senha ao registrar', async () => {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)

        const { user } = await registerUseCase.execute({
            name: 'Raphael Moreno',
            email: 'teste@teste.com.br',
            password: '123456',
        })

        console.log(user.password_hash)
    })
})