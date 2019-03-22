import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AppState } from '../../redux/modules'
import {
  DEPOSIT_STATUS,
  State as DepositState,
  deposit
} from '../../redux/modules/chamberWallet/deposit'
import { FONT_SIZE, PADDING, BORDER, MARGIN } from '../../constants/size'
import colors from '../../constants/colors'
import { Button, LoadingSpinner } from '../common'
import { MarginHorizontal } from '../utility'

interface StateProps {
  depositState: DepositState
}

interface DispatchProps {
  deposit: (ether: number) => void
}

interface State {
  depositAmount: number
}

class Deposit extends React.Component<StateProps & DispatchProps, State> {
  public state = {
    depositAmount: 1
  }

  public render() {
    const depositStatus = this.props.depositState.status

    return (
      <div className="container">
        <section className="body">
          <h3 className="title">Deposit</h3>
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
          .body {
            margin: ${MARGIN.LARGE};
          }

          .title {
            font-size: ${FONT_SIZE.MEDIUM};
            text-transform: uppercase;
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
        `}</style>
      </div>
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
  (state: AppState) => ({
    depositState: state.chamberWallet.deposit
  }),
  (dispatch: Dispatch): DispatchProps => ({
    deposit: (ether: number) => {
      ;(dispatch as ThunkDispatch<void, AppState, any>)(deposit(ether))
    }
  })
)(Deposit)
