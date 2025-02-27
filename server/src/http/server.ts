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

const port = process.env.PORT || 4000

dotenv.config()

const app = fastify().withTypeProvider<ZodTypeProvider>()

//cors
app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// Root
app.get('/', (req, res) => {
  res.send('Hello World!')
})

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
    port,
    host: '0.0.0.0',	
  })
  .then(() => {
    console.log(`Server is running on port ${port}`)
  })
