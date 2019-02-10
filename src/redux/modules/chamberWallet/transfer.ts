// CONSTANTS
export enum TRANSFER_STATUS {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
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
export const transferStart = () => ({
  type: TRANSFER_ACTION_TYPES.TRANSFER_START
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
  to: string | null // Address to transfer
  amount: number // amount to transfer
  error: Error | null
}

const initialState: State = {
  status: TRANSFER_STATUS.INITIAL,
  to: null,
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
        status: TRANSFER_STATUS.LOADING
      }
    case TRANSFER_ACTION_TYPES.TRANSFER_SUCCESS:
      return {
        ...state,
        status: TRANSFER_STATUS.LOADED
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
