import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletion } from '../../features/create-goal-completion'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { completion } = await createGoalCompletion({
        goalId: request.body.goalId,
      })
      return {
        message: 'Goal completion created successfully',
        completion,
      }
    }
  )
}
