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
import { getTokenMaxDigits } from '../helpers/utils'

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
            <Heading
              wallet={wallet.ref}
              balance={getTokenMaxDigits(
                wallet.selectedToken.id,
                wallet.ref.getBalance(wallet.selectedToken.id)
              )}
              tokenId={wallet.selectedToken.id}
            />
            <Deposit />
          </>
        ) : wallet.status === WALLET_STATUS.NO_WALLET ||
          wallet.status === WALLET_STATUS.ERROR ? (
          <CreateWalletSection error={wallet.error} />
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
