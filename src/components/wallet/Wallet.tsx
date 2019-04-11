import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../redux/modules'
import {
  changeToken,
  WALLET_STATUS,
  State as WalletState
} from '../../redux/modules/chamberWallet/wallet'
import UTXOList from './UTXOList'
import UserActionSection from './UserActionSection'
import {
  FONT_SIZE,
  PADDING,
  MARGIN,
  BOX_SHADOW,
  RADIUS
} from '../../constants/size'
import colors from '../../constants/colors'
import Link from 'next/link'
import { TiArrowForward, TiArrowDownThick, TiPlus } from 'react-icons/ti'
import { getTokenName, getTokenMinDigits } from '../../helpers/utils'

interface StateProps {
  wallet: WalletState
}

interface DispatchProps {
  changeToken: (token: { id: number; address: string }) => void
}

interface State {
  actions: any[]
}

class WalletCard extends React.Component<StateProps & DispatchProps, State> {
  public state = {
    actions: []
  }

  public async componentDidMount() {
    const { ref } = this.props.wallet

    await ref.init()
    ref.on('updated', this.onUpdate)
    const actions = await ref.getUserActions(0)
    this.setState({ actions })
  }

  public componentWillUnmount() {
    const { ref } = this.props.wallet
    ref.off('updated', this.onUpdate)
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
    const balance = ref.getBalance(wallet.selectedToken.id)
    const utxos = ref.getUTXOArray()
    const { actions } = this.state
    const selectedTokenId = wallet.selectedToken.id

    return (
      <main>
        <section className="heading">
          <div>
            <select onChange={this.handleChangeToken}>
              {wallet.tokens.map(token => (
                <option
                  key={token.id}
                  value={token.id}
                  selected={selectedTokenId === token.id}
                >
                  {getTokenName(token.id)}
                </option>
              ))}
            </select>
          </div>
          <div className="balance-section">
            <h3 className="balance-title">Balance</h3>
            <div className="balance-body">
              <span className="balance-value">
                {getTokenMinDigits(selectedTokenId, balance)}
                <span className="unit">{getTokenName(selectedTokenId)}</span>
              </span>
              <Link href="/deposit" prefetch>
                <button className="deposit-link">
                  <TiPlus />
                  Deposit
                </button>
              </Link>
            </div>
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
                <button className="link-button">
                  <TiArrowForward size={24} />
                  <span>Transfer</span>
                </button>
              </Link>
            </div>
            <div className="link-card">
              <Link prefetch href="/deposit">
                <button className="link-button">
                  <TiArrowDownThick size={24} />
                  <span>Deposit</span>
                </button>
              </Link>
            </div>
          </section>
          <UserActionSection actions={actions} />
          <UTXOList utxos={utxos} wallet={ref} />
        </div>
        <style jsx>{`
          .body {
            margin: ${MARGIN.LARGE};
          }

          .heading {
            background-color: ${colors.BG_WHITE};
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

          .balance-body {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .balance-value {
            font-size: ${FONT_SIZE.VERY_LARGE};
          }

          .unit {
            font-size: ${FONT_SIZE.SEMI_LARGE};
            margin-left: ${MARGIN.MEDIUM};
          }

          .deposit-link {
            padding: ${PADDING.MEDIUM};
            background-color: ${colors.BG_PRIMARY};
            color: ${colors.TEXT_INVERSE};
            border-radius: ${RADIUS.NORMAL};
            border: none;
            display: flex;
            align-items: center;
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
            font-size: ${FONT_SIZE.TINY};
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </main>
    )
  }

  private onUpdate = async () => {
    const { ref } = this.props.wallet
    await ref.syncChildChain()
    this.forceUpdate()
  }

  private handleChangeToken = e => {
    const id = Number(e.target.value)
    const { wallet } = this.props
    const selectedToken = wallet.tokens.find(t => t.id === id)
    this.props.changeToken(selectedToken)
  }
}

export default connect(
  (state: AppState): StateProps => ({
    wallet: state.chamberWallet.wallet
  }),
  { changeToken }
)(WalletCard)
