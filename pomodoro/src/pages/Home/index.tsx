import { HandPalm, Play } from 'phosphor-react'
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator,StartCountDownButton, StopCountDownButton, TasktInput } from './styles'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import {differenceInSeconds} from 'date-fns'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5,'O ciclo precisa ser de no minimo 5 minutos.')
  .max(60, 'O cíclo precisa ser de no máximo 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
}

export function Home() {
  const [cycles,setCycles] = useState<Cycle[]>([])
  const [activeCycleId,setActiveCycleId] = useState<string | null>(null)
  const [amountSecondPassed,setAmountSecondsPassed] = useState(0)

  const {register,handleSubmit,watch,reset} = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  useEffect(() => {
    let interval: number
    
    if(activeCycle) {
       interval = setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(),activeCycle.startDate))
      },1000) 
    }
    return () => {
        clearInterval(interval)
    }
  },[activeCycle])

  function handleCreateNewCycle (data: NewCycleFormData) {
    const id = String(new Date().getTime())
    
    const newCycle: Cycle = {
      id, 
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
    reset()
  }

  function handleInterruptCycle() {
    setCycles(
      cycles.map(cycle => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle
        }
      })
    );
    setActiveCycleId(null)
  }
  

  const totalSeconds= activeCycle ? activeCycle.minutesAmount * 60 : 0 
  const currentSeconds = activeCycle ? totalSeconds - amountSecondPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if(activeCycle) {
      document.title = `${minutes}: ${seconds}`
    }
  }, [minutes,seconds,activeCycleId]);

  const task = watch('task')
  const isSubmitDisabled = !task
  
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TasktInput id="task" list='task-suggestions' placeholder='Dê um nome ao seu projeto.' disabled={!!activeCycle} {...register('task')}/>

          <datalist id='task-suggestions'>
            <option value="teste 1" />
            <option value="teste 2" />
            <option value="teste 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput type="number" id="minutesAmount" placeholder='00' step={5} min={5} max={60} disabled={!!activeCycle} {...register('minutesAmount',{valueAsNumber: true})} />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer>

        {activeCycle ? (
          <StopCountDownButton type="button">
            <HandPalm size={24} />
            Interromper 999999
          </StopCountDownButton>
        ): (
          <StartCountDownButton onClick={handleInterruptCycle} type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Iniciar
        </StartCountDownButton>
        )} 
      </form>
    </HomeContainer>
  )
}
