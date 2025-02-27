import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { createGoalRoute } from './routes/create-goal'
import { createCompletionRoute } from './routes/create-completion'
import { getPendingGoalsRoute } from './routes/pending-goals'
import { getWeekSummaryRoute } from './routes/week-summary'
import fastifyCors from '@fastify/cors'
import dotenv from 'dotenv'

dotenv.config()

const app = fastify().withTypeProvider<ZodTypeProvider>()

//cors
app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

//Goal
app.register(createGoalRoute)

//Completion
app.register(createCompletionRoute)

//Pending Goals
app.register(getPendingGoalsRoute)

//Summary
app.register(getWeekSummaryRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })
