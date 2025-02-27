type GoalsPerDayType = {
  id: string
  title: string
  completedAt: string
}

export type SummaryType = {
  completed: number
  total: number
  goalsPerDay: Record<string, GoalsPerDayType[]>
}

export const getSummary = async (): Promise<SummaryType> => {
  const GET_SUMMARY = new URL(`${import.meta.env.VITE_API_URL}/summary`)

  const response = await fetch(GET_SUMMARY)
  const data = await response.json()

  return data.summary
}
