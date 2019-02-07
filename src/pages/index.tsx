import * as React from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../redux/modules'
import {
  loadWallet,
  State as ChamberWalletState,
  WALLET_STATUS
} from '../redux/modules/chamberWallet'
import Card from '../components/wallet/Card'

interface StateProps {
  chamberWallet: ChamberWalletState
}

interface DispatchProps {
  loadWallet: () => void
}

class App extends React.Component<StateProps & DispatchProps> {
  public componentDidMount() {
    const { chamberWallet, loadWallet } = this.props
    const status = chamberWallet.status
    if (status === WALLET_STATUS.INITIAL || status === WALLET_STATUS.ERROR) {
      loadWallet()
    }
  }

  public render() {
    const { chamberWallet } = this.props
    if (chamberWallet.status === WALLET_STATUS.INITIAL) {
      return <div>Wallet is not loaded. Please import.</div>
    }

    if (chamberWallet.status === WALLET_STATUS.LOADING) {
      return <div>Importing Wallet</div>
    }

    if (chamberWallet.status === WALLET_STATUS.ERROR) {
      return <div>something went wrong. Please import wallet again</div>
    }

    const { wallet } = chamberWallet
    const balance = wallet.getBalance()

    return <Card balance={balance} />
  }
}

export default connect(
  (state: AppState): StateProps => ({
    chamberWallet: state.chamberWallet
  }),
  (dispatch: Dispatch): DispatchProps => ({
    loadWallet: bindActionCreators(loadWallet, dispatch)
  })
)(App)
