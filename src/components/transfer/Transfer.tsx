import * as React from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../../redux/modules'
import {
  State as TransferState,
  changeTransferAmount,
  changeAccountTransferTo,
  send
} from '../../redux/modules/chamberWallet/transfer'
import { FONT_SIZE, MARGIN } from '../../constants/size'
import { InputControl, Button } from '../common'
import { PullRight } from '../utility'

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
              <Button onClick={this.onClickSend}>SEND</Button>
            </PullRight>
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
