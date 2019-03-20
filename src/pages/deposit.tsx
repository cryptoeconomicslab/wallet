import * as React from 'react'
import Deposit from '../components/deposit/Deposit'
import CreateWalletSection from '../components/wallet/CreateWalletSection'
import { connect } from 'react-redux'
import { AppState } from '../redux/modules'
import {
  State as WalletState,
  WALLET_STATUS,
  loadWallet
} from '../redux/modules/chamberWallet/wallet'
import Heading from '../components/Heading'

interface StateProps {
  wallet: WalletState
}

interface DispatchProps {
  loadWallet: () => void
}

class DepositPage extends React.Component<StateProps & DispatchProps> {
  public componentDidMount() {
    const { wallet, loadWallet } = this.props
    if (wallet.status === WALLET_STATUS.INITIAL) {
      loadWallet()
    }
  }

  public render() {
    const { wallet } = this.props
    return (
      <div>
        {/* wallet status condition */
        wallet.status === WALLET_STATUS.INITIAL ||
        wallet.status === WALLET_STATUS.LOADING ? (
          <div>LOADING...</div>
        ) : wallet.status === WALLET_STATUS.LOADED ? (
          <>
            <Heading balance={wallet.ref.getBalance()} />
            <Deposit />
          </>
        ) : wallet.status === WALLET_STATUS.NO_WALLET ? (
          <CreateWalletSection />
        ) : wallet.status === WALLET_STATUS.ERROR ? (
          <div>{wallet.error.message}</div>
        ) : null}
      </div>
    )
  }
}

export default connect(
  (state: AppState) => ({
    wallet: state.chamberWallet.wallet
  }),
  { loadWallet }
)(DepositPage)
