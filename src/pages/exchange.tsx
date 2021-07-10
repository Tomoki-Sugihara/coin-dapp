import type { NextPage } from 'next'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Layout } from 'src/components/layout'
import { useToken } from 'src/hooks/useToken'

interface Inputs {
  recipient: string
  amount: number
}
const About: NextPage = () => {
  const { totalSupply, balance, transfer } = useToken()

  const { register, handleSubmit, reset } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({ recipient, amount }: any) => {
    await transfer(recipient, amount)
    reset()
  }
  return (
    <Layout>
      <ul>
        <li>totalSupply: {totalSupply}</li>
        <li>my balance: {balance}</li>
      </ul>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-1/5'>
        <input {...register('recipient')} className='w-60' />
        <input {...register('amount')} type='number' defaultValue={0} className='mt-2 w-60' />
        <button type='submit'>transfer</button>
      </form>
    </Layout>
  )
}

export default About
