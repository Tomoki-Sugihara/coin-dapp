import type { NextPage } from 'next'
import { Layout } from 'src/components/layout'
import { useOpenlogin } from 'src/hooks/useOpenlogin'
import { useWeb3 } from 'src/hooks/useWeb3'

const Home: NextPage = () => {
  const { data: openlogin } = useOpenlogin()
  const { address, privateKey, contract } = useWeb3()
  const handleClickLogin = async () => {
    if (!openlogin) return
    try {
      await openlogin.login()
    } catch (error) {
      console.error(error)
    }
  }

  const handleClick2 = async () => {
    const supply = await contract?.methods.totalSupply().call()
    console.log(supply)
  }

  const handleLogout = async () => {
    await openlogin?.logout()
  }

  return (
    <Layout>
      <button className='p-2' onClick={handleClickLogin}>
        login
      </button>
      <button className='p-2' onClick={handleClick2}>
        supply
      </button>
      <button className='p-2' onClick={handleLogout}>
        logout
      </button>

      <ul>
        <li>address: {address}</li>
        <li>privateKey: {privateKey}</li>
      </ul>
    </Layout>
  )
}

export default Home
