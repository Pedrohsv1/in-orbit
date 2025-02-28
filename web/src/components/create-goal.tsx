import {
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from './ui/dialog'
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupIndicator,
} from './ui/radio-group'
import { X } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createGoal } from '../http/create-goal'
import { useQueryClient } from '@tanstack/react-query'

const createGoalForm = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja cadastrar'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
})

type CreateGoalSchema = z.infer<typeof createGoalForm>

export function CreateGoal() {
  const queryClient = useQueryClient()

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalSchema>({
      resolver: zodResolver(createGoalForm),
      defaultValues: {
        title: '',
        desiredWeeklyFrequency: 3,
      },
    })

  async function handleCreateGoal(data: CreateGoalSchema) {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    })

    queryClient.invalidateQueries({ queryKey: ['summary'] })
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] })

    reset()
  }

  return (
    <DialogContent className="flex-1">
      <div className="flex flex-col h-full gap-6">
        <div className="flex flex-col gap-3 ">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600 hover:text-zinc-500" />
            </DialogClose>
          </div>
          <div className="hidden md:block">
            <DialogDescription className="">
              Adicione atividades que{' '}
              <span className="underline">te fazem bem</span> e que você quer
              continuar praticando toda semana.
            </DialogDescription>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          action=""
          className="flex  flex-col md:justify-between gap-5 flex-1"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title"> Qual a atividade</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register('title')}
              />
              {formState.errors.title && (
                <span className="text-red-400 text-sm">
                  {formState.errors.title.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title"> Quantas vezes na semana?</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={3}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <RadioGroupItem value="1">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          1x vez na semana
                        </span>
                        <span className="text-lg leading-none">🥱</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="2">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          2x vezes na semana
                        </span>
                        <span className="text-lg leading-none">😊</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="3">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          3x vezes na semana
                        </span>
                        <span className="text-lg leading-none">😁</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="4">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          4x vezes na semana
                        </span>
                        <span className="text-lg leading-none">😄</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="5">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          5x vezes na semana
                        </span>
                        <span className="text-lg leading-none">🤩</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="6">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          6x vezes na semana
                        </span>
                        <span className="text-lg leading-none">🤯</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="7">
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-sm font-medium leading-none">
                          Todos os dias
                        </span>
                        <span className="text-lg leading-none">🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  )
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button className="flex-1" variant="secondary" type="button">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1" type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  )
}
