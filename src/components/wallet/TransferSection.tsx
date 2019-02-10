import * as React from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../../redux/modules'
import {
  State as TransferState,
  changeTransferAmount,
  changeAccountTransferTo
} from '../../redux/modules/chamberWallet/transfer'
import { FONT_SIZE, MARGIN, BORDER, PADDING } from '../../constants/size'
import colors from '../../constants/colors'

interface StateProps {
  transferState: TransferState
}

interface DispatchProps {
  changeAmount: (amount: number) => void
  changeToAddress: (to: string) => void
}

class TransferSection extends React.Component<StateProps & DispatchProps> {
  public render() {
    return (
      <section className="container">
        <h3 className="title">Transfer</h3>
        <style jsx>{`
          .container {
            margin-top: ${MARGIN.LARGE};
            padding-top: ${PADDING.MEDIUM};
            border-top: solid ${BORDER.THICK} ${colors.BORDER_COLOR_LIGHT};
          }

          .title {
            font-size: ${FONT_SIZE.MEDIUM};
            text-transform: uppercase;
          }
        `}</style>
      </section>
    )
  }
}

export default connect(
  (state: AppState) => ({
    transferState: state.chamberWallet.transfer
  }),
  (dispatch: Dispatch): DispatchProps => ({
    changeAmount: bindActionCreators(changeTransferAmount, dispatch),
    changeToAddress: bindActionCreators(changeAccountTransferTo, dispatch)
  })
)(TransferSection)
