import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummary } from '../../features/get-week-summary'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get('/summary', async () => {
    // getWeekPendingGoals()
    const { summary } = await getWeekSummary()

    return {
      message: 'Week summary fetched successfully',
      summary,
    }
  })
}
