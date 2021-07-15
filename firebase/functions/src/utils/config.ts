/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from 'firebase-functions'

const {
  contract: { chain_url: chainUrl, owner_address: ownerAddress, owner_private_key: ownerPrivateKey },
} = config()

export { chainUrl, ownerAddress, ownerPrivateKey }
