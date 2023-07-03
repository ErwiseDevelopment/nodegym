import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'


describe('Register Use Case', () => {
    it('isso deve dar um hash da senha ao registrar', async () => {
        const registerUseCase = new RegisterUseCase({
            async findByEmail(email) {
                return null
            }
        })

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
})