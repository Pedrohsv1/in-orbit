export async function createGoalCompletion(goalId: string) {
  const COMPLETIONS_URL = new URL(`${import.meta.env.VITE_API_URL}/completions`)
  const response = await fetch(COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  })

  const data = await response.json()

  return data
}
