import * as React from 'react'
import Transfer from '../components/transfer/Transfer'
import CreateWalletSection from '../components/wallet/CreateWalletSection'
import { connect } from 'react-redux'
import { AppState } from '../redux/modules'
import {
  State as WalletState,
  WALLET_STATUS,
  loadWallet
} from '../redux/modules/chamberWallet/wallet'
import {
  changeAccountTransferTo,
  changeTransferAmount,
  changeFFTransfer
} from '../redux/modules/chamberWallet/transfer'
import Heading from '../components/Heading'
import { changeUnit } from '../helpers/utils'

interface StateProps {
  wallet: WalletState
}

interface DispatchProps {
  loadWallet: () => void
  changeFFTransfer: (isFF: boolean) => void
}

class TransferPage extends React.Component<StateProps & DispatchProps> {
  public static getInitialProps({ query, isServer, store }) {
    if (isServer) {
      store.dispatch(changeTransferAmount(Number(query.amount) || 0))
      store.dispatch(changeAccountTransferTo(query.address || ''))
      store.dispatch(changeFFTransfer(!!query.isFF))
    }
    return query
  }

  public componentDidMount() {
    const { wallet, loadWallet } = this.props
    if (wallet.status === WALLET_STATUS.INITIAL) {
      loadWallet()
    }
  }

  public componentWillUnmount() {
    this.props.changeFFTransfer(false)
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
              balance={changeUnit(wallet.selectedToken.id, wallet.ref.getBalance(wallet.selectedToken.id))}
              tokenId={wallet.selectedToken.id}
            />
            <Transfer />
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
  { loadWallet, changeFFTransfer }
)(TransferPage)
