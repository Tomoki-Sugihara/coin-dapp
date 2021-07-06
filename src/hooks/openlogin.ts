import type Openlogin from '@toruslabs/openlogin'
import { useCallback, useEffect, useState } from 'react'

export const useOpenlogin = () => {
  const [openlogin, setOpenlogin] = useState<Openlogin>()
  const [privateKey, setPrivateKey] = useState('')

  const login = async () => {
    const res = await openlogin?.login()
    const privKey = res?.privKey
    if (privKey) setPrivateKey(privKey)
  }

  const fetchOpenlogin = useCallback(async () => {
    try {
      import('@toruslabs/openlogin')
        .then((x) => x.default)
        .then(async (Openlogin) => {
          const openlogin = new Openlogin({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            clientId: process.env.NEXT_PUBLIC_TORUS_CLIENT_ID!,
            network: 'testnet',
          })
          await openlogin.init()

          setOpenlogin(openlogin)
          if (openlogin.privKey) {
            setPrivateKey(openlogin.privKey)
          }
        })
    } catch (error) {
      console.error('in fetchOpenlogin', error)
    }
  }, [])

  useEffect(() => {
    fetchOpenlogin()
  }, [fetchOpenlogin])

  return {
    openlogin,
    login,
    privateKey,
  }
}
