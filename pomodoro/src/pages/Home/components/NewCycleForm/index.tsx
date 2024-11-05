import { useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput,TasktInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../..";

export function NewCycleForm() {
   const {activeCycle} = useContext(CyclesContext)
   const {register} = useFormContext()

  return (
    <FormContainer>
    <label htmlFor="task">Vou trabalhar em</label>
    <TasktInput
      id="task"
      list="task-suggestions"
      placeholder="Dê um nome ao seu projeto."
      disabled={!!activeCycle}
      {...register('task')}
    />

    <datalist id="task-suggestions">
      <option value="teste 1" />
      <option value="teste 2" />
      <option value="teste 4" />
    </datalist>

    <label htmlFor="minutesAmount">durante</label>
    <MinutesAmountInput
      type="number"
      id="minutesAmount"
      placeholder="00"
      step={5}
      min={5}
      max={60}
      disabled={!!activeCycle}
      {...register('minutesAmount', { valueAsNumber: true })}
    />
    <span>minutos.</span>
  </FormContainer>
  )
}