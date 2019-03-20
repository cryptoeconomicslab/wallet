import * as React from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../../redux/modules'
import Link from 'next/link'
import {
  State as TransferState,
  changeTransferAmount,
  changeAccountTransferTo,
  send
} from '../../redux/modules/chamberWallet/transfer'
import { State as WalletState } from '../../redux/modules/chamberWallet/wallet'
import {
  FONT_SIZE,
  PADDING,
  MARGIN,
  BOX_SHADOW,
  FONT_WEIGHT
} from '../../constants/size'
import colors from '../../constants/colors'
import { InputControl, Button } from '../common'
import { PullRight } from '../utility'

interface StateProps {
  wallet: WalletState
  transferState: TransferState
}

interface DispatchProps {
  changeAmount: (amount: number) => void
  changeToAddress: (to: string) => void
  send: () => void
}

class TransferSection extends React.Component<StateProps & DispatchProps> {
  public render() {
    const { to, amount } = this.props.transferState
    const { wallet } = this.props
    const balance = wallet.ref.getBalance()

    return (
      <div className="container">
        <section className="heading">
          <Link href="/">
            <button className="back-button">←</button>
          </Link>
          <div className="balance-section">
            <h3 className="balance-title">Balance</h3>
            <span className="balance-value">
              {balance.toNumber().toLocaleString()}
            </span>
          </div>
        </section>
        <section className="body">
          <h3 className="title">Transfer</h3>
          <div className="transfer-form">
            <InputControl
              label="To"
              onChange={this.onChangeToAddress}
              value={to}
            />
            <InputControl
              label="Amount"
              onChange={this.onChangeAmount}
              value={amount}
            />
            <PullRight>
              <Button onClick={this.onClickSend}>SEND</Button>
            </PullRight>
          </div>
        </section>
        <style jsx>{`
          .heading {
            background-color: ${colors.BG_WHITE};
            color: ${colors.TEXT_MAIN};
            box-shadow: ${BOX_SHADOW.VERTICAL_NORMAL};
          }

          .body {
            margin: ${MARGIN.LARGE};
          }

          .balance-section {
            height: 14vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 ${PADDING.VERY_LARGE} ${PADDING.LARGE};
          }

          .balance-title {
            font-size: ${FONT_SIZE.MEDIUM};
          }

          .balance-value {
            font-size: ${FONT_SIZE.LARGE};
          }

          .title {
            font-size: ${FONT_SIZE.MEDIUM};
            text-transform: uppercase;
          }

          .back-button {
            font-size: ${FONT_SIZE.SEMI_LARGE};
            font-weight: ${FONT_WEIGHT.NORMAL};
            padding: ${PADDING.MEDIUM};
          }
        `}</style>
      </div>
    )
  }

  private onChangeToAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { changeToAddress } = this.props
    changeToAddress(e.target.value)
  }

  private onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { changeAmount } = this.props
    const val = Number(e.target.value)
    if (!Number.isNaN(val) && typeof val === 'number') {
      changeAmount(val)
    }
  }

  private onClickSend = () => {
    this.props.send()
  }
}

export default connect(
  (state: AppState) => ({
    wallet: state.chamberWallet.wallet,
    transferState: state.chamberWallet.transfer
  }),
  (dispatch: Dispatch): DispatchProps => ({
    changeAmount: bindActionCreators(changeTransferAmount, dispatch),
    changeToAddress: bindActionCreators(changeAccountTransferTo, dispatch),
    send: bindActionCreators(send, dispatch)
  })
)(TransferSection)
