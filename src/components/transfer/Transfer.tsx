import * as React from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../../redux/modules'
import {
  State as TransferState,
  changeTransferAmount,
  changeAccountTransferTo,
  send,
  TRANSFER_STATUS
} from '../../redux/modules/chamberWallet/transfer'
import { FONT_SIZE, MARGIN } from '../../constants/size'
import { InputControl, Button } from '../common'
import { PullRight } from '../utility'
import colors from '../../constants/colors'

interface StateProps {
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
    const { transferState } = this.props

    return (
      <div className="container">
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
    transferState: state.chamberWallet.transfer
  }),
  (dispatch: Dispatch): DispatchProps => ({
    changeAmount: bindActionCreators(changeTransferAmount, dispatch),
    changeToAddress: bindActionCreators(changeAccountTransferTo, dispatch),
    send: bindActionCreators(send, dispatch)
  })
)(TransferSection)
