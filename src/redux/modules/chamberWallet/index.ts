import { combineReducers } from 'redux'
import wallet, { State as WalletState } from './wallet'
import deposit, { State as DepositState } from './deposit'

export interface State {
  wallet: WalletState
  deposit: DepositState
}

export default combineReducers({
  wallet,
  deposit
})
