import * as React from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../redux/modules'
import {
  State as WalletState,
  loadWallet,
  WALLET_STATUS
} from '../redux/modules/chamberWallet/wallet'
import {
  deposit,
  State as DepositState
} from '../redux/modules/chamberWallet/deposit'
import Card from '../components/wallet/Card'
import { ThunkDispatch } from 'redux-thunk'

interface StateProps {
  wallet: WalletState
  depositState: DepositState
}

interface DispatchProps {
  loadWallet: () => void
  deposit: (ether: number) => void
}

class App extends React.Component<StateProps & DispatchProps> {
  public componentDidMount() {
    const { wallet, loadWallet } = this.props
    const status = wallet.status
    if (status === WALLET_STATUS.INITIAL || status === WALLET_STATUS.ERROR) {
      loadWallet()
    }
  }

  public render() {
    const { wallet, depositState, deposit } = this.props
    if (wallet.status === WALLET_STATUS.INITIAL) {
      return <div>Wallet is not loaded. Please import.</div>
    }

    if (wallet.status === WALLET_STATUS.LOADING) {
      return <div>Importing Wallet</div>
    }

    if (wallet.status === WALLET_STATUS.ERROR) {
      return <div>something went wrong. Please import wallet again</div>
    }

    const { ref } = wallet
    const balance = ref.getBalance()

    return (
      <Card
        balance={balance}
        handleDeposit={() => deposit(1)}
        depositStatus={depositState.status}
      />
    )
  }
}

export default connect(
  (state: AppState): StateProps => ({
    wallet: state.chamberWallet.wallet,
    depositState: state.chamberWallet.deposit
  }),
  (dispatch: Dispatch): DispatchProps => ({
    loadWallet: bindActionCreators(loadWallet, dispatch),
    deposit: (ether: number) => {
      ;(dispatch as ThunkDispatch<void, AppState, any>)(deposit(ether))
    }
  })
)(App)
