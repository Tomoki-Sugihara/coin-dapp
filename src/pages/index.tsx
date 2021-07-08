import type { NextPage } from 'next'
import { Layout } from 'src/components/layout'
import { useOpenlogin } from 'src/hooks/useOpenlogin'

const Home: NextPage = () => {
  const { data: openlogin } = useOpenlogin()
  console.log(openlogin)
  const handleClick = async () => {
    await openlogin?.login()
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
        {openlogin?.privKey}
      </button>
      <button className='p-2' onClick={handleLogout}>
        logout
      </button>
    </Layout>
  )
}

export default Home
