import { ChamberWallet, PlasmaClient, BrowserStorage } from '@layer2/wallet'
import { OwnState } from '@layer2/core'
import { JsonRpcClient } from './jsonrpc'
import { MQTTClient } from './mqtt'

OwnState.setAddress('0x9fbda871d559710256a2502a2517b794b482db40')

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
    try {
      const wallet = ChamberWallet.createWalletWithPrivateKey(
        client,
        process.env.ROOTCHAIN_ENDPOINT,
        process.env.ROOTCHAIN_ADDRESS,
        storage,
        privateKey
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
