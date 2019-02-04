import { AnyAction, Dispatch } from 'redux'
import { MockChamberWallet } from '../../mocks/mockChamberWallet'
import delay from '../../utils/delay'

// Action types
const INITIALIZE_WALLET = 'INITIALIZE_WALLET'

// Action creators
export const initWallet = (wallet: MockChamberWallet) => ({
  type: INITIALIZE_WALLET,
  payload: wallet
})

// Reducer
export interface State {
  initialized: boolean
  wallet: MockChamberWallet | null
}

const initialState: State = {
  initialized: false,
  wallet: null
}

const reducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case INITIALIZE_WALLET:
      return {
        ...state,
        initialized: true,
        wallet: action.payload
      }

    default:
      return state
  }
}

export default reducer

// Thunks
export const loadWallet = () => {
  return async (dispatch: Dispatch) => {
    // TODO: load required data from appropriate data source like metamask

    await delay(2000)
    const wallet = new MockChamberWallet()
    dispatch(initWallet(wallet))
  }
}
