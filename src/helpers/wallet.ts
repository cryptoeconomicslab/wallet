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
      return ChamberWallet.createWalletWithPrivateKey(
        client,
        process.env.ROOTCHAIN_ENDPOINT,
        process.env.ROOTCHAIN_ADDRESS,
        storage,
        privateKey
      )
    } catch (e) {
      throw e
    }
  }

  public static loadWallet(): ChamberWallet | null {
    // TODO: implement
    return null
  }
}
