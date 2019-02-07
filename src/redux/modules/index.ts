import { combineReducers } from 'redux'
import chamberWalletReducer, {
  State as ChamberWalletState
} from './chamberWallet'

export interface AppState {
  chamberWallet: ChamberWalletState
}

export default combineReducers({
  chamberWallet: chamberWalletReducer
})
