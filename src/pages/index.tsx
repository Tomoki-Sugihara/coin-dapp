import type { NextPage } from 'next'
import { Layout } from 'src/components/layout'
import { useOpenlogin } from 'src/hooks/openlogin'

const Home: NextPage = () => {
  const { openlogin, login, privateKey } = useOpenlogin()
  const handleClick = async () => {
    await login()
  }

  const handleClick2 = async () => {
    console.log(openlogin?.state.privKey)
    console.log(openlogin)
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
        confirm
      </button>
      <button className='p-2' onClick={handleLogout}>
        logout
      </button>
    </Layout>
  )
}

export default Home
