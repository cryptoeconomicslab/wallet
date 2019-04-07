import * as React from 'react'
import { connect } from 'react-redux'
import { AppState } from '../../redux/modules'
import {
  State as TransferState,
  changeTransferAmount,
  changeAccountTransferTo,
  changeFFTransfer,
  send,
  TRANSFER_STATUS
} from '../../redux/modules/chamberWallet/transfer'
import {
  State as WalletState,
  changeToken
} from '../../redux/modules/chamberWallet/wallet'
import { FONT_SIZE, MARGIN, RADIUS } from '../../constants/size'
import { InputControl, Button } from '../common'
import { PullRight } from '../utility'
import colors from '../../constants/colors'
import { getTokenName } from '../../helpers/utils'

interface StateProps {
  transferState: TransferState
  wallet: WalletState
}

interface DispatchProps {
  changeTransferAmount: (amount: number) => void
  changeAccountTransferTo: (to: string) => void
  send: () => void
  changeToken: (token: { id: number; address: string }) => void
}

class TransferSection extends React.Component<StateProps & DispatchProps> {
  public render() {
    const { to, amount, isFF } = this.props.transferState
    const { transferState, wallet } = this.props
    const tokenId = wallet.selectedToken.id

    return (
      <div className="container">
        <section className="body">
          <h3 className="title">
            Transfer {isFF && <span className="title-note">Fast payment</span>}
          </h3>
          <div>
            <select onChange={this.handleChangeToken} value={tokenId}>
              {wallet.tokens.map(token => (
                <option key={token.id} value={token.id}>
                  {getTokenName(token.id)}
                </option>
              ))}
            </select>
          </div>
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
              <Button
                disabled={transferState.status === TRANSFER_STATUS.SENDING}
                onClick={this.onClickSend}
              >
                SEND
              </Button>
            </PullRight>
            {transferState.status === TRANSFER_STATUS.SUCCESS ? (
              <span className="message success">Transfer succeeded!!</span>
            ) : transferState.status === TRANSFER_STATUS.ERROR ? (
              <span className="message error">
                {transferState.error.message}
              </span>
            ) : null}
            <div />
          </div>
        </section>
        <style jsx>{`
          .body {
            margin: ${MARGIN.LARGE};
          }

          .title {
            font-size: ${FONT_SIZE.MEDIUM};
            text-transform: uppercase;
          }

          .title-note {
            margin-left: ${MARGIN.MEDIUM};
            text-transform: capitalize;
            background-color: ${colors.BG_SECONDARY};
            color: ${colors.TEXT_INVERSE};
            font-size: 1.2rem;
            border-radius: ${RADIUS.SMALL};
            padding: 0 4px;
          }

          .message {
          }

          .message.success {
            color: ${colors.TEXT_SUCCESS};
          }

          .message.error {
            color: ${colors.TEXT_ERROR};
          }
        `}</style>
      </div>
    )
  }

  private onChangeToAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { changeAccountTransferTo } = this.props
    changeAccountTransferTo(e.target.value)
  }

  private onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { changeTransferAmount } = this.props
    const val = Number(e.target.value)
    if (!Number.isNaN(val) && typeof val === 'number') {
      changeTransferAmount(val)
    }
  }

  private onClickSend = () => {
    this.props.send()
  }

  private handleChangeToken = e => {
    const id = Number(e.target.value)
    const { wallet } = this.props
    const selectedToken = wallet.tokens.find(t => t.id === id)
    this.props.changeToken(selectedToken)
  }
}

export default connect(
  (state: AppState) => ({
    transferState: state.chamberWallet.transfer,
    wallet: state.chamberWallet.wallet
  }),
  {
    changeTransferAmount,
    changeAccountTransferTo,
    changeFFTransfer,
    send,
    changeToken
  }
)(TransferSection)
