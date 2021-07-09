import { useWeb3 } from 'src/hooks/useWeb3'
import useSWR from 'swr'

export const useToken = () => {
  const { contract, address, toContract } = useWeb3()

  const { data: totalSupply } = useSWR('totalSupply', () => contract?.methods.totalSupply().call())
  const { data: balance } = useSWR('balance', () => contract?.methods.balanceOf(address).call())

  const transfer = async (recipient: string, amount: number) => {
    const abi = contract?.methods.transfer(recipient, amount).encodeABI()
    await toContract(abi)
  }

  return { totalSupply, balance, transfer }
}
