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
import WalletCard from '../components/wallet/WalletCard'
import { ThunkDispatch } from 'redux-thunk'
import { FONT_SIZE } from '../constants/size'

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
      <div>
        <h1 className="title">My Wallet</h1>
        <WalletCard
          walletName="Chamber Wallet"
          balance={balance}
          handleDeposit={() => deposit(1)}
          depositStatus={depositState.status}
        />
        <style jsx>{`
          .title {
            font-size: ${FONT_SIZE.LARGE};
            padding: 1.2rem;
          }
        `}</style>
      </div>
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
