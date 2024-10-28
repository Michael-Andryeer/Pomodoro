import { Play } from 'phosphor-react'
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator,StartCountDownButton, TasktInput } from './styles'
import {useForm} from 'react-hook-form'


export function Home() {
  const {register,handleSubmit,watch} = useForm()

  function handleCreateNewCycle (data: any) {
    console.log(data)
  }

  const task = watch('task')
  const isSubmitDisabled = !task
  
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TasktInput id="task" list='task-suggestions' placeholder='Dê um nome ao seu projeto.' {...register('task')}/>

          <datalist id='task-suggestions'>
            <option value="teste 1" />
            <option value="teste 2" />
            <option value="teste 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput type="number" id="minutesAmount" placeholder='00' step={5} min={5} max={60} {...register('minutesAmount',{valueAsNumber: true})} />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Iniciar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
