import { ChamberWallet, PlasmaClient, BrowserStorage } from '@layer2/wallet'
import { JsonRpcClient } from './jsonrpc'
import { MQTTClient } from './mqtt'


// TODO: add mnemonic
interface CreateWalletArgs {
  privateKey: string
}

/**
 * Plasma wallet store UTXO and proof
 */
export default class WalletFactory {
  public static createWallet({ privateKey }: CreateWalletArgs): ChamberWallet {
    const childChainEndpoint =
      process.env.CHILDCHAIN_ENDPOINT || 'http://localhost:3000'
    const jsonRpcClient = new JsonRpcClient(childChainEndpoint)
    const mqttClient = new MQTTClient(
      process.env.CHILDCHAIN_PUBSUB_ENDPOINT || childChainEndpoint
    )
    const client = new PlasmaClient(jsonRpcClient, mqttClient)
    const storage = new BrowserStorage()
    const options = {
      // kovan
      // initialBlock: 10000000,
      initialBlock: process.env.INITIAL_BLOCK || 1,
      interval: 20000,
      confirmation: process.env.CONFIRMATION || 0,
      OwnershipPredicate: process.env.OWNERSHIP_PREDICATE
    }    
    try {
      const wallet = ChamberWallet.createWalletWithPrivateKey(
        client,
        process.env.ROOTCHAIN_ENDPOINT,
        process.env.ROOTCHAIN_ADDRESS,
        storage,
        privateKey,
        options
      )
      ;(window as any).wallet = wallet
      storage.set('privateKey', privateKey)
      return wallet
    } catch (e) {
      throw e
    }
  }

  public static async loadWallet(): Promise<ChamberWallet | null> {
    const storage = new BrowserStorage()
    let privateKey: string | null
    try {
      privateKey = await storage.get('privateKey')
    } catch (e) {
      privateKey = null
    }

    if (privateKey) {
      const wallet = WalletFactory.createWallet({ privateKey })
      return wallet
    }

    return null
  }
}
