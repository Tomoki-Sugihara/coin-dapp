import type { NextPage } from 'next'
import { Layout } from 'src/components/layout'
import { useOpenlogin } from 'src/hooks/useOpenlogin'
import { useWeb3 } from 'src/hooks/useWeb3'
import { functions } from 'src/utils/firebase'

const Home: NextPage = () => {
  const { data: openlogin } = useOpenlogin()
  const { address, privateKey, contract, web3 } = useWeb3()
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

  const handleClick3 = async () => {
    functions.useEmulator('localhost', 5001)
    const createdUsersDoc = functions.httpsCallable('createdUsersDoc')
    await createdUsersDoc()
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
      <button className='p-2' onClick={handleClick3}>
        functions exe
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
