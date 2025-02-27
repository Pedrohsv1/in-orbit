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
  const PENDING_URL = new URL(`${import.meta.env.VITE_API_URL}/pending-goals`)
  const response = await fetch(PENDING_URL)
  const data = await response.json()

  return data
}
