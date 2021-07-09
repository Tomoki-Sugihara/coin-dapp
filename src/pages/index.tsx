import type { NextPage } from 'next'
import { Layout } from 'src/components/layout'
import { useOpenlogin } from 'src/hooks/useOpenlogin'
import { useWeb3 } from 'src/hooks/useWeb3'

const Home: NextPage = () => {
  const { data: openlogin } = useOpenlogin()
  const { web3, contract } = useWeb3()
  const handleClick = async () => {
    await openlogin?.login()
  }

  const handleClick2 = async () => {
    const supply = await contract?.methods.totalSupply().call()
    console.log(supply)
  }

  const handleLogout = async () => {
    await openlogin?.logout({ fastLogin: false })
  }

  return (
    <Layout>
      <button className='p-2' onClick={handleClick}>
        login
      </button>
      <button className='p-2' onClick={handleClick2}>
        supply
      </button>
      <button className='p-2' onClick={handleLogout}>
        logout
      </button>
    </Layout>
  )
}

export default Home
