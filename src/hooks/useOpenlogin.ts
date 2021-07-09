import useSWR from 'swr'

const fetchOpenlogin = async () => {
  return import('@toruslabs/openlogin')
    .then((x) => x.default)
    .then(async (Openlogin) => {
      const openlogin = new Openlogin({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        clientId: process.env.NEXT_PUBLIC_TORUS_CLIENT_ID!,
        network: 'testnet',
      })
      await openlogin.init()
      return openlogin
    })
}

export const useOpenlogin = () => useSWR('openlogin', fetchOpenlogin, { revalidateOnFocus: false })
