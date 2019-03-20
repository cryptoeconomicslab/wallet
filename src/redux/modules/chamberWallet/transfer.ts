import { Dispatch } from 'redux'
import { AppState } from '../index'

// CONSTANTS
export enum TRANSFER_STATUS {
  INITIAL = 'INITIAL',
  SENDING = 'SENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

// Action types
export enum TRANSFER_ACTION_TYPES {
  TRANSFER_START = 'TRANSFER_START',
  TRANSFER_SUCCESS = 'TRANSFER_SUCCESS',
  TRANSFER_FAIL = 'TRANSFER_FAIL',
  CHANGE_ACCOUNT_TRANSFER_TO = 'CHANGE_ACCOUNT_TRANSFER_TO',
  CHANGE_TRANSFER_AMOUNT = 'CHANGE_TRANSFER_AMOUNT',
  CLEAR_TRANSFER_ERROR = 'CLEAR_TRANSFER_ERROR',
  RESET = 'RESET'
}

// Action creators
export const transferStart = ({ to, amount }) => ({
  type: TRANSFER_ACTION_TYPES.TRANSFER_START,
  payload: { to, amount }
})

export const transferSuccess = () => ({
  type: TRANSFER_ACTION_TYPES.TRANSFER_SUCCESS
})

export const transferFail = (error: Error) => ({
  type: TRANSFER_ACTION_TYPES.TRANSFER_FAIL,
  payload: error
})

export const changeAccountTransferTo = (to: string) => ({
  type: TRANSFER_ACTION_TYPES.CHANGE_ACCOUNT_TRANSFER_TO,
  payload: to
})

export const changeTransferAmount = (amount: number) => ({
  type: TRANSFER_ACTION_TYPES.CHANGE_TRANSFER_AMOUNT,
  payload: amount
})

export const clearTransferError = () => ({
  type: TRANSFER_ACTION_TYPES.CLEAR_TRANSFER_ERROR
})

export const reset = () => ({
  type: TRANSFER_ACTION_TYPES.RESET
})

// Reducer
export interface State {
  status: TRANSFER_STATUS
  to: string // Address to transfer
  amount: number // amount to transfer
  error: Error | null
}

const initialState: State = {
  status: TRANSFER_STATUS.INITIAL,
  to: '',
  amount: 0,
  error: null
}

interface TransferAction {
  type: TRANSFER_ACTION_TYPES
  payload?: any
}

const reducer = (
  state: State = initialState,
  action: TransferAction
): State => {
  switch (action.type) {
    case TRANSFER_ACTION_TYPES.TRANSFER_START:
      return {
        ...state,
        status: TRANSFER_STATUS.SENDING
      }
    case TRANSFER_ACTION_TYPES.TRANSFER_SUCCESS:
      return {
        ...state,
        status: TRANSFER_STATUS.SUCCESS
      }
    case TRANSFER_ACTION_TYPES.TRANSFER_FAIL:
      return {
        ...state,
        status: TRANSFER_STATUS.ERROR,
        error: action.payload
      }
    case TRANSFER_ACTION_TYPES.CHANGE_ACCOUNT_TRANSFER_TO:
      return {
        ...state,
        to: action.payload
      }
    case TRANSFER_ACTION_TYPES.CHANGE_TRANSFER_AMOUNT:
      return {
        ...state,
        amount: action.payload
      }
    case TRANSFER_ACTION_TYPES.CLEAR_TRANSFER_ERROR:
      return {
        ...state,
        status: TRANSFER_STATUS.INITIAL,
        error: null
      }
    case TRANSFER_ACTION_TYPES.RESET:
      return { ...initialState }
    default:
      return state
  }
}

export default reducer

// thunks
export const send = () => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const state = getState()
  const { to, amount } = state.chamberWallet.transfer
  dispatch(transferStart({ to, amount }))
  const ref = state.chamberWallet.wallet.ref
  // TODO: validation
  // TODO: handle error on return value
  try {
    await ref.transfer(to, amount.toString())
  } catch (e) {
    dispatch(transferFail(e))
    return
  }
  dispatch(transferSuccess())
}
