export type PendingGoalsType = {
  message: string
  pendingGoals: PendingGoal[]
}

type PendingGoal = {
  id: string
  title: string
  desiredWeeklyFrequency: number
  completionCount: number
}

export const getPendingGoals = async (): Promise<PendingGoalsType> => {
  const response = await fetch('http://localhost:3333/pending-goals')
  const data = await response.json()

  return data
}
