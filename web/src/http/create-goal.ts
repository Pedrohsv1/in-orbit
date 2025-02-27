type CreateGoalRequest = {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  const API_GOAL = new URL(`${import.meta.env.VITE_API_URL}/goals`)
  const response = await fetch(API_GOAL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  })

  const data = await response.json()

  return data
}
