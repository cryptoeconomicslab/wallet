import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../redux/modules'
import {
  DEPOSIT_STATUS,
  State as DepositState,
  deposit
} from '../../redux/modules/chamberWallet/deposit'
import {
  WALLET_STATUS,
  State as WalletState,
  loadWallet
} from '../../redux/modules/chamberWallet/wallet'
import { Button, LoadingSpinner } from '../common'
import { MarginHorizontal } from '../utility'
import { FONT_SIZE, PADDING } from '../../constants/size'
import colors from '../../constants/colors'

interface Props {
  walletName: string
}

interface StateProps {
  wallet: WalletState
  depositState: DepositState
}

interface DispatchProps {
  loadWallet: () => void
  deposit: (ether: number) => void
}

class WalletCard extends React.Component<Props & StateProps & DispatchProps> {
  public componentDidMount() {
    const { wallet, loadWallet } = this.props
    const status = wallet.status
    if (status === WALLET_STATUS.INITIAL || status === WALLET_STATUS.ERROR) {
      loadWallet()
    }
  }

  public render() {
    const { walletName, wallet } = this.props
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
    const depositStatus = this.props.depositState.status

    return (
      <main className="container">
        <section className="title-section">
          <h2 className="wallet-title">{walletName}</h2>
        </section>
        <section className="balance-section">
          {/* Balance section */}
          <h3 className="balance-title">Balance</h3>
          <div>
            <span className="balance-value">
              {balance.toNumber().toLocaleString()}
            </span>
          </div>
        </section>
        <section>{/* UTXO List section */}</section>
        <section className="control-section">
          {/* Control section */}
          <div className="deposit-control">
            <Button
              disabled={depositStatus === DEPOSIT_STATUS.LOADING}
              onClick={() => this.handleDeposit(1)}
            >
              Deposit 1eth
            </Button>
            {depositStatus === DEPOSIT_STATUS.LOADING && (
              <>
                <MarginHorizontal />
                <LoadingSpinner size="medium" />
              </>
            )}
          </div>
        </section>
        <style jsx>{`
          .container {
            width: calc(100% - 2.4rem);
            height: 80vh;
            padding: 1.2rem;
            border-radius: 8px;
            background: linear-gradient(
              to right bottom,
              ${colors.BG_GRADIENT_FROM},
              ${colors.BG_GRADIENT_TO}
            );
            color: ${colors.TEXT_MAIN};
            margin: auto;
          }

          .title-section {
            border-bottom: solid 1px ${colors.BORDER_COLOR_LIGHT};
            padding-bottom: ${PADDING.TINY};
          }

          .wallet-title {
            font-size: ${FONT_SIZE.SEMI_LARGE};
            text-transform: uppercase;
          }

          .balance-section {
            height: 25vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .balance-title {
            text-transform: uppercase;
            font-size: ${FONT_SIZE.SEMI_LARGE};
          }

          .balance-value {
            font-size: ${FONT_SIZE.VERY_LARGE};
          }

          .deposit-control {
            display: flex;
            align-items: center;
          }
        `}</style>
      </main>
    )
  }

  private handleDeposit = (eth?: number) => {
    const val = eth || 1
    this.props.deposit(val)
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
)(WalletCard)
