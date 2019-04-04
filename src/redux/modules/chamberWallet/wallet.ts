import { Dispatch } from 'redux'
import { ChamberWallet } from '@layer2/wallet'
import WalletFactory from '../../../helpers/wallet'
import delay from '../../../utils/delay'

// CONSTANTS
export enum WALLET_STATUS {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  NO_WALLET = 'NO_WALLET',
  ERROR = 'ERROR'
}

// Action types
export enum WALLET_ACTION_TYPES {
  LOAD_WALLET_START = 'LOAD_WALLET_START',
  LOAD_WALLET_SUCCESS = 'LOAD_WALLET_SUCCESS',
  LOAD_WALLET_FAIL = 'LOAD_WALLET_FAIL',
  CLEAR_WALLET_ERROR = 'CLEAR_WALLET_ERROR',
  SET_WALLET_STATUS = 'SET_WALLET_STATUS',
  RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION',
  TOKEN_LOADED = 'TOKEN_LOADED',
  CHANGE_TOKEN = 'CHANGE_TOKEN'
}

// Action creators
export const loadWalletStart = () => ({
  type: WALLET_ACTION_TYPES.LOAD_WALLET_START
})

export const loadWalletSuccess = (wallet: ChamberWallet) => ({
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

export const setWalletStatus = (status: WALLET_STATUS) => ({
  type: WALLET_ACTION_TYPES.SET_WALLET_STATUS,
  payload: status
})

export const receiveTransaction = value => ({
  type: WALLET_ACTION_TYPES.RECEIVE_TRANSACTION,
  payload: value
})

export const changeToken = token => ({
  type: WALLET_ACTION_TYPES.CHANGE_TOKEN,
  payload: token
})

export const tokenLoaded = tokens => ({
  type: WALLET_ACTION_TYPES.TOKEN_LOADED,
  payload: tokens
})

// Reducer
export interface State {
  status: WALLET_STATUS
  error: Error | null
  ref: ChamberWallet | null
  tokens: Array<{
    id: number
    address: string
  }>
  selectedToken: {
    id: number
    address: string
  }
}

const initialState: State = {
  status: WALLET_STATUS.INITIAL,
  ref: null,
  error: null,
  tokens: [],
  selectedToken: {
    id: 0,
    address: '"0x0000000000000000000000000000000000000000"'
  }
}

interface WalletAction {
  type: WALLET_ACTION_TYPES
  payload?: any
}

const reducer = (state: State = initialState, action: WalletAction): State => {
  switch (action.type) {
    case WALLET_ACTION_TYPES.SET_WALLET_STATUS:
      return {
        ...state,
        status: action.payload
      }
    case WALLET_ACTION_TYPES.LOAD_WALLET_START:
      return {
        ...state,
        status: WALLET_STATUS.LOADING
      }
    case WALLET_ACTION_TYPES.LOAD_WALLET_SUCCESS:
      return {
        ...state,
        status: WALLET_STATUS.LOADED,
        ref: action.payload
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
    case WALLET_ACTION_TYPES.TOKEN_LOADED:
      return {
        ...state,
        tokens: action.payload
      }
    case WALLET_ACTION_TYPES.CHANGE_TOKEN:
      return {
        ...state,
        selectedToken: action.payload
      }
    default:
      return state
  }
}

export default reducer

// Thunks
const onWalletLoaded = async (wallet: ChamberWallet, dispatch: Dispatch) => {
  dispatch(loadWalletSuccess(wallet))
  await wallet.init()
  await wallet.syncChildChain()

  // TODO: how to load transactions on initial mount
  wallet.addListener('receive', value => {
    console.log('received!!')
    // TODO: change timestamp
    const time = new Date()
    dispatch(receiveTransaction({ ...value, time }))
  })

  const tokens = await wallet.getAvailableTokens()
  dispatch(tokenLoaded(tokens))
}

export const loadWallet = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadWalletStart())

    // Load wallet if in storage
    const wallet = await WalletFactory.loadWallet()
    if (wallet) {
      await onWalletLoaded(wallet, dispatch)
    } else {
      dispatch(setWalletStatus(WALLET_STATUS.NO_WALLET))
    }
  }
}

// TODO: create random, create from mnemonic
export const createWallet = (privateKey: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadWalletStart())
    await delay(500)

    try {
      const wallet = WalletFactory.createWallet({ privateKey })
      await onWalletLoaded(wallet, dispatch)
    } catch (e) {
      dispatch(loadWalletFail(e)) // TODO: make custom error ErrorCreateWallet
    }
  }
}
