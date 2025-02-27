import logo from './../assets/logo-in-orbit.svg'
import letsStart from './../assets/lets-start.svg'
import { Plus } from 'lucide-react'
import { DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'

export function EmptyGoals() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-8">
      <img src={logo} alt="logo" />
      <img src={letsStart} alt="lets start" />
      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar uma agora
        mesmo?
      </p>

      <DialogTrigger asChild>
        <Button type="button">
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  )
}
