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
  const response = await fetch('http://localhost:3333/summary')
  const data = await response.json()

  return data.summary
}
