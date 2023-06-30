import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  enterprise: string
}

export async function registerUseCase({
  name,
  email,
  password,
  enterprise,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail já existe')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
      enterprise_id: enterprise,
    },
  })
}
