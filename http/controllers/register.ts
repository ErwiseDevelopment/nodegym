import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaUsersRepository } from '@/use-cases/repository/prisma/prisma-users-repository'
import { UserAlreadExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUserCase = new RegisterUseCase(usersRepository)

    await registerUserCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof UserAlreadExistsError){
      return reply.status(409).send({message: err.message})
    }
      throw err
    
   
  }

  return reply.status(201).send()
}
