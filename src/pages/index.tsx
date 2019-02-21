import * as React from 'react'
import WalletCard from '../components/wallet/WalletCard'
import { FONT_SIZE } from '../constants/size'
import { connect } from 'react-redux'
import { AppState } from '../redux/modules'
import {
  State as WalletState,
  WALLET_STATUS,
  loadWallet
} from '../redux/modules/chamberWallet/wallet'

interface StateProps {
  wallet: WalletState
}

interface DispatchProps {
  loadWallet: () => void
}

class App extends React.Component<StateProps & DispatchProps> {
  public componentDidMount() {
    const { wallet, loadWallet } = this.props
    if (wallet.status === WALLET_STATUS.INITIAL) {
      loadWallet()
    }
  }

  public render() {
    const { wallet } = this.props
    console.log(wallet.status)

    return (
      <div>
        <h1 className="title">Wallets</h1>
        {wallet.status === WALLET_STATUS.INITIAL ||
        wallet.status === WALLET_STATUS.LOADING ? (
          <div>LOADING...</div>
        ) : wallet.status === WALLET_STATUS.LOADED ? (
          <WalletCard walletName="Chamber Wallet" />
        ) : wallet.status === WALLET_STATUS.ERROR ? (
          <div>
            {/* TODO: if no wallet is ever created, display create wallet section */}
            {wallet.error.message}
          </div>
        ) : null}
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
  (state: AppState) => ({
    wallet: state.chamberWallet.wallet
  }),
  { loadWallet }
)(App)
