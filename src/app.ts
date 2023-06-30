import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'
import { appRoutes } from 'http/routes'

export const app = fastify()

app.register(appRoutes)

app.post('/enterprises', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    cnpj: z.string(),
  })

  const { name, cnpj } = registerBodySchema.parse(request.body)

  await prisma.enterprise.create({
    data: {
      name,
      cnpj,
    },
  })

  return reply.status(201).send()
})
