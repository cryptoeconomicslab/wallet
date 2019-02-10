import { combineReducers } from 'redux'
import wallet, { State as WalletState } from './wallet'
import deposit, { State as DepositState } from './deposit'
import transfer, { State as TransferState } from './transfer'

export interface State {
  wallet: WalletState
  deposit: DepositState
  transfer: TransferState
}

export default combineReducers({
  wallet,
  deposit,
  transfer
})
