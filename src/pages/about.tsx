import type { NextPage } from 'next'
import { Layout } from 'src/components/layout'
import { useOpenlogin } from 'src/hooks/useOpenlogin'

const About: NextPage = () => {
  const { data: openlogin } = useOpenlogin()
  console.log(openlogin)
  return <Layout>About</Layout>
}

export default About
