import type { NextPage } from 'next'
import { useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Layout } from 'src/components/layout'
import { useToken } from 'src/hooks/useToken'

interface Inputs {
  address: string
}
const About: NextPage = () => {
  const { getBalance } = useToken()

  const [balance, setBalance] = useState()
  const { register, handleSubmit } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = async ({ address }: any) => {
    const balance = await getBalance(address)
    setBalance(balance)
  }
  return (
    <Layout>
      <ul>
        <li>balance: {balance}</li>
      </ul>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center w-1/5'>
        <input {...register('address')} className='w-60' />
        <button type='submit'>get balance</button>
      </form>
    </Layout>
  )
}

export default About
