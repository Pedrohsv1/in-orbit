import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../features/get-week-pending-goals'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals', async () => {
    // getWeekPendingGoals()
    const { pendingGoals } = await getWeekPendingGoals()

    return {
      message: 'Pending goals fetched successfully',
      pendingGoals,
    }
  })
}
