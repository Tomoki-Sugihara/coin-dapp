import { config } from 'firebase-functions'

const {
  contract: { chainId, ownerAddress, ownerPrivateKey },
} = config()

export { chainId, ownerAddress, ownerPrivateKey }
