import { ChamberWallet, PlasmaClient, IWalletStorage } from '@layer2/wallet'
import { WalletStorage } from './storage'
import { JsonRpcClient } from './jsonrpc'

// TODO: add mnemonic
interface CreateWalletArgs {
  privateKey: string
}

/**
 * Plasma wallet store UTXO and proof
 */
export default class WalletFactory {
  public static createWallet({ privateKey }: CreateWalletArgs): ChamberWallet {
    const jsonRpcClient = new JsonRpcClient(
      process.env.CHILDCHAIN_ENDPOINT || 'http://localhost:3000'
    )
    const client = new PlasmaClient(jsonRpcClient)
    const storage: IWalletStorage = new WalletStorage() as any
    try {
      const wallet = ChamberWallet.createWalletWithPrivateKey(
        client,
        process.env.ROOTCHAIN_ENDPOINT,
        process.env.ROOTCHAIN_ADDRESS,
        storage,
        privateKey
      )
      ;(window as any).wallet = wallet
      // TODO: how to save privateKey?
      storage.add('privateKey', privateKey)
      return wallet
    } catch (e) {
      throw e
    }
  }

  public static loadWallet(): ChamberWallet | null {
    const storage = new WalletStorage()
    const privateKey = storage.get('privateKey')
    if (privateKey) {
      const wallet = WalletFactory.createWallet({ privateKey })
      return wallet
    }

    return null
  }
}
