import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repository/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'


describe('Register Use Case', () => {

    it('Esse teste deve conseguir cadastrar', async () => {

        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)


        const { user } = await registerUseCase.execute({
            name: 'Raphael Moreno',
            email: 'teste@teste.com.br',
            password: '123456',
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('isso deve dar um hash da senha ao registrar', async () => {

        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)


        const { user } = await registerUseCase.execute({
            name: 'Raphael Moreno',
            email: 'teste@teste.com.br',
            password: '123456',
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash,
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('Esse valida se o e-mail é duplicado', async () => {

        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'alessandro@example.com'

        await registerUseCase.execute({
            name: 'Raphael Moreno',
            email,
            password: '123456',
        })

        
        await expect(() => registerUseCase.execute({
                name: 'Raphael Moreno',
                email,
                password: '123456',
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})