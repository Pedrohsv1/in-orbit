import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { EmptyGoals } from './components/empty-goals'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'
import { ErrorComp } from './components/error'

export function App() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  })

  return (
    <Dialog>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <ErrorComp message={error.message} />
      ) : data?.total && data.total > 0 ? (
        <Summary />
      ) : (
        <EmptyGoals />
      )}
      <CreateGoal />
    </Dialog>
  )
}

export function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-violet-300 border-b-violet-500 border-opacity-60 rounded-full animate-spin-slow" />
        <div className="absolute inset-2 border-4 border-pink-300 border-t-pink-500 border-opacity-100 rounded-full animate-spin-fast" />
      </div>
      <p className="text-white text-lg font-semibold animate-pulse">
        Loading...
      </p>
      <p className="max-w-xs text-center">
        <span className="text-white text-sm font-light animate-pulse">
          Por favor, aguarde
        </span>
        <span className="text-white/70  text-sm font-light animate-pulse">
          , pois o RENDER (plataforma de hospedagem gratuita) pode levar entre
          50 segundos a 1 minuto para a primeira resposta.
        </span>
      </p>
    </div>
  )
}
