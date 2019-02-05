import { Dispatch } from 'redux'
import { MockChamberWallet } from '../../mocks/mockChamberWallet'
import delay from '../../utils/delay'

// CONSTANTS
export enum WALLET_STATUS {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR'
}

// Action types
export enum WALLET_ACTION_TYPES {
  LOAD_WALLET_START = 'LOAD_WALLET_START',
  LOAD_WALLET_SUCCESS = 'LOAD_WALLET_SUCCESS',
  LOAD_WALLET_FAIL = 'LOAD_WALLET_FAIL',
  CLEAR_WALLET_ERROR = 'CLEAR_WALLET_ERROR'
}

// Action creators
export const loadWalletStart = () => ({
  type: WALLET_ACTION_TYPES.LOAD_WALLET_START
})

export const loadWalletSuccess = (wallet: MockChamberWallet) => ({
  type: WALLET_ACTION_TYPES.LOAD_WALLET_SUCCESS,
  payload: wallet
})

export const loadWalletFail = (error: Error) => ({
  type: WALLET_ACTION_TYPES.LOAD_WALLET_FAIL,
  payload: error
})

export const clearWalletError = () => ({
  type: WALLET_ACTION_TYPES.CLEAR_WALLET_ERROR
})

// Reducer
export interface State {
  status: WALLET_STATUS
  error: Error | null
  wallet: MockChamberWallet | null
}

const initialState: State = {
  status: WALLET_STATUS.INITIAL,
  wallet: null,
  error: null
}

interface WalletAction {
  type: WALLET_ACTION_TYPES
  payload?: any
}

const reducer = (state: State = initialState, action: WalletAction): State => {
  switch (action.type) {
    case WALLET_ACTION_TYPES.LOAD_WALLET_START:
      return {
        ...state,
        status: WALLET_STATUS.LOADING
      }
    case WALLET_ACTION_TYPES.LOAD_WALLET_SUCCESS:
      return {
        ...state,
        status: WALLET_STATUS.LOADED,
        wallet: action.payload
      }
    case WALLET_ACTION_TYPES.LOAD_WALLET_FAIL:
      return {
        ...state,
        status: WALLET_STATUS.ERROR,
        error: action.payload
      }
    case WALLET_ACTION_TYPES.CLEAR_WALLET_ERROR:
      return {
        ...state,
        status: WALLET_STATUS.INITIAL,
        error: null
      }
    default:
      return state
  }
}

export default reducer

// Thunks
export const loadWallet = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadWalletStart())

    await delay(2000)
    // TODO: load required data from appropriate data source like metamask
    const wallet = new MockChamberWallet()
    dispatch(loadWalletSuccess(wallet))
  }
}
