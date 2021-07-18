import { useWeb3 } from 'src/hooks/useWeb3'
import useSWR from 'swr'

export const useToken = () => {
  const { contract, address, runContract } = useWeb3()

  const { data: totalSupply } = useSWR(['totalSupply', contract], () => contract?.methods.totalSupply().call())
  const { data: balance, revalidate } = useSWR(['balance', contract, address], () =>
    contract?.methods.balanceOf(address).call(),
  )

  const transfer = async (recipient: string, amount: number) => {
    const abi = contract?.methods.transfer(recipient, amount).encodeABI()
    await runContract(abi)
    revalidate()
  }

  const getBalance = async (targetAddress: string) => {
    return contract?.methods.balanceOf(targetAddress).call()
  }

  return { totalSupply, balance, transfer, getBalance }
}
