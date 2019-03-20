import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../redux/modules'
import {
  DEPOSIT_STATUS,
  State as DepositState,
  deposit
} from '../../redux/modules/chamberWallet/deposit'
import {
  WALLET_STATUS,
  State as WalletState
} from '../../redux/modules/chamberWallet/wallet'
import UTXOList from './UTXOList'
import { Button, LoadingSpinner } from '../common'
import { MarginHorizontal } from '../utility'
import {
  FONT_SIZE,
  PADDING,
  BORDER,
  MARGIN,
  BOX_SHADOW
} from '../../constants/size'
import colors from '../../constants/colors'
import Link from 'next/link'

interface StateProps {
  wallet: WalletState
  depositState: DepositState
}

interface DispatchProps {
  deposit: (ether: number) => void
}

interface State {
  depositAmount: number
}

class WalletCard extends React.Component<StateProps & DispatchProps, State> {
  public state = {
    depositAmount: 1
  }

  public async componentDidMount() {
    const { ref } = this.props.wallet

    ref.init(async () => {
      await ref.syncChildChain()
      this.forceUpdate()
    })
  }

  public render() {
    const { wallet } = this.props
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
    const utxos = ref.getUTXOArray()

    return (
      <main>
        <section className="heading">
          <div className="balance-section">
            <h3 className="balance-title">Balance</h3>
            <span className="balance-value">
              {balance.toNumber().toLocaleString()}
            </span>
          </div>
          <div className="address-section">
            <h4>Address</h4>
            <p className="address">{ref.getAddress()}</p>
          </div>
        </section>
        <div className="body">
          <section className="link-section">
            <div className="link-card">
              <Link prefetch href="/transfer">
                <button className="link-button">Transfer</button>
              </Link>
            </div>
            <div className="link-card">
              <Link prefetch href="/" /* TODO: implement */>
                <button className="link-button">Deposit</button>
              </Link>
            </div>
          </section>
          {/* UTXOList section */}
          <UTXOList utxos={utxos} wallet={ref} />
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
        </div>
        {/* TODO: place Transfer link */}
        <style jsx>{`
          .body {
            margin: ${MARGIN.LARGE};
            color: ${colors.TEXT_MAIN};
          }

          .heading {
            background-color: ${colors.BG_WHITE};
            color: ${colors.TEXT_MAIN};
            box-shadow: ${BOX_SHADOW.VERTICAL_NORMAL};
            padding: 0 ${PADDING.VERY_LARGE} ${PADDING.LARGE};
          }

          .address-section {
            margin-top: ${MARGIN.LARGE};
          }

          .address {
            word-break: break-word;
            font-size: ${FONT_SIZE.TINY};
          }

          .balance-section {
            height: 25vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .balance-title {
            font-size: ${FONT_SIZE.SEMI_LARGE};
          }

          .balance-value {
            font-size: ${FONT_SIZE.VERY_LARGE};
          }

          .link-section {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 12vh;
          }

          .link-card {
            background-color: ${colors.BG_WHITE};
            width: 30vw;
            height: 10vh;
            box-shadow: ${BOX_SHADOW.NORMAL};
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .link-button {
            width: 100%;
            height: 100%;
            color: ${colors.TEXT_PRIMARY};
            font-size: ${FONT_SIZE.MEDIUM};
            text-transform: uppercase;
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
}

export default connect(
  (state: AppState): StateProps => ({
    wallet: state.chamberWallet.wallet,
    depositState: state.chamberWallet.deposit
  }),
  (dispatch: Dispatch): DispatchProps => ({
    deposit: (ether: number) => {
      ;(dispatch as ThunkDispatch<void, AppState, any>)(deposit(ether))
    }
  })
)(WalletCard)
