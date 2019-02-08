import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { SignedTransactionWithProof } from '@layer2/core'
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
import UTXOList from './UTXOList'
import { Button, LoadingSpinner } from '../common'
import { MarginHorizontal } from '../utility'
import { FONT_SIZE, PADDING, BORDER, MARGIN } from '../../constants/size'
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

interface State {
  depositAmount: number
}

class WalletCard extends React.Component<
  Props & StateProps & DispatchProps,
  State
> {
  public state = {
    depositAmount: 1
  }

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

    // Maybe no need this status
    if (wallet.status === WALLET_STATUS.LOADING) {
      return <div>Importing Wallet</div>
    }

    if (wallet.status === WALLET_STATUS.ERROR) {
      return <div>something went wrong. Please import wallet again</div>
    }

    const { ref } = wallet
    const balance = ref.getBalance()
    const depositStatus = this.props.depositState.status
    const utxos = ref.getUTXOArray()

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
        {/* UTXOList section */}
        <UTXOList handleExit={this.handleExit} utxos={utxos} />
        <section className="control-section">
          {/* Control section */}
          <h3 className="control-title">DEPOSIT</h3>
          <div className="deposit-control">
            <div>
              <select
                className="deposit-amount-select"
                onChange={this.handleChangeDepositAmount}
              >
                <option value={1}>1 ETH</option>
                <option value={2}>2 ETH</option>
                <option value={5}>5 ETH</option>
                <option value={10}>10 ETH</option>
              </select>
            </div>
            <div className="controls">
              <Button
                disabled={depositStatus === DEPOSIT_STATUS.LOADING}
                onClick={this.handleDeposit}
              >
                Deposit
              </Button>
              {depositStatus === DEPOSIT_STATUS.LOADING && (
                <>
                  <MarginHorizontal />
                  <LoadingSpinner size="medium" />
                </>
              )}
            </div>
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
            border-bottom: solid ${BORDER.THICK} ${colors.BORDER_COLOR_LIGHT};
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

          .control-section {
            padding-top: ${PADDING.MEDIUM};
            border-top: solid ${BORDER.THICK} ${colors.BORDER_COLOR_LIGHT};
          }

          .deposit-control {
            display: flex;
            align-items: center;
          }

          .deposit-control > .controls {
            display: flex;
            align-items: center;
          }

          .deposit-amount-select {
            color: ${colors.TEXT_MAIN};
            background-color: transparent;
            border: solid ${BORDER.THICK} ${colors.BORDER_COLOR_LIGHT};
            font-size: ${FONT_SIZE.MEDIUM};
            margin-right: ${MARGIN.MEDIUM};
            padding: ${PADDING.MEDIUM};
          }

          .deposit-title {
            font-size: ${FONT_SIZE.MEDIUM};
          }
        `}</style>
      </main>
    )
  }

  private handleDeposit = () => {
    this.props.deposit(this.state.depositAmount)
  }

  private handleChangeDepositAmount = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({ depositAmount: Number(e.target.value) })
  }

  private handleExit = (tx: SignedTransactionWithProof) => {
    this.props.wallet.ref.exit(tx)
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
