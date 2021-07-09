import { atom } from 'recoil'
import Web3 from 'web3'

export const web3State = atom<Web3>({
  key: 'web3State',
  default: new Web3(new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_PRIVATE_CHAIN_URL as string)),
  dangerouslyAllowMutability: true,
})

export const accountState = atom<{ address: string; privateKey: string }>({
  key: 'accountState',
  default: { address: '', privateKey: '' },
  dangerouslyAllowMutability: true,
})
