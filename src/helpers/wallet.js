// TODO: typescriptify
import {
  ChamberWallet,
  PlasmaClient
} from '@layer2/wallet';
import {
  WalletStorage
} from './storage';
import {
  JsonRpcClient
} from './jsonrpc'

/**
 * Plasma wallet store UTXO and proof
 */
export default class WalletFactory {

  static createWallet() {
    const jsonRpcClient = new JsonRpcClient(process.env.CHILDCHAIN_ENDPOINT || 'http://localhost:3000')
    const client = new PlasmaClient(jsonRpcClient)
    const storage = new WalletStorage()
    const privateKey = storage.get('privateKey')
    return new ChamberWallet(
      client,
      privateKey?privateKey: process.env.PRIVATE_KEY,
      process.env.ROOTCHAIN_ENDPOINT,
      process.env.ROOTCHAIN_ADDRESS,
      storage
    )
  }
}
